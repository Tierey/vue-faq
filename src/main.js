import Vue    from 'vue'
import App    from '@/App.vue'
import router from '@/routes/router'
import store  from '@/store/store'

Vue.config.productionTip = false

function include_global(obj) {
  obj.keys().forEach(fileName => {
      const componentConfig = obj(fileName)
      let componentName = fileName.replace(`\\`, '/').split('/').pop().replace(/.(vue|js)/, "")
      componentName =  componentName
      //console.log(componentName)
      Vue.component(
          componentName,
          componentConfig.default || componentConfig
      )
  })
}
const requireComponent = require.context('./components', true, /[A-Z-]\w+\.(vue|js)$/)
include_global(requireComponent)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
