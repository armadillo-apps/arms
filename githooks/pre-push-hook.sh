#!/usr/bin/env bash

function stashUncommittedChanges() {
  stash_name=$(date "+%Y%m%d_%H%M%S")'-pre-push-stash'
  if [[ -n $(git status -s) ]]; then
    git stash push -u -m $stash_name
    echo "Pushing local changes to git stash"
  fi
}

function popUncommittedChanges() {
  stash_id=$(git stash list | grep $stash_name | cut -d: -f1)
  if [[ -n $stash_id ]]; then
    git stash pop $stash_id
    echo "Popped pre-push stash from git stash"
  fi
}

stashUncommittedChanges

if ! npm run test:cov; then
  echo "Unit test failed"
  popUncommittedChanges
  exit 1
fi

if ! npm run cy:dev; then
  echo "UI test failed"
  popUncommittedChanges
  exit 1
fi

popUncommittedChanges
exit 0
