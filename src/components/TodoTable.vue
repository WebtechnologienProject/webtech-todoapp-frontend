<template>
  <table class="table table-bordered mt-5">
    <thead>
    <tr>
      <th scope="col">Task</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Category</th>
      <th scope="col">Edit</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="todos.length === 0">
      <td colspan="6">You haven't saved any todos yet</td>
    </tr>
    <tr class="col" v-for="todo in todos" :key="todo.todoId">
      <th scope="row">
        <div class="form-check">
        <input class="form-check-input" type="checkbox" value="done" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
        </label>
      </div>
      </th>
      <td> {{ todo.title }} </td>
      <td> {{ todo.description }} </td>
      <td> {{ todo.category.categoryTitle }} </td>
      <td>
        <button style="margin-left: 10px" @click="editTask">✏️</button>
        <button style="margin-left: 10px" @click="toMyDay"> 🌞 </button>
        <button style="margin-left: 10px" @click="deleteTask">❌ </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TodoTable',
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      title: this.title,
      description: this.description,
      category: {
        categoryId: this.categoryId,
        categoryTitle: this.categoryTitle
      },
      done: false
    }
  },
  methods: {
    editTask () {
    },
    deleteTask () {
    },
    toMyDay () {
    },
    doneTask () {
      this.done = []
      for (const i in this.todos) {
        this.done.push(this.todos[i].todoId)
      }
    }
  }
}
</script>

<style scoped>
</style>
