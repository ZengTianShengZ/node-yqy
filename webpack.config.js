/**
 * @description: 文件或模块描述
 * @author: zengtiansheng
 * @update: 2017/12/22
 */
'use strict'
const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: [
        './server/build.js',
    ],
    output: {
        filename: 'index.js',
        path: resolve('dist')
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('server')]
            }
        ]
    }
}
