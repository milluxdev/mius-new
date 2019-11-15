import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main.vue'
import Server222 from '../pages/page/Server222Page.vue'
import Server7210 from '../pages/page/Server7210Page.vue'
import Server1311 from '../pages/page/Server1311Page.vue'
import McServer from '../pages/page/McServerPage.vue'
import McLogin from '../pages/page/McLoginPage.vue'
import SupplierAllBack from '../pages/component/SupplierAllBack.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

const routes = [{
  path: '/',
  component: Main,
  children: [{
    path: '/',
    name: 'Server7210',
    component: Server7210,
  }, {
    path: '/Server222',
    name: 'Server222',
    component: Server222,
  }, {
    path: '/Server1311',
    name: 'Server1311',
    component: Server1311,
  },  {
    path: '/McLogin',
    name: 'McLogin',
    component: McLogin,
  }, {
    path: '/McServer',
    name: 'McServer',
    component: McServer,
  },{
    path: '/SupplierAllBack',
    name: 'SupplierAllBack',
    component: SupplierAllBack,
  }]
}]

const router = new VueRouter({
  routes
})
export default router