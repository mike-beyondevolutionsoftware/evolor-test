import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/userStore';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Products from '../views/Products.vue';
import Checkout from '../views/Checkout.vue';
import OrderHistory from '../views/OrderHistory.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: async (to, from, next) => {
            const userStore = useUserStore();

            if (!userStore.isAuthenticated && userStore.token) {
                await userStore.getUser();
            }

            userStore.isAuthenticated ? next('/products') : next();
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: async (to, from, next) => {
            const userStore = useUserStore();

            if (!userStore.isAuthenticated && userStore.token) {
                await userStore.getUser();
            }

            userStore.isAuthenticated ? next('/products') : next();
        },
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
        beforeEnter: async (to, from, next) => {
            const userStore = useUserStore();

            if (!userStore.isAuthenticated && userStore.token) {
                await userStore.getUser();
            }

            userStore.isAuthenticated ? next() : next('/login');
        },
    },
    {
        path: '/orders',
        name: 'OrderHistory',
        component: OrderHistory,
        meta: { requiresAuth: true },
        beforeEnter: async (to, from, next) => {
            const userStore = useUserStore();

            if (!userStore.isAuthenticated && userStore.token) {
                await userStore.getUser();
            }

            userStore.isAuthenticated ? next() : next('/login');
        },
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
        meta: { requiresAuth: true },
        beforeEnter: async (to, from, next) => {
            const userStore = useUserStore();

            if (!userStore.isAuthenticated && userStore.token) {
                await userStore.getUser();
            }

            userStore.isAuthenticated ? next() : next('/login');
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
