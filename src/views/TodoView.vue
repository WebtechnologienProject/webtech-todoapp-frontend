<template>
  <h1>Welcome to ToDo-List</h1>
  <div class="page-content page-container" style="align-content: center">
    <div class="align-content-center">
      <input
        type="text"
        v-model=todos.title
        placeholder="Enter new task"
        class="w-100 from control"
      />
      <input
        type="text"
        v-model=todos.description
        placeholder="Enter description"
        class="w-100 from control"
      />
      <select class="form-select" aria-label="Default select example">
        <option selected>My Day</option>
        <option value="1">Important </option>
        <option value="2">Not Important</option>
        <option value="3">Burning</option>
        <option value="4">Not burning</option>
      </select>
      <button class="btn btn-warning rounded-0" @click="submitTask">
        SUBMIT
      </button>
    </div>
    <table class="table table-bordered mt-5">
      <thead>
      <tr>
        <th scope="col">Task</th>
        <th scope="col" style="width: 120px">Description</th>
        <th scope="col" class="text-center">Category</th>
        <th scope="col" class="text-center">###</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="todo in todos" :key="todo.todoId">
        <td>
            <span>
              {{ todo.title }}
            </span>
        </td>
        <td>
            <span>
              {{ todo.description }}
            </span>
        </td>
        <td>
            <span>
              {{ todo.category }}
            </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TodoView',
  data () {
    return {
      todos: []
    }
  },
  mounted () {
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
  }
}
</script>

<style scoped>
</style>
