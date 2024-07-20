local opts = {
	-- Line numbers
	number = true,
	relativenumber = true,

	-- Enabled mouse functionality
	mouse = "a",

	-- false, Because Lua line already show the mode
	showmode = false,

	-- using OS's clipboard
	clipboard = "unnamedplus",
	undofile = true,
	updatetime = 250,
	timeoutlen = 300,
	backspace = "indent,eol,start",

	ignorecase = true,
	smartcase = true,

	signcolumn = "yes",
	cursorline = true,
	scrolloff = 10,

	hlsearch = true,
	swapfile = true,

	splitbelow = true,
	splitright = true,

	-- Tabs related options
	shiftwidth = 4,
	tabstop = 4,
	softtabstop = 4,
	expandtab = true,

	fillchars = { eob = " " }, -- changes the ~ in the end to just a empty space character
	termguicolors = true,

	foldcolumn = "0", -- '0' is not bad
	foldlevel = 99, -- Using ufo provider need a large value, feel free to decrease the value
	foldlevelstart = 99,
	foldenable = true,
}

for key, value in pairs(opts) do
	vim.opt[key] = value
end
