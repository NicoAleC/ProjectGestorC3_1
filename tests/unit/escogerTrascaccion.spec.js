import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StoreUtil from './StoreUtil'
import EscogerTransaccion from '@/components/EscogerTransaccion.vue'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('EscogerTransaccion.vue', () => {
  let wrapper
  let store

  before(function() {

  })

  beforeEach(function() {
    store = StoreUtil.getDefaultStore()
    wrapper = shallowMount(EscogerTransaccion,
        {
          store
        })
  })

  it('cambio de estado a Ingresos', () => {
    wrapper.vm.irAIngresos()
    expect(wrapper.vm.tipoTransaccion).to.equals('Ingresos')
  })

  it('cambio de estado a Egresos', () => {
    wrapper.vm.irAEgresos()
    expect(wrapper.vm.tipoTransaccion).to.equals('Egresos')
  })

  afterEach(function() {

  })
})
