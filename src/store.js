import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CUENTAS: [{id: 0, nombre: 'Mateo', 
              ingresos: [{descripcion: 'mensualidad abril',monto: 1500, fecha: '12/12/12', categoria: 'Transferencia'}]
             ,egresos: [{descripcion: 'pago universidad', monto: 300, fecha: '12/12/19',categoria:'Expensas'}]}],
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
    },
    changeCurrentAccount(context,nuevoId){
      context.CUENTA_ACTUAL = nuevoId
    }
  },
  actions: {
    addAccount (context, nuevaCuenta) {
      context.commit('addAccount', nuevaCuenta)
    },
    addCategory(context,nuevaCategoria){
      context.commit('addCategory',nuevaCategoria)
    },
    changeCurrentAccount(context,nuevoId){
      context.commit('changeCurrentAccount',nuevoId)
    }
  }
})
