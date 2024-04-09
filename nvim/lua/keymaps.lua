local MAPS = {}
local map = vim.keymap.set

MAPS.global = function()
	map("n", "<Esc>", "<cmd>nohlsearch<CR>")
	map({ "n", "i" }, "<C-s>", "<cmd>w<cr>", { desc = "[S]ave file" })
	map("n", "<leader>o", "<cmd>Oil<cr>", { desc = "open [O]il window" })

	map("n", "[d", vim.diagnostic.goto_prev, { desc = "Go to previous [D]iagnostic message" })
	map("n", "]d", vim.diagnostic.goto_next, { desc = "Go to next [D]iagnostic message" })
	map("n", "<leader>e", vim.diagnostic.open_float, { desc = "Show diagnostic [E]rror messages" })
	map("n", "<leader>q", vim.diagnostic.setloclist, { desc = "Open diagnostic [Q]uickfix list" })

	map("n", "<C-h>", "<C-w><C-h>", { desc = "Move focus to the left window" })
	map("n", "<C-l>", "<C-w><C-l>", { desc = "Move focus to the right window" })
	map("n", "<C-j>", "<C-w><C-j>", { desc = "Move focus to the lower window" })
	map("n", "<C-k>", "<C-w><C-k>", { desc = "Move focus to the upper window" })
end
MAPS.whichkey = {
	["<leader>c"] = { name = "[C]ode", _ = "which_key_ignore" },
	["<leader>d"] = { name = "[D]ocument", _ = "which_key_ignore" },
	["<leader>r"] = { name = "[R]ename", _ = "which_key_ignore" },
	["<leader>s"] = { name = "[S]earch", _ = "which_key_ignore" },
	["<leader>w"] = { name = "[W]orkspace", _ = "which_key_ignore" },
}
MAPS.oil = {
	["g?"] = "actions.show_help",
	["<CR>"] = "actions.select",
	["<C-s>"] = "actions.select_vsplit",
	["<C-h>"] = "actions.select_split",
	["<C-t>"] = "actions.select_tab",
	["<C-p>"] = "actions.preview",
	["<C-c>"] = "actions.close",
	["<C-o>"] = "actions.refresh",
	["<C-l>"] = "",
	["-"] = "actions.parent",
	["_"] = "actions.open_cwd",
	["`"] = "actions.cd",
	["~"] = "actions.tcd",
	["gs"] = "actions.change_sort",
	["gx"] = "actions.open_external",
	["g."] = "actions.toggle_hidden",
	["g\\"] = "actions.toggle_trash",
}

MAPS.telescope = function()
	local builtin = require("telescope.builtin")
	map("n", "<leader>sh", builtin.help_tags, { desc = "[S]earch [H]elp" })
	map("n", "<leader>sk", builtin.keymaps, { desc = "[S]earch [K]eymaps" })
	map("n", "<leader>sf", builtin.find_files, { desc = "[S]earch [F]iles" })
	map("n", "<leader>ss", builtin.builtin, { desc = "[S]earch [S]elect Telescope" })
	map("n", "<leader>sw", builtin.grep_string, { desc = "[S]earch current [W]ord" })
	map("n", "<leader>sg", builtin.live_grep, { desc = "[S]earch by [G]rep" })
	map("n", "<leader>sd", builtin.diagnostics, { desc = "[S]earch [D]iagnostics" })
	map("n", "<leader>sr", builtin.resume, { desc = "[S]earch [R]esume" })
	map("n", "<leader>s.", builtin.oldfiles, { desc = '[S]earch Recent Files ("." for repeat)' })
	map("n", "<leader><leader>", builtin.buffers, { desc = "[ ] Find existing buffers" })
	map("n", "<leader>/", builtin.current_buffer_fuzzy_find, { desc = "[/] Fuzzily search in current buffer" })
	map("n", "<leader>s/", function()
		builtin.live_grep({ grep_open_files = true, prompt_title = "Live Grep in Open Files" })
	end, { desc = "[S]earch [/] in Open Files" })
	map("n", "<leader>sn", function()
		builtin.find_files({ cwd = vim.fn.stdpath("config") })
	end, { desc = "[S]earch [N]eovim files" })
end

MAPS.lsp = function(lspMap)
	local builtin = require("telescope.builtin")
	lspMap("gd", builtin.lsp_definitions, "[G]oto [D]efinition")
	lspMap("gr", builtin.lsp_references, "[G]oto [R]eferences")
	lspMap("gI", builtin.lsp_implementations, "[G]oto [I]mplementation")
	lspMap("<leader>D", builtin.lsp_type_definitions, "Type [D]efinition")
	lspMap("<leader>ds", builtin.lsp_document_symbols, "[D]ocument [S]ymbols")
	lspMap("<leader>ws", builtin.lsp_dynamic_workspace_symbols, "[W]orkspace [S]ymbols")
	lspMap("<leader>rn", vim.lsp.buf.rename, "[R]e[n]ame")
	lspMap("<leader>ca", vim.lsp.buf.code_action, "[C]ode [A]ction")
	lspMap("K", vim.lsp.buf.hover, "Hover Documentation")
	lspMap("gD", vim.lsp.buf.declaration, "[G]oto [D]eclaration")
end

MAPS.cmp = function(cmp, luasnip)
	return {
		["<C-n>"] = cmp.mapping.select_next_item(),
		["<C-p>"] = cmp.mapping.select_prev_item(),
		["<C-y>"] = cmp.mapping.confirm({ select = true }),
		["<C-Space>"] = cmp.mapping.complete({}),
		["<C-l>"] = cmp.mapping(function()
			if luasnip.expand_or_locally_jumpable() then
				luasnip.expand_or_jump()
			end
		end, { "i", "s" }),
		["<C-h>"] = cmp.mapping(function()
			if luasnip.locally_jumpable(-1) then
				luasnip.jump(-1)
			end
		end, { "i", "s" }),
	}
end

return MAPS
