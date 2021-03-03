// This is an entry point to vuex, where we bring in all the modules

import Vue from 'vue';
import Vuex from 'vuex';

import todos from './modules/todos/index';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    todos
  }
})
