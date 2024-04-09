return {
	servers = function()
		return {
			-- C, C++
			clangd = {},

			-- Python
			pyright = {},
			cssls = {},

			-- Rust
			rust_analyzer = {
				root_dir = require("lspconfig.util").root_pattern("Cargo.toml", "rust-project.json"),
				cmd = { "rust-analyzer" },
				single_file_support = true,
			},

			-- Javascript, Typscript
			tsserver = {},
			emmet_language_server = {},
			html = {
				configurationSection = { "html", "css", "javascript" },
				embeddedLanguages = {
					css = true,
					javascript = true,
				},
				provideFormatter = true,
			},

			-- Lua
			lua_ls = {
				settings = {
					Lua = {
						runtime = { version = "LuaJIT" },
						workspace = {
							checkThirdParty = false,
							library = { "${3rd}/luv/library", unpack(vim.api.nvim_get_runtime_file("", true)) },
						},
						completion = { callSnippet = "Replace" },
					},
				},
			},
		}
	end,

	linters = function()
		local null_ls = require("null-ls")

		return {
			installs = { "stylua" },
			configs = {
				null_ls.builtins.formatting.stylua,
			},
		}
	end,
}
