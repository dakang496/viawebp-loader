var imageLoaderPath = require.resolve('./image.js');
var loaderUtils = require("loader-utils");

module.exports = function (content) {
     this.cacheable && this.cacheable();
    var regx = /module\.exports\s*?=/;
    var existFile = regx.test(content);

    console.log(content);

    var query = loaderUtils.getOptions(this);
    var imageLoaderOptions = query ? ('?' + JSON.stringify(query)) : '';

    var file = this.resource;
    var webpExportValue = 'require(' + JSON.stringify('-!' + imageLoaderPath + imageLoaderOptions + '!' + file) + ');'

    if (existFile) {
        if (query.expose === 'webp') {
            return 'module.exports=' + webpExportValue;
        } else if (query.expose === 'all') {
            var webpExportText = 'module.exports.webp=' + webpExportValue;
            var defaultExportText = content.replace(regx, 'module.exports.default=');
            return webpExportText + defaultExportText;
        } else {
            return webpExportValue + content;
        }
    } else {
        return 'module.exports=' + webpExportValue;
    }
}