import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import services from './services';

import "bootstrap/dist/css/bootstrap.css";

const app = createApp(App)
app.provide('services', services)
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js";
