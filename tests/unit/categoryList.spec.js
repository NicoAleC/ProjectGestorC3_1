import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StoreUtil from './StoreUtil'
import CategoryList from '@/components/CategoryList.vue'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('CategoryList.vue', () => {
  let wrapper
  let store
  beforeEach(function () {
    store = StoreUtil.getDefaultStore()
    wrapper = shallowMount(CategoryList, {
      store
    })
  })
  it('render button', () => {
    expect(wrapper.find('.button').exists())
  })
  it('lista categorias', () => {
    expect(wrapper.find('.listaCategoria').exists())
  })
})
