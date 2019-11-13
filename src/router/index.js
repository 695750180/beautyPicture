import Vue from 'vue'
import Router from 'vue-router'
import beautyPicture from "@/views/beautyPicture/beautyPicture.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/index',
    },{
      path: '/index',
      name: 'beautyPicture',
      component : beautyPicture
    }
  ]
})
