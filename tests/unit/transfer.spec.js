import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StoreUtil from './StoreUtil'
import Transfer from '@/components/Transfer.vue'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Transfer.vue', () => {
  const store = StoreUtil.getDefaultStore()

  it('verifica no se excede la transferencia', () => {
    const wrapper = shallowMount(Transfer, {
      store
    })
    const cuentaNueva = { id: 1000, nombre: 'Prueba', ingresos: [], egresos: [] }
    store.dispatch('anadirCuenta', cuentaNueva)
    const idCuenta2 = 1000
    wrapper.vm.amount = -100
    wrapper.vm.selectedaccount = idCuenta2
    wrapper.vm.saveTransfer()
    expect(wrapper.vm.obtenerSaldo()).to.equal(1200)
  })
})
