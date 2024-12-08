import { createRouter, createWebHistory } from 'vue-router'
import Reviews from '../views/Reviews.vue'

const routes = [
    {
        path: '/',
        name: 'Reviews',
        component: Reviews
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;