#!/usr/bin/env bash

stash_name=$(date "+%Y%m%d_%H%M%S")'-pre-push-stash'
if [[ -n $(git status -s) ]] ; then
    git stash push -u -m $stash_name
    echo "Pushing local changes to git stash"
fi

test_return_code=0
if ! npm run test:cov ; then
    test_return_code=1
    echo "Unit test failed"
fi

if ! npm run cy:dev ; then
    test_return_code=1
    echo "UI test failed"
fi

stash_id=$(git stash list | grep $stash_name | cut -d: -f1)
if [[ -n $stash_id ]] ; then
    git stash pop $stash_id
    echo "Popped pre-push stash from git stash"
fi

exit ${test_return_code}
