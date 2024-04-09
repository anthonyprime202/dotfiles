local AUCMDS = {}

AUCMDS.global = function()
	-- Highlight yanked text
	vim.api.nvim_create_autocmd("TextYankPost", {
		desc = "Highlight when yanking (copying) text",
		group = vim.api.nvim_create_augroup("highlight-yank", { clear = true }),
		callback = function()
			vim.highlight.on_yank()
		end,
	})

	-- Setting tabs to 2
	vim.api.nvim_create_autocmd("FileType", {
		pattern = { "javascript", "css", "scss", "html", "lua" },
		callback = function()
			vim.opt_local.shiftwidth = 2
			vim.opt_local.tabstop = 2
		end,
	})
end

AUCMDS.lsp = function()
	vim.api.nvim_create_autocmd("LspAttach", {
		--  Adding LSP funtionalities after the buffer is attached
		group = vim.api.nvim_create_augroup("lsp-attach", { clear = true }),
		callback = function(event)
			local client = vim.lsp.get_client_by_id(event.data.client_id)
			--
			-- Checking if client has the capabilities to highlight
			if client and client.server_capabilities.documentHighlightProvider then
				local map = function(keys, func, desc)
					vim.keymap.set("n", keys, func, { buffer = event.buf, desc = "LSP: " .. desc })
				end

				require("..keymaps").lsp(map)

				-- Highlight on cursor hold
				vim.api.nvim_create_autocmd({ "CursorHold", "CursorHoldI" }, {
					buffer = event.buf,
					callback = vim.lsp.buf.document_highlight,
				})

				vim.api.nvim_create_autocmd({ "CursorMoved", "CursorMovedI" }, {
					buffer = event.buf,
					callback = vim.lsp.buf.clear_references,
				})
			end
		end,
	})
end

return AUCMDS
