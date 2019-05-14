import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import TestUtil from './TestUtil.js'
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
        store = TestUtil.getDefaultStore();
        wrapper = shallowMount(Home,
            {
                store
            })
    })

    it('', () => {
        const wrapper = shallowMount(EscogerTransaccion)
        wrapper.vm.
        expect(wrapper.text()).to.include(msg)
    })

    afterEach(function () {

    })
})