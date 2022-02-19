## Obsidian Neovim Companion

This plugin integrates Neovim into your editing experience. Currently, it provides:
- following you around as you open/focus files in obsidian

## Installing and Setup

- Download the plugin
- start a neovim instance with `nvim --listen /tmp/nvimsocket` or `NVIM_LISTEN_ADRESS=/tmp/nvimsocket nvim` (see `:h --listen` and `:h $NVIM_LISTEN_ADRESS` for more information)
  - in case you use [neovim-remote](https://github.com/mhinz/neovim-remote) this is done automatically (when using `nvr` executable).
  - the socket path is configurable in the obsidian settings
- ???
- Profit

## Roadmap

- how to unmap events?
  - without nuking the settings menu in the process
- add rename support
- add create `Untitled.md` workaround

### Future
- lua callback/autocmd for everything
- link following
- cmp integration
- syncronized scrolling
- `extract heading to ...` neovim bind support

- reverse sync
  - open file in neovim -> preview in obsidian
