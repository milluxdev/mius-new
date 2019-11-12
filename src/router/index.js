import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main.vue'
import Serve222 from '../pages/page/Serve222Page.vue'
import Serve7210 from '../pages/page/Serve7210Page.vue'
import Serve1311 from '../pages/page/Serve1311Page.vue'
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
    name: 'Serve7210',
    component: Serve7210,
  }, {
    path: '/Serve222',
    name: 'Serve222',
    component: Serve222,
  }, {
    path: '/Serve1311',
    name: 'Serve1311',
    component: Serve1311,
  }, {
    path: '/SupplierAllBack',
    name: 'SupplierAllBack',
    component: SupplierAllBack,
  }]
}]

const router = new VueRouter({
  routes
})
export default router