<template>
  <button class="btn btn-primary static-button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
    Add ➕
  </button>
  <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">Adding new todo</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form class="row row-cols-lg-auto g-3 align-items-center">
        <div class="col-12">
          <label for="title" class="visually-hidden">Title</label>
          <div class="input-group">
            <input type="text" class="form-control"  placeholder="Enter your title" id="title" v-model="title" required>
            <div class="invalid-feedback">
              Please enter a title of todo.
            </div>
          </div>
        </div>

        <div class="col-12">
          <label for="description" class="visually-hidden">Description</label>
          <div class="input-group">
            <input type="text" class="form-control"  placeholder="Enter your description" id="description" v-model="description" required>
          </div>
        </div>
          <div class="col-12">
            <label for="category" class="form-label">Category</label>
            <select id="selectedCategory" class="form-select" v-model="selectedCategory.categoryId" required>
              <option value="" selected disabled> Choose...</option>
              <option v-for="cat in categories" :key="cat.categoryId" v-bind:value="cat.categoryId"> {{ cat.categoryTitle }} </option>
            </select>
            <div class="invalid-feedback">
              Please select a valid category.
            </div>
        </div>

        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="button" class="btn btn-success" @click="createTodo">Submit</button>
          <button type="button" class="btn btn-danger">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoCreateForm',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      title: '',
      description: '',
      selectedCategory: [{
        categoryId: '',
        categoryTitle: ''
      }]
    }
  },
  emits: ['created'],
  methods: {
    createTodo () {
      // const baseUrl = process.env.VUE_APP_BACKEND_BASE_URL
      // const endpoint = baseUrl + '/api/todoo
      const endpoint = 'http://localhost:8080/api/todo'
      console.log('New todo Created')
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')
      const raw = JSON.stringify({
        title: this.title,
        description: this.description,
        category: {
          categoryId: this.selectedCategory.categoryId,
          categoryTitle: this.selectedCategory.categoryTitle
        }
      })
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }
      fetch(endpoint, requestOptions)
        .then(response => response.json())
        .then(result => console.log('Success:', result))
        .catch(error => console.log('error', error))
    }
  }
}
</script>

<style scoped>
.static-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 30px;
}
</style>
