import { assert } from 'chai'
import { shallowMount } from '@vue/test-utils'
import {mount} from '@vue/test-utils'
import {Transfer} from '@/components/Transfer.vue'
import {CategoryList} from '@/components/CategoryList.vue'
import {ListaCuentas} from "@/components/ListaCuentas.vue"
import {StoreUtil} from './StoreUtil.js'

describe('Transfer.vue', () => {

it('transferencia registra un ingreso a la cuenta destino y un egreso a la cuenta actual', () =>{
    let wrapperTrans = shallowMount(Transfer,{

    })

}),

it('La lista de categorías cambia si estás en ingresos o egresos', () =>{
    let wrapperCategoryList = mount(CategoryList, {

    })
}),

it('Se guarda el id de la cuenta clickeada en el store como cuenta actual', () =>{
    let wrapper = mount(ListaCuentas, {

    })
})

})
