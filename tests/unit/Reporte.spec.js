import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StoreUtil from './StoreUtil'
import Reporte from '@/components/Reporte.vue'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Reporte.vue', () => {
  let wrapper
  let store

  before(function() {

  })

  beforeEach(function() {
    store = StoreUtil.getDefaultStore()
    wrapper = shallowMount(Reporte,
        {
          store
        })
  })

  it('detecta el color verde de un ingreso en reportes', () => {
    expect(wrapper.vm.ingresosEgresos[0].color).to.equal('lightgreen')
  })

  it('detecta el color rojo de un egreso en reportes', () => {
    expect(wrapper.vm.ingresosEgresos[1].color).to.equal('lightcoral')
  })

  it('filtra por categoría', () => {
    wrapper.vm.categoriaSeleccionada = 'Transferencia'
    expect(wrapper.vm.categoriaASeleccionar().length).to.equal(1)
  })

  afterEach(function() {

  })
})
