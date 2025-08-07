import type { PiniaPluginContext } from 'pinia';

const KEY_PREFIX = 'PINIA:STATE';

const piniaPersist = (context: PiniaPluginContext) => {
    const { store } = context;
    const key = `${KEY_PREFIX}:${store.$id}`;

    window.addEventListener('beforeunload', () => {
        localStorage.setItem(key, JSON.stringify(store.$state));
    });

    try {
        const state = localStorage.getItem(key);

        state && store.$patch(JSON.parse(state));
    } catch (e) {
        console.error(`读取持久化内容失败：${e}`);
    }
};

export default piniaPersist;
