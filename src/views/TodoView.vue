<template>
  <h1>Welcome to ToDo-List</h1>
  <todo-create-form :categories="this.categories"></todo-create-form>
  <div id="todo-list">
    <todo-table :todos="this.todos"></todo-table>
  </div>
</template>

<script>
import TodoTable from '@/components/TodoTable'
import TodoCreateForm from '@/components/TodoCreateForm'
export default {
  name: 'TodoView',
  components: { TodoCreateForm, TodoTable },
  data () {
    return {
      todos: [],
      categories: []
    }
  },
  methods: {
    loadTodos () {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/todo'
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(todo => {
          this.todos.push(todo)
        }))
        .catch(error => console.log('error', error))
    },
    loadCategories () {
      const endpoint = process.env.VUE_APP_BACKEND_BASE_URL + '/api/categories'
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }

      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => result.forEach(category => {
          this.categories.push(category)
        }))
        .catch(error => console.log('error', error))
    }
  },
  async created () {
    this.loadTodos()
    this.loadCategories()
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
