

# Plugins 
# source $ZDOTDIR/plugins/zsh-autocomplete/zsh-autocomplete.plugin.zsh
source $ZDOTDIR/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source $ZDOTDIR/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# Path variables
export PATH="$PATH:$HOME/.local/bin"
# Completions
autoload -U compinit
zstyle ':completion:*' menu select
zmodload zsh/complist
compinit
_comp_options+=(globdots)		# Include hidden files.
ZSH_AUTOSUGGEST_STRATEGY=(completion match_prev_cmd)

# VI mode
bindkey -v
export KEYTIMEOUT=1

function zle-keymap-select {
  if [[ ${KEYMAP} == vicmd ]] ||
     [[ $1 = 'block' ]]; then
    echo -ne '\e[1 q'
  elif [[ ${KEYMAP} == main ]] ||
       [[ ${KEYMAP} == viins ]] ||
       [[ ${KEYMAP} = '' ]] ||
       [[ $1 = 'beam' ]]; then
    echo -ne '\e[5 q'
  fi
}
zle -N zle-keymap-select
zle-line-init() {
    zle -K viins # initiate `vi insert` as keymap (can be removed if `bindkey -V` has been set elsewhere)
    echo -ne "\e[5 q"
}
zle -N zle-line-init
echo -ne '\e[5 q' # Use beam shape cursor on startup.
preexec() { echo -ne '\e[5 q' ;} # Use beam shape cursor for each new prompt.

# History
HISTSIZE=10000
SAVEHIST=10000
HISTFILE=~/.cache/zsh/history

# Aliases 

## LSD related aliases
alias "ls"="lsd"
alias "lsa"="lsd -A"
alias "lst"="lsd --tree"
alias "lsat"="lsd -A --tree"
alias "lsta"="lsd -A --tree"

alias ..="cd .."
alias "$"=""

# Auto Run
eval "$(starship init zsh)"

# bun completions
[ -s "/home/anthonyprime/.bun/_bun" ] && source "/home/anthonyprime/.bun/_bun"
