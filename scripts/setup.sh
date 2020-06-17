#!/bin/bash

echo "Installing core packages"
yarn clean:modules
yarn

echo "Installing web packages"
cd ..
cd web
yarn clean:modules
yarn

echo "Setup sucessfully!"