import Vue    from 'vue'
import Router from 'vue-router'
import Home   from '@/routes/b-home.vue'
import Test   from '@/routes/b-test.vue'

Vue.use(Router)

export default new Router({

  mode: 'history',
  
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'Test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ '@/routes/b-home.vue')
      component: Test
    }
  ]
})
