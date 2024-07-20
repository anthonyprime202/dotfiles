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
			fidget = true,
			nvimtree = true,
			ufo = false,
		},
		custom_highlights = function(colors)
			return {
				Normal = { bg = colors.none },
				NormalNC = { bg = colors.none },
				NormalSB = { bg = colors.none },
				LineNr = { fg = colors.overlay1 },
				NvimtreeNormal = {
					bg = colors.mantle,
				},
			}
		end,
	},
	init = function()
		vim.cmd.colorscheme("catppuccin")
	end,
}
