#### History #####

HISTSIZE=10000
SAVEHIST=10000
HISTFILE=~/.cache/zsh/history

##### Aliases #####

alias "ls"="lsd"
alias "lsa"="lsd -A"
alias "lst"="lsd --tree"
alias "lsat"="lsd -A --tree"
alias "lsta"="lsd -A --tree"

alias ..="cd .."
alias "$"=""

#### Autorun ####

eval "$(starship init zsh)"

#### Plugins ####

source ~/.config/zsh/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh
source ~/.config/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.plugin.zsh

#### Completions ####

autoload -U compinit
zstyle ':completion:*' menu select
zmodload zsh/complist
compinit
_comp_options+=(globdots) # Include hidden files.
ZSH_AUTOSUGGEST_STRATEGY=(completion match_prev_cmd)

#### VI Mode ####
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

export PATH=$PATH:/home/anthonyprime/.spicetify

# pnpm
export PNPM_HOME="/home/anthonyprime/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
