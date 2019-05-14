import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import store from './store'
import EscogerTransaccion from '@/components/EscogerTransaccion.vue'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

describe('EscogerTransaccion.vue', () => {
    let wrapper;
    let store;

    before(function () {

    })

    beforeEach(function () {
        store = store.getDefaultStore();
        wrapper = shallowMount(EscogerTransaccion,
            {
                store
            })
    })

    it('cambio de estado exitoso', () => {
        wrapper.vm.irAIngresos()
        //wrapper.irAIngresos()
        expect(wrapper.vm.tipoTransaccion()).to.equals('Ingresos')
    })

    afterEach(function () {

    })
})