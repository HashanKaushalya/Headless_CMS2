import {
    createWebHistory,
    createRouter
} from "vue-router";
import Reviews from '../reviews/reviews.vue';
import About from '../pages/About.vue';
import FullReview from '../reviews/fullReview.vue';

const routes = [{
        path: '/',
        name: 'Reviews',
        component: Reviews
    },
    {
        path: '/review/:id',
        name: 'FullReview',
        component: () => import('../reviews/fullReview.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../pages/About.vue'),
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;