#!/bin/bash

NODE_ENV=production webpack -p --config webpack.config.react-responsive-select.js

NODE_ENV=production webpack -p --config webpack.config.demo.js
