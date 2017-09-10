var imagemin = require("imagemin");
var imageminWebp = require("imagemin-webp");
var loaderUtils = require("loader-utils");

module.exports = function (content) {
    this.cacheable && this.cacheable();

    if (!this.emitFile) throw new Error('emitFile is required from module system');

    var callback = this.async();
    var query = loaderUtils.getOptions(this) || {};


    var url = loaderUtils.interpolateName(this, query.name || "[hash].[ext]", {
        content: content,
        regExp: query.regExp
    });
    var dotIndex = url.lastIndexOf(".");
    var webpUrl = url.substring(0, dotIndex) + ".webp";


    var webpOptions = query.webp;

    imagemin.buffer(content, {
        plugins: [imageminWebp(webpOptions)]
    }).then(file => {
        this.emitFile(webpUrl, file);
        callback(null, "module.exports = __webpack_public_path__ + " + JSON.stringify(webpUrl) + ";");
    }).catch(err => {
        console.warn(err)
    })
}
module.exports.raw = true;