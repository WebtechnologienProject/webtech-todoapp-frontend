<template>
  <h1>Todos for today</h1>
  <todo-create-form :categories="this.categories"></todo-create-form>
  <div class="row mt-2">
    <todo-table :todos="checkTodosForToday(todos,true, false)" @delete-task="deleteTask" @set-done="setDone" @set-myDay="setMyDay"></todo-table>
  </div>
  <h5>Done tasks</h5>
  <div class="row mt-2">
    <todo-table :todos="checkTodosForToday(todos,true,true)" @delete-task="deleteTask" @set-done="setDone" @set-myDay="setMyDay"></todo-table>
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
    setMyDay (todo) {
      const request = { ...todo, myDay: !todo.myDay }
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const body = JSON.stringify(request)
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/api/todo`
      const requestOptions = {
        method: 'PUT',
        headers,
        body,
        redirect: 'follow'
      }
      fetch(endpoint + '/' + todo.todoId, requestOptions)
        .then(result => this.loadTodos())
        .catch((error) => console.log('error', error))
    },
    setDone (todo) {
      console.log(todo)
      const request = { ...todo, done: !todo.done }
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const body = JSON.stringify(request)
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/api/todo`
      const requestOptions = {
        method: 'PUT',
        headers,
        body,
        redirect: 'follow'
      }
      fetch(endpoint + '/' + todo.todoId, requestOptions)
        .then(result => this.loadTodos())
        .catch((error) => console.log('error', error))
    },
    checkTodosForToday (todos, isMyDay, isDone) {
      return this.todos.filter(a => (a.myDay === isMyDay && a.done === isDone)).sort()
    },
    deleteTask (todoId) {
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/api/todo`
      const requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      }
      fetch(endpoint + '/' + todoId, requestOptions)
        .then(result => this.loadTodos())
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
        .then(result => (this.todos = [...result]))
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
