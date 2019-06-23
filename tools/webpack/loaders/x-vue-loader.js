const fs           = require(`fs`);
const loader_utils = require(`loader-utils`);

module.exports = function (str) {
    this.cacheable && this.cacheable();
    
//#region str
let data =`
export default {
    props: ['props'],
    data() { return Object.assign( {data:this.$store.state}, this.props);}
}
`
let script_wrapper = `
let once = true;
export default {
    props: ['props'],
    data() { return Object.assign( {
        data:this.$store.state,
        %DEFAULT%
    }, this.props);},
    mounted(){
        if(once && !(once = false)){

%SCRIPT%

    }},
    beforeDestroy(){
        once = true
    }
}
`
//#endregion

    let file   = this.resourcePath;

    let find_script_tag = ~str.search(/<script>(?:.|\n|\r|\s)*?<\/script>/g)
    if( ! find_script_tag ){
        let once = true;
        str=str.replace('<template>',(m)=>{
            if(once){
                once = false;
                return `<script>${data}<\/script>\n<template>`
            }else return m;
        })
    }else
    // if script exist
    {
        let find_export_default = ~str.search(/\s*export\s*default/g)
        if(find_export_default) return str

        let def_find = false;
        str = str.replace(/\s*let\s*def\s*=\s*\({((?:.|\s|\n|\r)*?)}\)\s*(?:;)?/g,(m,inner)=>{
            def_find = inner
            return ""
        })
        if(def_find) script_wrapper = script_wrapper.replace(/%DEFAULT%/,def_find)
        else script_wrapper = script_wrapper.replace(/%DEFAULT%/,"")

        str = str.replace(/<script>((?:.|\s|\r|\n)*?)<\/script>/g,(m,inner)=>{
            inner = `if(process.env.NODE_ENV=="development"){${inner}}`
            return `<script>${script_wrapper.replace(/%SCRIPT%/,inner)}</script>`
        })

    }
    //fs.writeFileSync(`${process.cwd()}/test/${file.split('\\').pop()}`,str)

    return str;
};