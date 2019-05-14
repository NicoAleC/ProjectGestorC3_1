import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Transfer from '@/components/Transfer.vue'

describe('Transfer.vue', () => {
  const msg = 'new message'
  let wrapper
  beforeEach(function () {
    wrapper = shallowMount(Transfer, {
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
