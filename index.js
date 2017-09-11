var imageScriptPath = require.resolve('./image.js');
var detectScriptPath = require.resolve('./detect.js');
var loaderUtils = require("loader-utils");

module.exports = function (content) {
  this.cacheable && this.cacheable();
  var regx = /module\.exports\s*?=/;
  var existFile = regx.test(content);

  var urlQuery = this.resourceQuery ? loaderUtils.parseQuery(this.resourceQuery) : null;
  var query = Object.assign({}, loaderUtils.getOptions(this), urlQuery);

  var imageLoaderOptions = '?' + JSON.stringify(query);
  var webpExportValue = 'require(' + JSON.stringify('-!' + imageScriptPath + imageLoaderOptions + '!' + this.resource) + ');'

  var detectOptions = query.detect;
  if (detectOptions && detectOptions.enable) {
    var defaultExportText = content.replace(regx, 'module.exports.default=');
    var deleteCache = `delete require.cache[require.resolve('${this.resource}')]; `;
    if (detectOptions.auto) {
      var scriptPath = detectOptions.script || detectScriptPath;
      return deleteCache + defaultExportText + `
        var detect= require('${scriptPath}');
        var webpPath=${webpExportValue}
        var imageInfo=module.exports.default;
        if(detect.isSupport()){
          imageInfo=webpPath;
        }
        module.exports=imageInfo;
      `;
    } else {
      var variable = variable || '__webp_support__'
      return (detectOptions.cache ? deleteCache : '') + defaultExportText + `
        var webpPath=${webpExportValue}
        var imageInfo=module.exports.default;
        if(window.${variable}){
          imageInfo=webpPath;
        }
        module.exports=imageInfo;
      `;
    }
  }
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