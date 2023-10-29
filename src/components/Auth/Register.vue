<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-8">
        <div class="card">
          <div class="card-body p-4">
            <form @submit.prevent="signUp">
              <div v-if="!resendEmail">
              <h2>Register</h2>
              <div class="mb-2">
                <input aria-required="true" type="text" placeholder="user name" required v-model="username">
              </div>
              <div class="mb-2">
                <input aria-required="true" type="email" placeholder="Email" required v-model="email">
              </div>
              <div class="mb-2">
                <input min="8" aria-required="true" type="password" placeholder="Password" required v-model="password">
              </div>
              <div v-if="error.show">
                <p class="text-danger">{{ error.text }}</p>
              </div>
              <button class="mt-3 mb-3">Sign Up</button>
              <p>Already have an account?
                <router-link to="/login">Sign In</router-link>
              </p>
              </div>
              <div v-else>
                <p class="text-success">Verification list was sent to your email. Please, verify your profile</p>
                <p class="fw-lighter" v-if="resendEmail" @click="resendVerificationEmail">Resend email verification</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createUserWithEmailAndPassword, updateProfile, sendEmailVerification} from 'firebase/auth'
import {auth} from '../../firebase/index.js'
import {mapActions} from "vuex";
import router from "../../router/index.js";

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: {
        text: '',
        show: false
      },
      resendEmail: false
    }
  },
  methods: {
    ...mapActions(['authUser']),
    signUp() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: this.username
            })
            this.verifyUser();
            this.authUser(auth.currentUser)
            this.resendEmail = true;
          })
          .catch((error) => {
            this.error.text = error.message;
            this.error.show = true;
          })
    },
    resendVerificationEmail() {
      auth.currentUser.reload()
      if (!auth.currentUser.emailVerified) {
        this.verifyUser()
      }
      else {
        this.authUser(auth.currentUser)
        router.push('/todo')
      }
    },

    verifyUser() {
      const actionCodeSettings = {url: `http://localhost:5173/todo?verified`};
      sendEmailVerification(auth.currentUser, actionCodeSettings);
    }
  }
}
</script>