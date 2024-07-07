local servers = {
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
	ruff = {},
	html = {},
	tsserver = {},
	cssls = {},
	eslint = {},
	emmet_ls = {},
	clangd = {},
	svelte = {},
	hyprls = {},
	somesass_ls = {},
	bashls = {},
}

return { -- LSP configuration & Plugins
	"neovim/nvim-lspconfig",
	dependencies = {
		{ "williamboman/mason.nvim", config = true },
		"williamboman/mason-lspconfig.nvim",
		"WhoIsSethDaniel/mason-tool-installer.nvim",
		{
			"j-hui/fidget.nvim",
			opts = {
				notification = {
					window = {
						winblend = 0,
					},
				},
			},
		},
		{
			"folke/neodev.nvim",
			opts = {},
		},
	},

	config = function()
		require("setup.autocmds").lsp()

		local capabilities = vim.lsp.protocol.make_client_capabilities()
		capabilities.textDocument.foldingRange = {
			dynamicRegistration = false,
			lineFoldingOnly = true,
		}
		capabilities = vim.tbl_deep_extend("force", capabilities, require("cmp_nvim_lsp").default_capabilities())

		require("mason").setup()

		local ensure_installed = vim.tbl_keys(servers or {})

		vim.list_extend(ensure_installed, {
			"stylua", -- Used to format Lua code
			"prettier", -- For javascript and alot of stuff
			"black", -- For python
			"clang-format", -- For c and cpp
		})
		require("mason-tool-installer").setup({ ensure_installed = ensure_installed })

		require("mason-lspconfig").setup({
			handlers = {
				function(server_name)
					local server = servers[server_name] or {}
					if server_name == "html" then
						capabilities.textDocument.completion.completionItem.snippetSupport = true
					end
					server.capabilities = vim.tbl_deep_extend("force", {}, capabilities, server.capabilities or {})
					require("lspconfig")[server_name].setup(server)
				end,
			},
		})
	end,
}
