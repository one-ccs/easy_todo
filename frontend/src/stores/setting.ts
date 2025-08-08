import { defineStore } from 'pinia';
import type { ConfigProviderTheme } from 'vant';

export const themes = [
    { text: '浅色', value: 'light' },
    { text: '深色', value: 'dark' },
    { text: '跟随系统', value: 'auto' },
] as const;
export type Theme = (typeof themes)[number];

const useSettingStore = defineStore('setting', {
    state: () => ({
        theme: <Theme>{ text: '浅色', value: 'light' },
        _theme: <ConfigProviderTheme>'light',
    }),
    getters: {},
    actions: {
        setTheme(theme: Theme) {
            this.theme = theme;

            if (theme.value === 'auto') {
                this._theme = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';

                window.matchMedia('(prefers-color-scheme: dark)').onchange = (
                    evt: MediaQueryListEvent
                ) => {
                    this._theme = evt.matches ? 'dark' : 'light';
                };
            } else {
                this._theme = theme.value;
                window.matchMedia('(prefers-color-scheme: dark)').onchange = null;
            }
        },
    },
});

export default useSettingStore;
