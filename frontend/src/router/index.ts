import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from) => {
    // 补全 history 防止返回时跳转过多
    const from_parts = from.path.split('/').filter(Boolean);

    if (from_parts.length === 0) {
        const to_parts = to.path.split('/').filter(Boolean);

        if (to_parts.length > 1) {
            to_parts.forEach((_, index) => {
                const hash = router.options.history.base.includes('#') ? '#' : '';
                const path = `${hash}/${to_parts.slice(0, index + 1).join('/')}`;

                window.history.pushState(null, '', path);
            });
        }
    }
});

export default router;
