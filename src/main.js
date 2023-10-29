import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import plugin from './plugins';

import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App)
app.config.globalProperties.$actionCodeSettings = {
    url: `http://localhost:5173/todo?verified`,
}

app.use(plugin)
app.use(router)
app.use(store)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js";
import router from "./router/index.js";
import store from "./store/index.js";
