local Keymaps = {}
local map = vim.keymap.set

vim.g.mapleader = " "
vim.g.maplocalleader = " "

Keymaps.global = function()
	map("n", "<ESC>", "<cmd>nohlsearch<CR>")
	map({ "n", "i" }, "<C-s>", "<cmd>w<CR>", { desc = "[S]ave file" })

	map("n", "<C-h>", "<C-w><C-h>", { desc = "Move focus to the left window" })
	map("n", "<C-l>", "<C-w><C-l>", { desc = "Move focus to the right window" })
	map("n", "<C-j>", "<C-w><C-j>", { desc = "Move focus to the lower window" })
	map("n", "<C-k>", "<C-w><C-k>", { desc = "Move focus to the upper window" })

	map("n", "[d", vim.diagnostic.goto_prev, { desc = "Go to previous [D]iagnostic message" })
	map("n", "]d", vim.diagnostic.goto_next, { desc = "Go to next [D]iagnostic message" })
	map("n", "<leader>e", vim.diagnostic.open_float, { desc = "Show diagnostic [E]rror messages" })
	map("n", "<leader>q", vim.diagnostic.setloclist, { desc = "Open diagnostic [Q]uickfix list" })
	map("n", "<leader>f", function()
		require("conform").format({ async = true, lsp_fallback = true })
	end, { desc = "Format the file" })
	map("n", "<leader>nt", "<cmd>:NvimTreeToggle<cr>", { desc = "Toggle [N]vim Tree" })
	map("n", "-", "<CMD>Oil<CR>", { desc = "Open parent directory" })
end

Keymaps.telescope = function()
	local builtin = require("telescope.builtin")
	map("n", "<leader>sh", builtin.help_tags, { desc = "[S]earch [H]elp" })
	map("n", "<leader>sk", builtin.keymaps, { desc = "[S]earch [K]eymaps" })
	map("n", "<leader>sf", function()
		builtin.find_files()
	end, { desc = "[S]earch [F]iles" })
	map("n", "<leader>ss", builtin.builtin, { desc = "[S]earch [S]elect Telescope" })
	map("n", "<leader>sw", builtin.grep_string, { desc = "[S]earch current [W]ord" })
	map("n", "<leader>sg", builtin.live_grep, { desc = "[S]earch by [G]rep" })
	map("n", "<leader>sd", builtin.diagnostics, { desc = "[S]earch [D]iagnostics" })
	map("n", "<leader>sr", builtin.resume, { desc = "[S]earch [R]esume" })
	map("n", "<leader>s.", builtin.oldfiles, { desc = '[S]earch Recent Files ("." for repeat)' })
	map("n", "<leader><leader>", builtin.buffers, { desc = "[ ] Find existing buffers" })

	-- Shortcut for searching your Neovim configuration files
	map("n", "<leader>sn", function()
		builtin.find_files({ cwd = vim.fn.stdpath("config") })
	end, { desc = "[S]earch [N]eovim files" })
end

Keymaps.lsp = function(event, client)
	local builtin = require("telescope.builtin")
	local mapls = function(key, func, desc)
		map("n", key, func, { buffer = event.buf, desc = "LSP: " .. desc })
	end
	mapls("gd", builtin.lsp_definitions, "[G]oto [D]efinition")
	mapls("gr", builtin.lsp_references, "[G]oto [R]efrences")
	mapls("gI", builtin.lsp_implementations, "[G]oto [I]mplementation")
	mapls("<leader>D", builtin.lsp_type_definitions, "Type [D]efinition")
	mapls("<leader>ds", builtin.lsp_document_symbols, "[D]ocument [S]ymbols")
	mapls("<leader>ws", builtin.lsp_dynamic_workspace_symbols, "[W]orkspace [S]ymbls")
	mapls("<leader>rn", vim.lsp.buf.rename, "[R]e[N]ame")
	mapls("<leader>ca", vim.lsp.buf.code_action, "[C]ode [A]ction")
	mapls("K", vim.lsp.buf.hover, "Hover Documentation")
	mapls("gD", vim.lsp.buf.declaration, "[G]oto [D]eclaration")
	if client and client.server_capabilities.inlayHintProvider and vim.lsp.inlay_hint then
		mapls("<leader>th", function()
			vim.lsp.inlay_hint.enable(not vim.lsp.inlay_hint.is_enabled({}))
		end, "[T]oggle Inlay [H]ints")
	end
end

Keymaps.completions = function(cmp, luasnip)
	return {
		["<C-j>"] = cmp.mapping.select_next_item(),
		["<C-k>"] = cmp.mapping.select_prev_item(),
		["<C-b>"] = cmp.mapping.scroll_docs(-4),
		["<C-f>"] = cmp.mapping.scroll_docs(4),
		["<C-y>"] = cmp.mapping.confirm({ select = true }),
		["<C-Space>"] = cmp.mapping.complete({}),
		["<C-l>"] = cmp.mapping(function()
			if luasnip.expand_or_locally_jumpable(-1) then
				luasnip.expand_or_jump()
			end
		end, { "i", "s" }),

		["<C-h>"] = cmp.mapping(function()
			if luasnip.expand_or_locally_jumpable(1) then
				luasnip.jump(-1)
			end
		end, { "i", "s" }),
	}
end

return Keymaps
