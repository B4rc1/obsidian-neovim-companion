# Obsidian Neovim Companion

This plugin integrates Neovim into your editing experience. Currently, it provides:
- following you around as you open/focus files in obsidian

Note: As I am very busy ATM, progress will be erratic.

## 🖼️ See it in action


## 🔧 Installing and Setup

- Download the plugin
- start a neovim instance with `nvim --listen /tmp/nvimsocket` or `NVIM_LISTEN_ADRESS=/tmp/nvimsocket nvim` (see `:h --listen` and `:h $NVIM_LISTEN_ADRESS` for more information)
  - in case you use [neovim-remote](https://github.com/mhinz/neovim-remote) this is done automatically (when using `nvr` executable).
  - the socket path is configurable in the obsidian settings
- ???
- Profit

## 🛣️ Roadmap

- Lua Plugin, the part this plugin plays should be as minimal as possible.

## 💡 Ideas
- lua callback/autocmd for everything
- link following
- cmp integration
- syncronized scrolling
- `extract heading to ...` neovim bind support

- reverse sync
  - open file in neovim -> obsidian follows
