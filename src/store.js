import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    CUENTAS: [
      {
        id: 11,
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
    anadirCuenta(context, nuevaCuenta) {
      context.CUENTAS.push(nuevaCuenta)
    },
    anadirCategoriaIngreso(context, nuevaCategoria) {
      context.CATEGORIAS_INGRESOS.push(nuevaCategoria)
    },
    anadirCategoriaEgreso(context, nuevaCategoria) {
      context.CATEGORIAS_EGRESOS.push(nuevaCategoria)
    },
    cambiarCuentaActual(context, nuevoId) {
      context.CUENTA_ACTUAL = nuevoId
    },
    cambiarTransaccion(context, transaccion) {
      context.TIPO_TRANSACCION = transaccion
    },
    eliminarCuenta(context, datosCuenta) {

      if (datosCuenta.cuenta.ingresos.length > 0 || datosCuenta.cuenta.egresos.length > 0) {
        alert("No se pueden eliminar cuentas que tengan ingresos o egresos")
      } else {
        context.CUENTAS.splice(datosCuenta.index, 1)
      }
    },
    editarNombreCuenta(context, datosCuenta) {
      context.CUENTAS[datosCuenta.indexCuenta].nombre = datosCuenta.nombreActual
    },
    editarCategoriaIngresos(context, datosCategoria) {
      context.CATEGORIAS_INGRESOS[datosCategoria.indexCategoria].nombre = datosCategoria.nombreActual
    },
    editarCategoriaEgresos(context, datosCategoria) {
      context.CATEGORIAS_EGRESOS[datosCategoria.indexCategoria].nombre = datosCategoria.nombreActual
    },
    registrarTransferencia(context, datosTransferencia) {
      datosTransferencia.egresosCuentaActual.push(datosTransferencia.nuevoEgreso)
      datosTransferencia.ingresosCuentaAenviar.push(datosTransferencia.nuevoIngreso)
    },
    modificarItem(context, datosItem) {
      let index = context.CUENTAS.findIndex(cuenta => cuenta.id === context.CUENTA_ACTUAL)
      if (context.TIPO_TRANSACCION === 'Ingresos') {
        Object.assign(
          context.CUENTAS[index].ingresos[datosItem[0]],
          datosItem[1]
        )
      } else {
        Object.assign(
          context.CUENTAS[index].egresos[datosItem[0]],
          datosItem[1]
        )
      }
    },
    guardarItem(context, datosItem) {
      let index = context.CUENTAS.findIndex(cuenta => cuenta.id === context.CUENTA_ACTUAL)
      if(context.TIPO_TRANSACCION === 'Ingresos'){
        context.CUENTAS[index].ingresos.push(datosItem)
      } else {
        context.CUENTAS[index].egresos.push(datosItem)
      }
    },
    eliminarItem(context, datosItem){
      let index = context.CUENTAS.findIndex(cuenta => cuenta.id === context.CUENTA_ACTUAL)
      if(context.TIPO_TRANSACCION === 'Ingresos'){
        context.CUENTAS[index].ingresos.splice(datosItem, 1)
      } else {
        context.CUENTAS[index].egresos.splice(datosItem, 1)
      }
    }
  },
  actions: {
    anadirCuenta(context, nuevaCuenta) {
      context.commit('anadirCuenta', nuevaCuenta)
    },
    anadirCategoriaIngreso(context, nuevaCategoria) {
      context.commit('anadirCategoriaIngreso', nuevaCategoria)
    },
    anadirCategoriaEgreso(context, nuevaCategoria) {
      context.commit('anadirCategoriaEgreso', nuevaCategoria)
    },
    cambiarCuentaActual(context, nuevoId) {
      context.commit('cambiarCuentaActual', nuevoId)
    },
    cambiarTransaccion(context, transaccion) {
      context.commit('cambiarTransaccion', transaccion)
    },
    eliminarCuenta(context, datosCuenta) {
      context.commit('eliminarCuenta', datosCuenta)
    },
    editarNombreCuenta(context, indexCuenta) {
      context.commit('editarNombreCuenta', indexCuenta)
    },
    editarCategoriaIngresos(context, datosCategoria) {
      context.commit('editarCategoriaIngresos', datosCategoria)
    },
    editarCategoriaEgresos(context, datosCategoria) {
      context.commit('editarCategoriaEgresos', datosCategoria)
    },
    registrarTransferencia(context, datosTransferencia) {
      context.commit('registrarTransferencia', datosTransferencia)
    },
    modificarItem(context, datosItem) {
      context.commit('modificarItem', datosItem)
    },
    guardarItem(context, datosItem) {
      context.commit('guardarItem', datosItem)
    },
    eliminarItem(context, datosItem){
      context.commit('eliminarItem', datosItem)
    }
  },
  plugins: [(new VuexPersistence({
    key: 'gestor',
    storage: window.localStorage
  })).plugin]
})
