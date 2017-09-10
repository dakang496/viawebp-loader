# viawebp-loader

[WebP](https://developers.google.com/speed/webp/) image loader & converter loader for Webpack.

## Install

```sh
npm install viawebp-loader --save-dev
```
## Usage

(1) use require or import to get the path of WebP from JPG or PNG.

in your source code
```javascript
var imageInfo =require('xxxx/xx.jpg'); // the result of imageInfo is WebP path

```

in your webpack.config.js
```javascript
rules:[{ 
    test: /\.(png|jpe?g)$/,
    loader: 'viawebp-loader',
    enforce: 'post',
    options: {
        expose: 'webp', 
        name: 'img/[name].[hash:7].[ext]',
        webp: {
            quality:75
        }
    }}]
```

(2) sometimes if you want to get both JPG and WebP path, you can using `vaiwebp-loader` along with common [file-loader](https://github.com/webpack/file-loader). 


in your source code
```javascript
var imageInfo=require('xxxx/xx.jpg');

```

in your webpack.config.js
```javascript
rules:[{
        test: /\.(png|jpe?g)$/,
        loader: 'file-loader',
        options: {
            name: 'img/[name].[hash:7].[ext]'
        }
    },
    { 
        test: /\.(png|jpe?g)$/,
        loader: 'viawebp-loader',
        enforce: 'post',
        options: {
            expose: 'all', 
            name: 'img/[name].[hash:7].[ext]',
            webp: {
                quality:75
            }
        }
    }]
```

`expose` option will effect the result of imageInfo , but both JPG and WebP file will still be exported to dist dir.  
```
default  => xxxx.jpg   
webp => xxxx.webp   
all => {default:'xxxx.jpg',webp:'xxxx.webp'}  
```

## options

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`expose`**|`{String}`|`undefined`| effect the result of invoking require/import. `all`,`webp` and `undefined` |
|**`name`**|`{String}`|[hash].[ext]| configure a custom filename template for your file |
|**`webp`**|`{Object}`| |For all possible options please visit "API" section of the official [imagemin-webp README  ](https://github.com/imagemin/imagemin-webp#imageminwebpoptions)| 

## License

[MIT](http://opensource.org/licenses/MIT)
