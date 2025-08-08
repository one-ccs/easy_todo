import { defineStore } from 'pinia';
import type { CellSize } from 'vant';

const useGlobalStore = defineStore('global', {
    state: () => ({
        safeAreaInsetTop: false,
        safeAreaInsetBottom: false,
        homePath: '/todo',
        cellSize: <CellSize>'normal',
    }),
    getters: {
        appVersion: () => __APP_VERSION__,
        appName: () => __APP_NAME__,
    },
    actions: {},
});

export default useGlobalStore;
