import { shallowMount } from '@vue/test-utils'
import TodoTable from '@/components/ToDoTable'
import TodoView from '@/views/TodoView'
import TodoCreateForm from '@/components/TodoCreateForm'

describe('Testing TodoView.vue', () => {
  const wrapper = shallowMount(TodoView)

  it('should tell if title of page is there', () => {
    // when
    // eslint-disable-next-line no-undef
    const wrapper = mount(TodoView)

    // then
    expect(wrapper.text()).toMatch('All tasks')
  })

  it('should have create-form component', () => {
    // when

    // then
    const createForm = wrapper.findComponent(TodoCreateForm)
    expect(createForm.exists()).toBeTruthy()
  })

  it('should have todo-table component', () => {
    // when

    // then
    const table = wrapper.findComponent(TodoTable)
    expect(table.exists()).toBeTruthy()
  })
})
