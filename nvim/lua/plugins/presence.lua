return {
		"andweeb/presence.nvim",
		config = function(_, opts)
			require("presence").setup(opts)
		end,
		priority = 1000,
		opts = {

			auto_update = true,
			neovim_image_text = "The One True Text Editor",
			main_image = "file",
			debounce_timeout = 10,
			enable_line_number = false,
			blacklist = {},
			buttons = true,
			file_assets = {},
			show_time = true,
		},
	}
