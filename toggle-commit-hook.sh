#!/bin/bash

# Set the path to the Git hooks directory
hooks_dir=".git/hooks"

# Check if the first argument is "on" or "off"
if [ "$1" == "on" ]; then
  # Enable the commit message hook by moving it into the hooks directory
  git config core.hooksPath .githooks
  echo "Commit message hook enabled."
elif [ "$1" == "off" ]; then
  # Disable the commit message hook by moving it out of the hooks directory
  git config core.hooksPath .git/hooks 
  echo "Commit message hook disabled."
else
  # Invalid usage, display usage instructions
  echo "Usage: ./toggle-commit-hook.sh [on|off]"
  exit 1
fi
