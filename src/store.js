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
    addCategoryIncome (context, newCategory){
      context.CATEGORIAS_INGRESOS.push(newCategory)
    },
    addCategoryExpense (context, newCategory){
      context.CATEGORIAS_EGRESOS.push(newCategory)
    }
  },
  actions: {
    addAccount (context, nuevaCuenta) {
      context.commit('addAccount', nuevaCuenta)
    },
    addCategoryIncome(context,newCategory){
      context.commit('addCategory',newCategory)
    },
    addCategoryExpense(context,newCategory){
      context.commit('addCategory',newCategory)
    }
  }
})
