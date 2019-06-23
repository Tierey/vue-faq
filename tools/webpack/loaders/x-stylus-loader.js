
const loader_utils   = require(`loader-utils`);
const stylus_replace = require(`./stylus-replacer/stylus_replace`);

module.exports = function (str) {

    this.cacheable && this.cacheable();

    let file = this.resourcePath;

    str = stylus_replace(str,file,false)

    return str;
    
};