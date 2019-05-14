import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Category from '@/components/Category.vue'

describe('Category.vue', () => {
  const msg = 'new message'
  let wrapper
  beforeEach(function () {
    wrapper = shallowMount(Category, {
      propsData: { msg }
    })
  })
  it('render button', () => {
    expect(wrapper.find('.button').exists())
  })
  it('input slot', () => {
    expect(wrapper.find('.input').exists())
  })
})
