import {createRouter, createWebHistory} from 'vue-router'
import TasksPage from "../components/TasksPage.vue";
import AboutMe from "../components/AboutMe.vue";
import Register from "../components/Auth/Register.vue";
import Login from "../components/Auth/Login.vue";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import store from "../store/index.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: '',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/todo',
            name: 'todo',
            component: TasksPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: AboutMe,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresAuth: false
            }
        },
    ]
})

const currentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(getAuth(), () => {
            removeListener();
            resolve(store.getters.GET_IS_AUTHENTICATED);
        }, reject)
    })
}
router.beforeEach(async (to) => {
    if (to.meta.requiresAuth && !await currentUser()) {
        return {name: 'login'};
    }
    if (((to.name === 'login' || to.name === 'register') && await currentUser()) || to.path === '/') {
        return {name: 'todo'}
    }
    return true;
})
export default router;