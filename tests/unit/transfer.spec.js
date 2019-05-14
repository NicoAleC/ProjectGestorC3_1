import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StoreUtil from './StoreUtil'
import Transfer from '@/components/DataTable.vue'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Transfer.vue', () => {
  let store = StoreUtil.getDefaultStore()

  it('verifica no se excede la transferencia', () => {
    let wrapper = shallowMount(Transfer, {
      store
    })
    var cuentaNueva = { id: 1000, nombre: 'Prueba', ingresos: [], egresos: [] }
    wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva)
    let cuentasStore = wrapper.vm.cuentas
    let idCuenta2 = 1000
    wrapper.vm.amount = -100
    wrapper.vm.selectedaccount = idCuenta2
    let egresosC1Antes = JSON.parse(JSON.stringify(cuentasStore[0].egresos))
   /* let ingresosC2Antes = JSON.parse(JSON.stringify(cuentasStore[1].ingresos))
    expect(wrapper.vm.saveTransfer()).to.alert()*/
  })
})