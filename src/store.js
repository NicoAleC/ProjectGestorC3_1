import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CUENTAS: [],
    CATEGORIAS_INGRESOS: ['Salario,Transferencia,Otros'],
    CATEGORIAS_EGRESOS: ['Expensas,Transferencia,Otros'],
    CUENTA_ACTUAL: ''
  },
  mutations: {
    addAccount (context, nuevaCuenta) {
      context.CUENTAS.push(nuevaCuenta)
    },
    addCategory (context, nuevaCategoria){
      context.CUENTAS.push(nuevaCategoria)
    }
  },
  actions: {
    addAccount (context, nuevaCuenta) {
      context.commit('addAccount', nuevaCuenta)
    },
    addCategory(context,nuevaCategoria){
      context.commit('addCategory',nuevaCategoria)
    }
  }
})
