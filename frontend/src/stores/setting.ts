import { defineStore } from 'pinia';
import type { ConfigProviderTheme } from 'vant';

export const themes = [
    { index: 0, text: '浅色', value: 'light', icon: 'sun-o' },
    { index: 1, text: '深色', value: 'dark', icon: 'moon-o' },
    { index: 2, text: '跟随系统', value: 'auto', icon: 'adjust' },
] as const;
export type Theme = (typeof themes)[number];

const useSettingStore = defineStore('setting', {
    state: () => ({
        themeIndex: 0,
        theme: <ConfigProviderTheme>'light',
    }),
    getters: {},
    actions: {
        setTheme(theme: Theme) {
            this.themeIndex = theme.index;

            if (theme.value === 'auto') {
                this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';

                window.matchMedia('(prefers-color-scheme: dark)').onchange = (
                    evt: MediaQueryListEvent
                ) => {
                    this.theme = evt.matches ? 'dark' : 'light';
                };
            } else {
                this.theme = theme.value;
                window.matchMedia('(prefers-color-scheme: dark)').onchange = null;
            }
        },
    },
});

export default useSettingStore;
