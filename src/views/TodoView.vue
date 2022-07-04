<template>
  <h1>All tasks</h1>
  <todo-create-form :categories="this.categories"></todo-create-form>
  <div class="row mt-2">
    <p class="for-do">New todos for doing:</p>
    <todo-table :todos="checkTodos(todos,false)" @delete-task="deleteTask" @set-done="setDone(todos.todoId)"></todo-table>
  </div>
  <h5>Done tasks</h5>
  <div class="row mt-2">
    <todo-table :todos="checkTodos(todos,true)" @delete-task="deleteTask" @set-done="setDone(todos.todoId)"></todo-table>
  </div>
  <div>{{todoData}}</div>
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
      categories: [],
      todoData: null
    }
  },
  methods: {
    checkTodos (todos, isDone) {
      return this.todos.filter(a => a.done === isDone).sort()
    },
    setDone (todos, todoId) {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({
        todoId: todoId,
        title: this.title,
        description: this.description,
        category: {
          categoryId: this.category.categoryId,
          categoryTitle: this.category.categoryTitle
        },
        done: true
      })

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      fetch(process.env.VUE_APP_BACKEND_BASE_URL + '/api/todo/' + todoId, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
      console.log('done successful')
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
    editTask (todoId) {
      const endpoint = `${process.env.VUE_APP_BACKEND_BASE_URL}/api/todo`
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({
        todoId: todoId,
        title: 'Todo number one',
        description: 'Description of todo',
        category: {
          categoryId: 1,
          categoryTitle: 'My day'
        },
        done: true
      })
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }
      fetch(endpoint + '/' + todoId, requestOptions)
        .then(result => console.log('Success:', result))
        .catch((error) => console.log('error', error))
      if (todoId > -1) {
        this.todos.splice(todoId, 1)
      }
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
  mounted () {
    this.loadTodos()
    this.loadCategories()
  }
}
</script>

<style scoped>
</style>
