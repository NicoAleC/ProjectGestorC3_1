import { assert } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ListaCuentas from '@/components/Lista.vue'
import Cuenta from '@/components/Cuenta.vue'
import StoreUtil from './StoreUtil.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

suite('Cuenta', function() {
  test('Objeto cuentas debería mantenerse igual después de intentar eliminar cuenta con ingresos o egresos',
      function() {
        const store = StoreUtil.getDefaultStore()
        const wrapper = shallowMount(ListaCuentas, { store })
        const cuentas = wrapper.findAll(Cuenta)
        const cuentasAntes = JSON.parse(JSON.stringify(cuentas))
        cuentas.at(0).vm.eliminarCuenta()
        assert.equal(cuentasAntes, cuentas)
      })
})

