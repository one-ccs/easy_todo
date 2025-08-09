import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from) => {
    const from_parts = from.path.split('/').filter(Boolean);

    if (from_parts.length === 0) {
        const to_parts = to.path.split('/').filter(Boolean);

        if (to_parts.length > 1) {
            to_parts.forEach((_, index) => {
                history.pushState(null, '', '/' + to_parts.slice(0, index + 1).join('/'));
            });
        }
    }
});

export default router;
