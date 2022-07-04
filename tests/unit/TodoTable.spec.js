import { shallowMount } from '@vue/test-utils'
import TodoTable from '@/components/TodoTable'

describe('testing TodoTable', () => {
  it('should prove the absence of component classes', () => {
    const wrapper = shallowMount(TodoTable, {
      props: {
        todos: []
      }
    })

    expect(wrapper.classes() == null)
  })
})
