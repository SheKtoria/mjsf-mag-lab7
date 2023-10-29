<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-8">
        <div class="card">
          <div class="card-body p-4">
            <form @submit.prevent="login">
              <h2>Log in</h2>
              <div class="mb-2">
                <input type="email" placeholder="Email" required v-model="email">
              </div>
              <div class="mb-2">
                <input type="password" placeholder="Password" required v-model="password">
              </div>
              <div v-if="error.show">
                <p class="text-danger">{{ error.text }}</p>
              </div>
              <button class="mt-3 mb-3">Log in</button>
              <p>Don`t have an account?
                <router-link to="/register">Register</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase/index.js'
import router from "../../router/index.js";
import TasksNavigation from "../TasksNavigation.vue";
import TasksList from "../TasksList.vue";
import AddNewTask from "../AddNewTask.vue";
import {mapActions} from "vuex";

export default {
  components: {AddNewTask, TasksList, TasksNavigation},
  data() {
    return {
      email: '',
      password: '',
      error: {text: '', show: false}
    }
  },
  methods: {
    ...mapActions(['authUser']),
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            this.authUser(auth.currentUser)
            router.push({path: '/todo'})
          })
          .catch((error) => {
            this.error.text = error.message;
            this.error.show = true;
          })
    }
  }
}
</script>