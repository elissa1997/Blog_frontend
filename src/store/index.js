import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import style from './modules/style.js';

export default new Vuex.Store({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    style,
  }

})