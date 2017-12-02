#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset
set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
workdir="$(mktemp -d)"
(
  cd "$workdir"
  git clone git@github.com:streamplace/countdown-prebuilt.git existing-repo
  mkdir countdown-prebuilt
  rsync --exclude node_modules -arv "$DIR/" "$workdir/countdown-prebuilt/"
  mv existing-repo/.git countdown-prebuilt/.git
  cd countdown-prebuilt
  git add .
  git commit -m "auto-publish $(date)"
  git push
  pwd
)
# rm -rf "$workdir"
