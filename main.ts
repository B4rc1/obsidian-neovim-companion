import { App, FileSystemAdapter, Document, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, ButtonComponent } from 'obsidian';

import { attach, NeovimClient } from 'neovim';
import * as net from 'net'


interface NvimCompanionSettings {
	socket: string;
}

const DEFAULT_SETTINGS: NvimCompanionSettings = {
	socket: '/tmp/nvimsocket'
}

export default class NvimCompanion extends Plugin {
	settings: NvimCompanionSettings;
  nvim: NeovimClient;
  socket : net.Socket;

  getVaultRoot() {
    let adapter = this.app.vault.adapter;
    if (adapter instanceof FileSystemAdapter) {
        return adapter.getBasePath();
    }
    return null;
  }

	async onload() {
    // load default settings
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		this.addSettingTab(new NvimCompanionSettingTab(this.app, this));

		await this.connectToNvim();
	}

	onunload() {
    this.socket.destroy()
    this.socket = undefined
    this.nvim = undefined
	}

	async connectToNvim() {
    this.socket = net.createConnection(this.settings.socket);

    this.socket.on('close', (hadError) => {
      if (hadError) {
        new Notice("WARNIG: Could not connect to any neovim instance on: " + this.settings.socket )
      } else {
        new Notice("The connected neovim instance has exited")
        this.unload()
        // should this be the default behavior? Or should this be a keybind :thinking:
        // this.load()
      }
    })

    this.socket.on('error', (e) => {
      console.error("[Neovim Companion]: the socket had an error: " + e)
    })

    this.socket.on('ready', () => {
      this.nvim = attach({
        reader: this.socket,
        writer: this.socket,
      })
      this.registerCallbacks()
      console.log("[Neovim Companion]: connected to neovim on \"" + this.settings.socket + "\"")
    })
	}

  async registerCallbacks() {
    // this.registerEvent(this.app.vault.on('modify', () => console.log("modified")))
    // this.registerEvent(this.app.vault.on('create', () => console.log("create")))

    this.registerEvent(this.app.workspace.on('file-open', async (file) => {
      // console.log("file-open")
      const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
      if(!markdownView) return;

      const fpath = this.getVaultRoot() + "/" + file.path
      const bufpath = await this.nvim.buffer.name
      if(fpath != bufpath) {
        this.nvim.command('edit ' + fpath);
      }
    }))
  }

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class NvimCompanionSettingTab extends PluginSettingTab {
	plugin: NvimCompanion;

	constructor(app: App, plugin: NvimCompanion) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Neovim Socket')
			.setDesc('The neovim socket to connect to')
			.addText(text => text
				.setValue(this.plugin.settings.socket)
				.onChange(async (value) => {
					this.plugin.settings.socket = value;
					await this.plugin.saveSettings();
				}));


    new ButtonComponent(containerEl)
      .setButtonText("connect")
      .onClick(_ => this.plugin.load())
	}
}
