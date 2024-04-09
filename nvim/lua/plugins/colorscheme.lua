return { -- Colorscheme
	"catppuccin/nvim",
	name = "catppuccin",
	lazy = false,
	priority = 1000,
	opts = {
		flavour = "mocha",
		term_colors = true,

		integrations = {
			telescope = {
				enabled = true,
			},
		},
		custom_highlights = function(colors)
			return {
				Normal = { bg = colors.none },
				NormalNC = { bg = colors.none },
				NormalSB = { bg = colors.none },
			}
		end,
	},
	init = function()
		vim.cmd.colorscheme("catppuccin")
	end,
}
