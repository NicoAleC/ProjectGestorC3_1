import { assert } from 'chai'
import { shallowMount, mount } from '@vue/test-utils'

import Transfer from '@/components/Transfer.vue'
import CategoryList from '@/components/CategoryList.vue'
import ListaCuentas from '@/components/ListaCuentas.vue'
import Cuenta from '@/components/Cuenta.vue'
import StoreUtil from './StoreUtil.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Transfer.vue', () => {
  const store = StoreUtil.getDefaultStore()

  it('transferencia registra un ingreso a la cuenta destino y un egreso a la cuenta actual', () => {
    const wrapper = shallowMount(Transfer, {
      store
    })
    const cuentaNueva = { id: 1000, nombre: 'Prueba', ingresos: [], egresos: [] }
    wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva)
    const cuentasStore = wrapper.vm.cuentas
    const idCuenta2 = 1000
    wrapper.vm.amount = 100
    wrapper.vm.selectedaccount = idCuenta2
    const egresosC1Antes = JSON.parse(JSON.stringify(cuentasStore[0].egresos))
    const ingresosC2Antes = JSON.parse(JSON.stringify(cuentasStore[1].ingresos))
    wrapper.vm.saveTransfer()
    const egresosC1Despues = cuentasStore[0].egresos
    const ingresosC2Despues = cuentasStore[1].ingresos
    const bool = !!((egresosC1Antes.length + 1 === egresosC1Despues.length) &&
      (ingresosC2Antes.length + 1 === ingresosC2Despues.length))
    assert.equal(bool, true)
  })
})

describe('CategoryList.vue', () => {
  const store = StoreUtil.getDefaultStore()

  it('La lista de categorías cambia si estás en ingresos o egresos', () => {
    const wrapper = mount(CategoryList, {
      store
    })
    const listaIngresos = JSON.parse(JSON.stringify(wrapper.vm.escogerTransaccion()))
    const tipo = 'Egresos'
    wrapper.vm.$store.dispatch('cambiarTransaccion', tipo)
    const listaEgresos = JSON.parse(JSON.stringify(wrapper.vm.escogerTransaccion()))
    const bool = listaIngresos === listaEgresos
    assert.equal(bool, false)
  })
})

describe('ListaCuentas.vue', () => {
  const store = StoreUtil.getDefaultStore()
  it('Se crean cuentas correctamente', () => {
    const wrapper = mount(ListaCuentas, {
      store
    })
    const cuentaNueva1 = { id: 1000, nombre: 'Prueba 1', ingresos: [], egresos: [] }
    const cuentaNueva2 = { id: 1001, nombre: 'Prueba 2', ingresos: [], egresos: [] }
    const cuentaNueva3 = { id: 1002, nombre: 'Prueba 3', ingresos: [], egresos: [] }

    wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva1)
    wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva2)
    wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva3)

    const cuentas = wrapper.findAll(Cuenta)
    const largoAntes = cuentas.length
    assert.equal(largoAntes, 4, 'pasa valores incorrectos')
  })
})

describe('ListaCuentas.vue', () => {
  const store = StoreUtil.getDefaultStore()
  it('Se elimina una cuenta correctamente', () => {
    const wrapper = mount(ListaCuentas, {
      store
    })
    const cuentaNueva1 = { id: 1000, nombre: 'Prueba 1', ingresos: [], egresos: [] }
    const cuentaNueva2 = { id: 1001, nombre: 'Prueba 2', ingresos: [], egresos: [] }
    const cuentaNueva3 = { id: 1002, nombre: 'Prueba 3', ingresos: [], egresos: [] }

    wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva1)
    wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva2)
    wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva3)

    const cuentas = wrapper.findAll(Cuenta)
    console.log(cuentas.length)
    const largoAntes = cuentas.length
    cuentas.at(0).vm.eliminarCuenta()
    const cuentasDespues = wrapper.findAll(Cuenta)
    const largoDespues = cuentasDespues.length
    assert.equal(largoAntes, largoDespues, 'valores cuentas no iguales')
  })
})

