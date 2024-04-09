return { -- LSP
	"neovim/nvim-lspconfig",
	dependencies = {
		"williamboman/mason.nvim",
		"williamboman/mason-lspconfig.nvim",
		"WhoIsSethDaniel/mason-tool-installer.nvim",
		"nvimtools/none-ls.nvim",
	},
	config = function()
		require("autocmds").lsp()
		local capabilities = vim.lsp.protocol.make_client_capabilities()
		capabilities.textDocument.foldingRange = {
			dynamicRegistration = false,
			lineFoldingOnly = true,
		}
		capabilities = vim.tbl_deep_extend("force", capabilities, require("cmp_nvim_lsp").default_capabilities())

		require("mason").setup()

		local servers = require("..settings").servers()
		local linters = require("..settings").linters()

		local ensure_installed = vim.tbl_keys(servers or {})
		vim.list_extend(ensure_installed, linters.installs or {})
		require("mason-tool-installer").setup({ ensure_installed = ensure_installed })

		local null_ls = require("null-ls")
		null_ls.setup({ sources = linters.configs or {} })

		require("mason-lspconfig").setup({
			handlers = {
				function(server_name)
					local server = servers[server_name] or {}
					server.capabilities = vim.tbl_deep_extend("force", {}, capabilities, server.capabilities or {})
					require("lspconfig")[server_name].setup(server)
				end,
			},
		})
	end,
}
