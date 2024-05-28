const webpack = require('webpack'); //to access built-in plugins
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        test: './src/test.js',
        meals: './src/meals/meals.js',
        todo: './src/to-do/to-do.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/js'),
    },
};