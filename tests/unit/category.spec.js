import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import StoreUtil from './StoreUtil'
import Category from '@/components/Category.vue'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Category.vue', () => {
  let wrapper
  let store
  beforeEach(function () {
    store = StoreUtil.getDefaultStore()
    wrapper = shallowMount(Category, {
      store
    })
  })
  it('render button', () => {
    expect(wrapper.find('.button').exists())
  })
  it('input slot', () => {
    expect(wrapper.find('.input').exists())
  })
})
