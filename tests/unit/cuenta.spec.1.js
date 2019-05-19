import { assert } from 'chai'
import { shallowMount, mount } from '@vue/test-utils'
import ListaCuentas from '@/components/Lista.vue'
import Cuenta from '@/components/Cuenta.vue'
import StoreUtil from './StoreUtil.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

suite('Cuenta', function(){


test('Objeto cuentas debería mantenerse igual después de intentar eliminar cuenta con ingresos o egresos',
  function(){
    let store = StoreUtil.getDefaultStore()
    let wrapper  = shallowMount(ListaCuentas,{store})
    let cuentas = wrapper.findAll(Cuenta)
    let cuentasAntes = JSON.parse(JSON.stringify(cuentas))
    cuentas.at(0).vm.eliminarCuenta()  
    assert.equal(cuentasAntes,cuentas)
  })
})

