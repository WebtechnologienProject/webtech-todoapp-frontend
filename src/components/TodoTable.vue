<template>
  <table class="table table-bordered mt-5">
    <thead>
    <tr>
      <th scope="col">###</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Category</th>
      <th scope="col">Manage</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="todos.length === 0">
      <td colspan="6">You haven't saved any todos yet</td>
    </tr>
    <tr class="col" v-for="todo in todos" :key="todo.todoId">
      <th scope="row">
        <div class="form-check" v-if="!todo.done">
          <button class="btn btn-link" @click="setDone(todo)">✅</button>
        </div>
      </th>
      <td v-if="todo.done"><del> {{ todo.title }} </del> </td>
      <td v-if="!todo.done"> {{ todo.title }} </td>
      <td v-if="!todo.done"> {{ todo.description }} </td>
      <td v-if="todo.done"><del>{{ todo.description }} </del></td>
      <td v-if="!todo.done"> {{ todo.category.categoryTitle }} </td>
      <td v-if="todo.done"><del> {{ todo.category.categoryTitle }} </del></td>
      <td v-if="!todo.done">
        <button class="btn btn-primary" style="margin-left: 10px" v-if="!todo.myDay" @click="setMyDay(todo)"> 🌞 </button>
        <button class="btn btn-primary" style="margin-left: 10px" v-if="todo.myDay" @click="setMyDay(todo)"> 📖 </button>
        <button type="button" style="margin-left: 10px" class="btn btn-primary" @click="deleteTask(todo.todoId)"> ❌ </button>
      </td>
      <td v-if="todo.done">
        <button type="button" style="margin-left: 10px" class="btn btn-primary" @click="deleteTask(todo.todoId)"> ❌ </button>
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
    setMyDay (todo) {
      this.$emit('set-myDay', todo)
    },
    setDone (todo) {
      this.$emit('set-done', todo)
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
