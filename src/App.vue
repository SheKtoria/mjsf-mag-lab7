<template>
  <div class="d-flex m-auto w-50">
    <nav class="text-center w-100 d-flex justify-content-between align-items-center">
      <div>
        <RouterLink class="me-4" to="/todo">ToDo</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
      <div class="d-flex ms-5 mt-2 mb-1 justify-content-end align-items-center" v-if="isAuthenticated">
        <p class="fw-bold mb-0 me-2">Welcome, <span class="ms-1 fw-light">{{ user.displayName }}</span></p>
        <button class="pt-1 pb-1" @click="signOut">Sign Out</button>
      </div>
    </nav>
  </div>
  <section class="vh-100 vw-100 gradient-custom">
    <RouterView/>
  </section>
</template>
<script>
import {auth} from './firebase/index.js'
import {signOut, onAuthStateChanged} from 'firebase/auth'
import router from "./router/index.js";
import {mapActions, mapState} from "vuex";

export default {
  computed: {
    ...mapState(["user", "isAuthenticated"])
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      this.authUser(user)
    })
  },
  methods: {
    ...mapActions(['authUser', 'logout']),
    signOut() {
      signOut(auth)
          .then(() => {
            this.logout()
            router.push('/login')
          })
    }
  }
}
</script>

<style>

#app {
  margin: 0 !important;
  padding: 0 !important;
}

.gradient-custom {
  background: radial-gradient(50% 123.47% at 50% 50%, #00ff94 0%, #720059 100%),
  linear-gradient(121.28deg, #669600 0%, #ff0000 100%),
  linear-gradient(360deg, #0029ff 0%, #8fff00 100%),
  radial-gradient(100% 164.72% at 100% 100%, #6100ff 0%, #00ff57 100%),
  radial-gradient(100% 148.07% at 0% 0%, #fff500 0%, #51d500 100%);
  background-blend-mode: screen, color-dodge, overlay, difference, normal;
}
</style>
