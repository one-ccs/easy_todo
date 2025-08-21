import type { CellSize, ConfigProviderThemeVars } from 'vant';

export const useGlobalStore = defineStore('global', {
    state: () => ({
        safeNavBarInsetTop: false,
        safeAreaInsetTop: false,
        safeAreaInsetBottom: false,
        homePath: '/todo',
        cellSize: <CellSize>'normal',
        switchSize: '1.5em',
        vanThemeVars: <ConfigProviderThemeVars>{
            navBarHeight: '56px',
        },
        overlay: {
            loading: {
                show: false,
                text: '',
                zIndex: 2,
                color: 'var(--et-color)',
                background: 'var(--et-bgc)',
            },
        },
    }),
    getters: {
        appVersion: () => __APP_VERSION__,
        appName: () => __APP_NAME__,
    },
    actions: {
        showLoadingOverlay({
            text = '',
            zIndex = 2,
            color = 'var(--et-color)',
            background = 'var(--et-bgc)',
        }: {
            text?: string;
            zIndex?: number;
            color?: string;
            background?: string;
        }) {
            this.overlay.loading.text = text;
            this.overlay.loading.zIndex = zIndex;
            this.overlay.loading.color = color;
            this.overlay.loading.background = background;
            this.overlay.loading.show = true;

            return () => (this.overlay.loading.show = false);
        },
    },
});
