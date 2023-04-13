#!/bin/bash

mkdir -p "./build"
EAS_LOCAL_BUILD_ARTIFACTS_DIR="./build"

eas build --platform android --profile development --local
