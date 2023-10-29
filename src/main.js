import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import plugin from './plugins';

import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App)
app.use(plugin)
app.use(router)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js";
import router from "./router/index.js";
