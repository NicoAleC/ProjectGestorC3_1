import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CUENTAS: [{id: 11, nombre: 'Mateo', 
              ingresos: [{descripcion: 'mensualidad abril',monto: 1500, fecha: '12/12/12', categoria: 'Transferencia'}]
             ,egresos: [{descripcion: 'pago universidad', monto: 300, fecha: '12/12/19',categoria:'Expensas'}]}],
    CATEGORIAS_INGRESOS: [{id:0, nombre: 'Salario'},
                          {id:1, nombre: 'Transferencia'},
                          {id:2, nombre: 'Otros'}],
    CATEGORIAS_EGRESOS:[{id:0, nombre: 'Expensas'},
                        {id:1, nombre: 'Transferencia'},
                        {id:2, nombre: 'Otros'}],
    CUENTA_ACTUAL: '',
    TIPO_TRANSACCION: 'Ingresos'
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
    },
    changeCurrentAccount(context,nuevoId){
      context.CUENTA_ACTUAL = nuevoId
    },
    changeTransaction(context,transaccion){
      context.TIPO_TRANSACCION = transaccion
    }
  },
  actions: {
    addAccount (context, nuevaCuenta) {
      context.commit('addAccount', nuevaCuenta)
    },
    addCategoryIncome(context,newCategory){
      context.commit('addCategoryIncome',newCategory)
    },
    addCategoryExpense(context,newCategory){
      context.commit('addCategoryExpense',newCategory)
    },
    changeCurrentAccount(context,nuevoId){
      context.commit('changeCurrentAccount',nuevoId)
    },
    changeTransaction(context,transaccion){
      context.commit('changeTransaction',transaccion)
    }
  }
})
