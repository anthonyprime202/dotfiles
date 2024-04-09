return { -- File Tree
	"stevearc/oil.nvim",
	opts = {
		default_file_explorer = true,
		keymaps = require("..keymaps").oil,
		preview = {
			max_width = 0.9,
			min_width = { 70, 0.7 },
			-- width = nil,
			max_height = 0.9,
			min_height = { 5, 0.1 },
			height = nil,
			border = "rounded",
			win_options = {
				winblend = 10,
			},
			update_on_cursor_moved = true,
		},
	},
	dependencies = { "nvim-tree/nvim-web-devicons" },
}
