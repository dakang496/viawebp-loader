const path = require('path');

module.exports = {
    entry: './example/index.js',
    output: {
        path: path.resolve(__dirname, 'example/dist'),
        filename: 'app.js'
    },
    module: {
        rules: [{
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1000000, // 1KO
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(png|jpe?g)$/,
                loader: './index.js',
                enforce: 'post',
                options: {
                    expose: 'all', //webp、all
                    name: 'img/[name].[hash:7].[ext]',
                    webp: {

                    }
                }
            },


        ]

    }

};