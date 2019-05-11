import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CUENTAS: [{ id: '0', nombre: 'cuenta Mateo', ingresos: [], egresos: [] }, { id: '1', nombre: 'cuenta Ignacio', ingresos: [], egresos: [] }],
    CATEGORIAS_INGRESOS: ['Salario,Transferencia,Otros'],
    CATEGORIAS_EGRESOS: ['Expensas,Transferencia,Otros'],
    CUENTA_ACTUAL: 1
  },
  mutations: {
    addAccount (context, nuevaCuenta) {
      context.CUENTAS.push(nuevaCuenta)
    },
    addCategory (context, nuevaCategoria) {
      context.CUENTAS.push(nuevaCategoria)
    }
  },
  actions: {
    addAccount (context, nuevaCuenta) {
      context.commit('addAccount', nuevaCuenta)
    },
    addCategory (context, nuevaCategoria) {
      context.commit('addCategory', nuevaCategoria)
    }
  }
})
