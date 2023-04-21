#!/bin/bash

mkdir -p "./build/"
# mkdir -p "./builddir/"

EAS_LOCAL_BUILD_ARTIFACTS_DIR="$PWD/build/"
# EAS_LOCAL_BUILD_WORKINGDIR="$PWD/builddir"

eas build --platform android --profile development --local
