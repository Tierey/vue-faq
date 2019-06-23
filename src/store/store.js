import Vue  from 'vue'
import Vuex from 'vuex'

/* autoimport store modules */
function require_modules(obj) {
    let modules = {};
    obj.keys().forEach(fileName => {
        const componentConfig = obj(fileName)
        fileName = fileName.replace("./","").replace(".js","")
        modules[fileName]=(componentConfig.default || componentConfig)
    })
    return modules;
}
let modules = require.context('./modules', true, /[A-Za-z]\w+\.js$/)
    modules = require_modules(modules)

Vue.use(Vuex)

export default new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production'
})

