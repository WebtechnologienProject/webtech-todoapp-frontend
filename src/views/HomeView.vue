<template>
  <h1>Todos for today</h1>
  <todo-create-form :categories="this.categories"></todo-create-form>
  <div class="row mt-2">
    <todo-table :todos="checkTodosForToday(todos,true)" @delete-task="deleteTask" @set-done="setDone"></todo-table>
  </div>
  <h5>Done tasks</h5>
  <div class="row mt-2">
    <todo-table :todos="checkTodos(todos,true)" @delete-task="deleteTask" @set-done="setDone(todos.todoId)"></todo-table>
  </div>
</template>

<script>
// @ is an alias to /src
import TodoCreateForm from '@/components/TodoCreateForm'
import TodoTable from '@/components/TodoTable'

export default {
  name: 'HomeView',
  components: { TodoCreateForm, TodoTable },
  data () {
    return {
      todos: [],
      categories: []
    }
  },
  methods: {
    checkTodos (todos, isDone) {
      return this.todos.filter(a => a.done === isDone).sort()
    },
    checkTodosForToday (todos, isMyDay) {
      return this.todos.filter(a => a.myDay === isMyDay).sort()
    },
    deleteTask (todoId) {
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/api/todo`
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }
      fetch(endpoint + '/' + todoId, requestOptions)
        .then(result => console.log('Success:', result))
        .catch((error) => console.log('error', error))
      if (todoId > -1) {
        this.todos.splice(todoId, 1)
      }
    },
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
          console.log('todos loaded')
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
          console.log('categories loaded')
        }))
        .catch(error => console.log('error', error))
    }
  },
  async created () {
    this.loadTodos()
    this.loadCategories()
  }
}
</script>
