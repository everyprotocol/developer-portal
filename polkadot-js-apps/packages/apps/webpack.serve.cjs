// Copyright 2017-2025 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base.cjs');

module.exports = merge(
  baseConfig(__dirname, 'development'),
  {
    devServer: {
      headers: {
        'Content-Security-Policy': "frame-ancestors 'none'",
        'X-Frame-Options': 'DENY'
      },
      hot: true,
      open: false,
      port: 3000,
      static: path.resolve(__dirname, 'build')
    },
    plugins: [
      new HtmlWebpackPlugin({
        PAGE_TITLE: 'Every Portal',
        inject: true,
        template: path.join(__dirname, 'public/index.html')
      })
    ],
    watchOptions: {
      // 5.66.0 work-around (was reduced to 20, then started failing)
      // https://github.com/webpack/webpack/commit/96da7660021e8aa31e163bacd3515960eb253422#diff-13cf5374edb5eced5f3770d5f346c59252f87a90de91bc57306077693c8b95e2R52
      aggregateTimeout: 600,
      ignored: ['.yarn', 'build', 'node_modules']
    }
  }
);
