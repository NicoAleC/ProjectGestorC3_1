import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StoreUtil from './StoreUtil'
import DataTable from '@/components/DataTable.vue'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

describe('DataTable.vue', () => {
    let wrapper;
    let store;

    before(function () {

    })

    beforeEach(function () {
        store = StoreUtil.getDefaultStore();
        wrapper = shallowMount(DataTable,
            {
                store
            })
    })

    it('detectada lista de egresos', () => {
        store.dispatch('cambiarTransaccion', 'Egresos')
        expect(wrapper.vm.escogerTransaccion()[0].ntrans).to.equals(3)
    })

    it  ('agrega elementos a la lista de ingresos', () => {
        wrapper.vm.itemEditado.monto = '30'
        wrapper.vm.itemEditado.fecha = '2012/10/20'
        wrapper.vm.itemEditado.categoria = 'Otros'
        wrapper.vm.salvar()
        expect(wrapper.vm.escogerTransaccion()[1].monto).to.equals(30)
    })

    it  ('agrega elementos a la lista de egresos', () => {
        store.dispatch('cambiarTransaccion', 'Egresos')
        wrapper.vm.itemEditado.monto = '20'
        wrapper.vm.itemEditado.fecha = '2010/10/20'
        wrapper.vm.itemEditado.categoria = 'Otros'
        wrapper.vm.salvar()
        expect(wrapper.vm.escogerTransaccion()[1].monto).to.equals(20)
    })

    afterEach(function () {

    })
})