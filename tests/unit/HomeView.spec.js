import { shallowMount } from '@vue/test-utils'
import TodoTable from '@/components/ToDoTable'
import HomeView from '@/views/HomeView'
import TodoCreateForm from '@/components/TodoCreateForm'

describe('Testing HomeView.vue', () => {
  const wrapper = shallowMount(HomeView)

  it('should have create-form component', () => {
    const createForm = wrapper.findComponent(TodoCreateForm)
    expect(createForm.exists()).toBeTruthy()
  })

  it('should have todo-table component', () => {
    const table = wrapper.findComponent(TodoTable)
    expect(table.exists()).toBeTruthy()
  })
})
