<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-8">
        <div class="card">
          <div class="card-body p-4">
            <form @submit.prevent="signUp">
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
              <p class="fw-lighter" v-if="resendEmail" @click="resendVerificationEmail">Resend email verification</p>
              <p>Already have an account?
                <router-link to="/login">Sign In</router-link>
              </p>
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
    signUp() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: this.username
            })
            this.verifyUser();
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
    },

    verifyUser() {
      const actionCodeSettings = {
        url: `http://localhost:5173/todo?verified`,
      };
      sendEmailVerification(auth.currentUser, actionCodeSettings);
      alert('Verification list was sent to your email. Please, verify your profile')
    }
  }
}
</script>