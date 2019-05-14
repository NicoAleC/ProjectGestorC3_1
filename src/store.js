import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CUENTAS: [
      { id: 11,
        nombre: 'Mateo',
        ingresos: [
          { ntrans: 1, descripcion: 'mensualidad abril', monto: 1500, fecha: '2012/12/12', categoria: 'Transferencia' }
        ],
        egresos: [
          { ntrans: 3, descripcion: 'pago universidad', monto: 300, fecha: '2012/12/19', categoria: 'Expensas' }
        ]
      }],
    CATEGORIAS_INGRESOS: [
      { id: 0, nombre: 'Salario' },
      { id: 1, nombre: 'Transferencia' },
      { id: 2, nombre: 'Otros' }],
    CATEGORIAS_EGRESOS: [
      { id: 0, nombre: 'Expensas' },
      { id: 1, nombre: 'Transferencia' },
      { id: 2, nombre: 'Otros' }],
    CUENTA_ACTUAL: 11,
    TIPO_TRANSACCION: 'Ingresos'
  },
  mutations: {
    anadirCuenta (context, nuevaCuenta) {
      context.CUENTAS.push(nuevaCuenta)
    },
    anadirCategoriaIngreso (context, nuevaCategoria) {
      context.CATEGORIAS_INGRESOS.push(nuevaCategoria)
    },
    anadirCategoriaEgreso (context, nuevaCategoria) {
      context.CATEGORIAS_EGRESOS.push(nuevaCategoria)
    },
    cambiarCuentaActual (context, nuevoId) {
      context.CUENTA_ACTUAL = nuevoId
    },
    cambiarTransaccion (context, transaccion) {
      context.TIPO_TRANSACCION = transaccion
    }
  },
  actions: {
    anadirCuenta (context, nuevaCuenta) {
      context.commit('anadirCuenta', nuevaCuenta)
    },
    anadirCategoriaIngreso (context, nuevaCategoria) {
      context.commit('anadirCategoriaIngreso', nuevaCategoria)
    },
    anadirCategoriaEgreso (context, nuevaCategoria) {
      context.commit('anadirCategoriaEgreso', nuevaCategoria)
    },
    cambiarCuentaActual (context, nuevoId) {
      context.commit('cambiarCuentaActual', nuevoId)
    },
    cambiarTransaccion (context, transaccion) {
      context.commit('cambiarTransaccion', transaccion)
    }
  }
})
