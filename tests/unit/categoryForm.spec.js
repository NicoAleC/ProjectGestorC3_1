import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import CategoryForm from '@/components/CategoryForm.vue'

describe('CategoryForm.vue', () => {
  const msg = 'new message'
  let wrapper
  beforeEach(function() {
    wrapper = shallowMount(CategoryForm, {
      propsData: { msg }
    })
  })
  it('render button', () => {
    expect(wrapper.find('.button').exists())
  })
})
