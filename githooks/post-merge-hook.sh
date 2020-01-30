#!/usr/bin/env bash

npm_package_filename="package.json"

if [[ ! -f $npm_package_filename ]] ; then
  echo "[Error] '$npm_package_filename' not found"
  exit 1
fi

checksum_filename=".package-shasum"

function has_checksum_file() {
  return [[ ! -f $checksum_filename ]]
}

function has_changes_to_packages() {
  if shasum -s -c $checksum_filename ; then
    return true;
  fi
  return false;
}

function update_checksum_file() {
  echo "Performing an npm install"
  npm i
  echo "Updating checksum file [$checksum_filename]"
  shasum $npm_package_filename > $checksum_filename
}

if ! has_checksum_file || has_changes_to_packages ; then
  update_checksum_file
fi

post_merge_return=0
exit ${post_merge_return}
