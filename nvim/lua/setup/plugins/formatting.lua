return {
	"stevearc/conform.nvim",
	lazy = false,
	opts = {
		notify_on_error = false,
		format_on_save = {
			timeout_ms = 500,
			lsp_fallback = true,
		},
		formatters_by_ft = {
			lua = { "stylua" },
			javascript = { { "prettierd", "prettier" } },
			typescript = { { "prettierd", "prettier" } },
			python = { "black" },
			c = { "clang-format" },
			cpp = { "clang-format" },
		},
	},
}
