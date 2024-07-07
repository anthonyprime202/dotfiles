local AutoCMDs = {}

AutoCMDs.global = function()
	vim.api.nvim_create_autocmd("TextYankPost", {
		desc = "Highlight when yanking (copying) text",
		group = vim.api.nvim_create_augroup("kickstart-highlight-yank", { clear = true }),
		callback = function()
			vim.highlight.on_yank()
		end,
	})
end

AutoCMDs.lsp = function()
	vim.api.nvim_create_autocmd("LspAttach", {
		group = vim.api.nvim_create_augroup("lsp-attach", { clear = true }),
		callback = function(event)
			local client = vim.lsp.get_client_by_id(event.data.client_id)
			if client and client.server_capabilities.documentHighlightProvider then
				local highlight_augroup = vim.api.nvim_create_augroup("kickstart-lsp-highlight", { clear = false })
				vim.api.nvim_create_autocmd({ "CursorHold", "CursorHoldI" }, {
					buffer = event.buf,
					group = highlight_augroup,
					callback = vim.lsp.buf.document_highlight,
				})

				vim.api.nvim_create_autocmd({ "CursorMoved", "CursorMovedI" }, {
					buffer = event.buf,
					group = highlight_augroup,
					callback = vim.lsp.buf.clear_references,
				})

				vim.api.nvim_create_autocmd("LspDetach", {
					group = vim.api.nvim_create_augroup("kickstart-lsp-detach", { clear = true }),
					callback = function(event2)
						vim.lsp.buf.clear_references()
						vim.api.nvim_clear_autocmds({ group = "kickstart-lsp-highlight", buffer = event2.buf })
					end,
				})
			end
			require("setup.keymaps").lsp(event, client)
		end,
	})

	-- Hyprlang LSP
	vim.api.nvim_create_autocmd({ "BufEnter", "BufWinEnter" }, {
		pattern = { "*.hl", "hypr*.conf" },
		callback = function(event)
			print(string.format("starting hyprls for %s", vim.inspect(event)))
			vim.lsp.start({
				name = "hyprlang",
				cmd = { "hyprls" },
				root_dir = vim.fn.getcwd(),
			})
		end,
	})
end

return AutoCMDs
