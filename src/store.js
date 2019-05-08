import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CUENTAS: [],

  },
  mutations: {
    addAccount (context, nuevaCuenta) {
      context.CUENTAS.push(nuevaCuenta)
    }
  },
  actions: {
    addAccount (context, nuevaCuenta) {
      context.commit('addAccount', nuevaCuenta)
    }
  }
})
