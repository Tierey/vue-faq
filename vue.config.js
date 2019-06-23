const webpack = require(`webpack`);
const path    = require('path')
// vue add prerender-spa
// vue add style-resources-loader
module.exports = {

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'stylus',
            patterns: [
            //    path.resolve(__dirname, './src/all/abstract/_var/**/*.styl'),
            //    path.resolve(__dirname, './src/all/abstract/function/**/*.styl'),
            //    path.resolve(__dirname, './src/all/abstract/mixin/**/*.styl'),
            //    path.resolve(__dirname, './src/all/base/grid/**/*.styl'),
            ]
        }
    },

    chainWebpack: config => {

        if(0) {
            // global object
            config.plugin('provide').use(webpack.ProvidePlugin, [{
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                jquery: 'jquery',
                ms:'malihu-custom-scrollbar-plugin'
            }]);

        }

        if(0) {
            // aliases
            config.resolve.alias.set('@font',`${process.cwd()}\\src\\assets\\font`)
            config.resolve.alias.set('@img' ,`${process.cwd()}\\src\\assets\\img`)

        }

        if(0) {
            // loaders
            let cacheDirectory,cacheIdentifier;

            config.module.rule('vue').use('vue-loader').loader('vue-loader')
                .tap(options => {
                    cacheDirectory  = options.cacheDirectory;
                    cacheIdentifier = options.cacheIdentifier;
                })

            config.module.rule('vue').use().loader('x-vue-loader').options({
                cacheDirectory,cacheIdentifier
            }).after('vue-loader')

            config.resolveLoader.alias.set("x-vue-loader", `${process.cwd()}/tools/webpack/loaders/x-vue-loader.js`)

        }

        if(0)
        {
            const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
            function addXStyleLoader (rule) {
                rule.use()
                    .loader('x-stylus-loader')
            }
            types.forEach(type => addXStyleLoader(config.module.rule('stylus').oneOf(type)))
            config.resolveLoader.alias.set("x-stylus-loader", `${process.cwd()}/tools/webpack/loaders/x-stylus-loader.js`)
        }

        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        // добавляем загрузчик для замены
        svgRule
        .test(/.*font.*\.(svg)(\?.*)?$/)
        .use('file-loader')
        .loader('file-loader')
        .options({name:"img/[name].[ext]"})


        config.module.rule('svgi')
        .test(/.*\.(svg)$/)
        .use('html-loader')
        .loader('html-loader')

        // disable optimisation
        config.plugin('html').tap((options)=>{
            options[0].minify={}
            //console.log(options)
            return options
        })
        // config.plugins.delete('preload')
        // config.plugins.delete('prefetch')
        // config.optimization.minimize(false)

    },

    productionSourceMap: false,
    filenameHashing: false,

}