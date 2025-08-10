import { defineStore } from 'pinia';
import type { CellSize, ConfigProviderThemeVars } from 'vant';

const useGlobalStore = defineStore('global', {
    state: () => ({
        safeAreaInsetTop: false,
        safeAreaInsetBottom: false,
        homePath: '/todo',
        cellSize: <CellSize>'normal',
        switchSize: '1.5em',
        vanThemeVars: <ConfigProviderThemeVars>{
            navBarHeight: '56px',
        },
    }),
    getters: {
        appVersion: () => __APP_VERSION__,
        appName: () => __APP_NAME__,
    },
    actions: {},
});

export default useGlobalStore;
