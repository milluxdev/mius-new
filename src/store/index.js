import Vue from 'vue'
import Vuex from 'vuex'
import setting from './module/setting';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    setting
  },
})