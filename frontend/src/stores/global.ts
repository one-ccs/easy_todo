import { defineStore } from 'pinia';
import type { ConfigProviderTheme } from 'vant';

const useGlobalStore = defineStore('global', {
    state: () => ({
        theme: <ConfigProviderTheme>'dark',
        safeAreaInsetBottom: false,
    }),
    getters: {},
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
        },
    },
});

export default useGlobalStore;
