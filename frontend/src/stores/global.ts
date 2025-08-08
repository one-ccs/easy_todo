import { defineStore } from 'pinia';

const useGlobalStore = defineStore('global', {
    state: () => ({
        safeAreaInsetTop: false,
        safeAreaInsetBottom: false,
        homePath: '/todo',
    }),
    getters: {
        appVersion: () => __APP_VERSION__,
        appName: () => __APP_NAME__,
    },
    actions: {},
});

export default useGlobalStore;
