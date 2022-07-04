<template>
  <table class="table table-bordered mt-5">
    <thead>
    <tr>
      <th scope="col">###</th>
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
        <div class="form-check" v-if="!todo.done">
          <button @click="setDone">✅</button>
        </div>
      </th>
      <td> {{ todo.title }} </td>
      <td> {{ todo.description }} </td>
      <td> {{ todo.category.categoryTitle }} </td>
      <td>
        <button style="margin-left: 10px" @click="editTask(todos, todo.todoId)"> ✏️</button>
        <button style="margin-left: 10px" v-if="!todo.myDay" @click="setMyDay(todo.todoId)"> 🌞 </button>
        <button type="button" style="margin-left: 10px" @click="deleteTask(todo.todoId)"> ❌ </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TodoTable',
  components: { },
  props: {
    todos: {
      type: Array,
      required: true,
      categories: {
        type: Array,
        required: true
      }
    }
  },
  methods: {
    setMyDay (todoId) {
      this.$emit('set-myDay', todoId)
    },
    setDone (todoId) {
      this.$emit('set-done', todoId)
    },
    deleteTask (todoId) {
      this.$emit('delete-task', todoId)
    },
    editTask (todoId) {
      this.$emit('edit-task', todoId)
    }
  }
}
</script>

<style scoped>
</style>
