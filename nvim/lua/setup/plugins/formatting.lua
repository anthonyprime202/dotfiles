return {
	"stevearc/conform.nvim",
	lazy = false,
	opts = {
		notify_on_error = false,

		default_format_opts = {
			lsp_format = "fallback",
		},

		format_on_save = {
			timeout_ms = 500,
			lsp_fallback = true,
		},
		formatters = {
			lua = { "stylua" },
			javascript = { "prettier" },
			typescript = { "prettier" },
			json = { "prettier" },
			scss = { "prettier" },
			html = { "prettier" },
			python = { "black" },
			c = { "clang-format" },
			cpp = { "clang-format" },
			svelte = { "prettier" },
		},
	},
}
