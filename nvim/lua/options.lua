-- Setting up leader key
vim.g.mapleader = " "
vim.g.maplocalleader = " "

local opts = {
	-- Line number related options

	number = true,
	relativenumber = true,

	mouse = "a", -- Enable mouse funtionality
	showmode = false, -- false, Because lualine already shows the mode
	clipboard = "unnamedplus", -- Using the OS's clipboard
	breakindent = true,
	undofile = true,
	ignorecase = true,
	smartcase = true,
	signcolumn = "yes",
	updatetime = 250,
	timeoutlen = 300,

	-- Split related options
	splitright = true,
	splitbelow = true,
	inccommand = "split",
	cursorline = true, -- Highlight the current working line
	scrolloff = 20, -- Giving offset to the cursor from the ends of the file

	-- Tab related options
	shiftwidth = 4,
	tabstop = 4,
	softtabstop = 4,
	expandtab = true,

	-- Fold related options
	foldcolumn = "1", -- '0' is not bad
	foldlevel = 99, -- Using ufo provider need a large value, feel free to decrease the value
	foldlevelstart = 99,
	foldenable = true,

	-- To get rid of the ~ at the end of buffer
	fillchars = { eob = " " },
	termguicolors = true,
}

for key, value in pairs(opts) do
	vim.opt[key] = value
end
