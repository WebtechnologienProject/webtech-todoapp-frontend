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
      <form class="row row-cols-lg-auto needs-validation g-3 align-items-center" id="todo-create-form" novalidate>
        <div class="col-12">
          <label for="title">Title</label>
          <div class="input-group">
            <input type="text" class="form-control"  placeholder="Enter your title" id="title" v-model="title" required>
            <div class="invalid-feedback">
              Please enter a title of todo.
            </div>
          </div>
        </div>

        <div class="col-12">
          <label for="description">Description</label>
          <div class="input-group">
            <input type="text" class="form-control"  placeholder="Enter your description" id="description" v-model="description">
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
        <div class="col-12">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="myDay" v-model="myDay">
            <label class="form-check-label" for="myDay">
              My Day?
            </label>
          </div>
        </div>

        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="submit" class="btn btn-success" @click="createTodo">Submit</button>
          <button type="reset" class="btn btn-danger">Reset</button>
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
      }],
      myDay: false
    }
  },
  emits: ['created'],
  methods: {
    createTodo () {
      const valid = this.validate()
      if (valid) {
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
          },
          myDay: this.myDay
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
    },
    validate () {
      let valid = true
      const forms = document.querySelectorAll('.needs-validation')
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              valid = false
              event.preventDefault()
              event.stopPropagation()
            }
            forms.classList.add('was-validated')
          }, false)
        })
      return valid
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
