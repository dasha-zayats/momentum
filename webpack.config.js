const path= require('path');
const HTMLWebpackPlugin= require("html-webpack-plugin");
const {CleanWebpackPlugin}= require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin= require("mini-css-extract-plugin");

module.exports= {
    mode: "development",
	entry: {                       
		main: "./src/js/script.js"
	},  
	output:{                                 
		filename: "[name].js",
		path: path.resolve(__dirname,"dist")    
	},
	plugins: [
	    new HTMLWebpackPlugin({
	    	template: 'src/index.html'
	    }),
	    new CleanWebpackPlugin(),
	    new CopyWebpackPlugin({
	    	patterns: [{from:'src/assets/img', to:'assets/img'}]
	    }),
	    new MiniCssExtractPlugin({
    	filename: "[name].[contenthash].css"
        })
    ],
    module: {
  	    rules: [
		  	{
		        test: /\.css$/,
		        use:[
	          		{
	          			loader: MiniCssExtractPlugin.loader,
	          			options: {}
	         		},
	         		"css-loader"
	         		]
		    },
		    {
  	  	        test:/\.(png|jpg|svg|gif|woff|woff2|eot|ttf|otf)$/,
  	  	        type: 'asset/resource'
  	        },
  	        {
  	  			test: /\.mp3$/,
			    loader: 'file-loader',
			    options: {
			        name: 'assets/sounds/[name].[ext]',
			    },
  	 	 	}  
	    ]
	}
}