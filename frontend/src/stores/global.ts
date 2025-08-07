import { defineStore } from 'pinia';
import type { ConfigProviderTheme } from 'vant';

const useGlobalStore = defineStore('global', {
    state: () => ({
        theme: <ConfigProviderTheme>'dark',
        safeAreaInsetBottom: false,
        homePath: '/todo',
    }),
    getters: {
        appVersion: () => __APP_VERSION__,
        appName: () => __APP_NAME__,
    },
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
        },
    },
});

export default useGlobalStore;
