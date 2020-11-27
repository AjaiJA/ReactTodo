const path = require('path');  
const HtmlWebpackPlugin = require('html-webpack-plugin');  
  
module.exports = {  
   entry: './main.js',
   output: {  
      path: path.join(__dirname, '/bundle'),  
      filename: 'index_bundle.js'  
   },  
   devServer: {  
      inline: true,  
      port: 8080 ,
      historyApiFallback:true,
      publicPath:'/'
   },  
   module: {  
      rules: [  
         {
            test:/\.css$/,
            exclude: /node_modules/, 
               loader:["style-loader","css-loader"]
         },
         {  
            test: /\.jsx?$/,  
            exclude: /node_modules/,  
        use: {  
              loader: "babel-loader",  
            }
         },
         {
            test: /\.png|svg|jpg|gif$/,
            exclude:/node_modules/,
        use:{
               loader:'file-loader'
            }
         }
      ]  
   },  
   plugins:[  
      new HtmlWebpackPlugin({  
         template: './index.html'  
      })  
   ]  
}  
