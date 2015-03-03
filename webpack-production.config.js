// Webpack Howto: https://github.com/petehunt/webpack-howto

var path = require("path");
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
 __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
 __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
 entry: [
   './js/index.js'
 ],

 output: {
   path: __dirname,
   publicPath: "/",
   filename: "index.min.js"
 },
  plugins: [
    definePlugin,
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],


 // plugins: [definePlugin, commonsPlugin],

 module: {
   loaders: [
     { test: /\.js$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ }, // loaders can take parameters as a querystring
     { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
     { test: /\.css$/, loader: 'style-loader!css-loader' },
     { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
     // Pass *.jsx files through jsx-loader transform
     // { test: /\.jsx$/, loader: 'jsx' }
   ]
 },
 resolve: {
     // To enable requiring files without specifying the extension
   // you can now require('file') instead of require('file.coffee')
   extensions: ['', '.js', '.json'] //'.jsx', 
 }
 // externals: {
   // Showdown is not is node_modules,
   // so we tell Webpack to resolve it to a global
   // 'showdown': 'window.Showdown'
 // }
};