import { assert } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import  Transfer  from '@/components/Transfer.vue'
import  CategoryList  from '@/components/CategoryList.vue'
import  ListaCuentas  from "@/components/ListaCuentas.vue"
import  Cuenta  from "@/components/Cuenta.vue"
import  StoreUtil  from './StoreUtil.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

describe('Transfer.vue', () => {
     let store  = StoreUtil.getDefaultStore()

    it('transferencia registra un ingreso a la cuenta destino y un egreso a la cuenta actual', () => {
        let wrapper = shallowMount(Transfer, {
            store
        })
        var cuentaNueva = { id: 1000, nombre: "Prueba", ingresos: [], egresos: [] }
        wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva)
        let cuentasStore = wrapper.vm.cuentas
        let idCuenta1 = 11
        let idCuenta2 = 1000
        wrapper.vm.amount = 100
        wrapper.vm.selectedaccount = idCuenta2
        let egresosC1Antes = JSON.parse(JSON.stringify(cuentasStore[0].egresos))
        let ingresosC2Antes = JSON.parse(JSON.stringify(cuentasStore[1].ingresos))
        wrapper.vm.saveTransfer()
        let egresosC1Despues = cuentasStore[0].egresos
        let ingresosC2Despues = cuentasStore[1].ingresos
        let bool = (egresosC1Antes.length + 1 == egresosC1Despues.length ) &&
            (ingresosC2Antes.length + 1 == ingresosC2Despues.length ) ?
            true : false
        assert.equal(bool, true)
    })
})

describe('CategoryList.vue', () => {

    let store = StoreUtil.getDefaultStore()

    it('La lista de categorías cambia si estás en ingresos o egresos', () => {
        let wrapper = mount(CategoryList, {
            store
        })
        var listaIngresos = JSON.parse(JSON.stringify(wrapper.vm.escogerTransaccion()))
        let tipo = 'Egresos'
        wrapper.vm.$store.dispatch('cambiarTransaccion', tipo)
        var listaEgresos = JSON.parse(JSON.stringify(wrapper.vm.escogerTransaccion()))
        var bool = listaIngresos == listaEgresos ? true : false
        assert.equal(bool, false)
    })

})

describe('ListaCuentas.vue', () => {

    let store = StoreUtil.getDefaultStore()
    it('Se elimina una cuenta correctamente', () => {
        let wrapper = mount(ListaCuentas, {
            store
        })
        let cuentaNueva1 = { id: 1000, nombre: "Prueba 1", ingresos: [], egresos: [] }
        let cuentaNueva2 = { id: 1001, nombre: "Prueba 2", ingresos: [], egresos: [] }
        let cuentaNueva3 = { id: 1002, nombre: "Prueba 3", ingresos: [], egresos: [] }

        wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva1)
        wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva2)
        wrapper.vm.$store.dispatch('anadirCuenta', cuentaNueva3)

        let cuentas = wrapper.findAll(Cuenta)
        console.log(cuentas.length)
        let largoAntes = cuentas.length
        cuentas.at(0).vm.eliminarCuenta()
        let cuentasDespues = wrapper.findAll(Cuenta)
        let largoDespues  = cuentasDespues.length
        assert.equal(largoAntes, largoDespues + 1)
    })
})