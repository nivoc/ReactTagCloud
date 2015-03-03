// Webpack Howto: https://github.com/petehunt/webpack-howto

var path = require("path");
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
 __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
 __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var statsPlugin = function() {
      if(false) {
        this.plugin("done", function(stats) {
          var jsonStats = stats.toJson({
            chunkModules: true,
            exclude: [
              /node_modules[\\\/]react(-router)?[\\\/]/,
              /node_modules[\\\/]items-store[\\\/]/
            ]
          });
          jsonStats.publicPath = "/_assets/";
          require("fs").writeFileSync(path.join(__dirname, "build", "stats.json"), JSON.stringify(jsonStats));
        });
      }
    };


module.exports = {
 devtool: 'eval',
 entry: [
   'webpack-dev-server/client?http://0.0.0.0:3001',
   'webpack/hot/only-dev-server',
   './js/index.js'
 ],

 output: {
   path: __dirname,
   filename: 'index.js',
   publicPath: "/",
   sourceMapFilename: "debugging/[file].map",
 },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), 
    definePlugin,
    new webpack.NoErrorsPlugin(),
    statsPlugin
  ],

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
};