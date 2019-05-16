import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StoreUtil from './StoreUtil'
import Transfer from '@/components/Transfer.vue'
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
    store.dispatch('anadirCuenta', cuentaNueva)
    let idCuenta2 = 1000
    wrapper.vm.amount = -100
    wrapper.vm.selectedaccount = idCuenta2
    wrapper.vm.saveTransfer()
    expect(wrapper.vm.obtenerSaldo()).to.equal(1200)
  })
})
