#!/usr/bin/env bash
set -eu

HUGO_VERSION=0.170.1
GO_VERSION=1.27.4
build_tools="$(mktemp -d)"

curl --fail --location --retry 3 "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz" --output "$build_tools/go.tar.gz"
tar -xzf "$build_tools/go.tar.gz" -C "$build_tools"
export PATH="$build_tools/go/bin:$PATH"

curl --fail --location --retry 3 "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_linux-amd64.tar.gz" --output "$build_tools/hugo.tar.gz"
tar -xzf "$build_tools/hugo.tar.gz" -C "$build_tools" hugo

"$build_tools/hugo" --source exampleSite --minify
