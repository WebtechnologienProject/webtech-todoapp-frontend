import { mount } from '@vue/test-utils'
import TodoCreateForm from '@/components/TodoCreateForm'

describe('Testing TodoCreateForm.vue', () => {
  it('should not show form by default unless clicked', () => {
    // when
    const wrapper = mount(TodoCreateForm)

    // then
    expect(wrapper.find('#offcanvasBottom').classes()).not.toContain('show')
  })
})
