import type { ConfigProviderTheme } from 'vant';

export const themes = [
    { index: 0, text: '浅色', value: 'light', icon: 'sun-o' },
    { index: 1, text: '深色', value: 'dark', icon: 'moon-o' },
    { index: 2, text: '跟随系统', value: 'auto', icon: 'adjust' },
] as const;
export type Theme = (typeof themes)[number];

export const useSettingStore = defineStore('setting', {
    state: () => ({
        themeIndex: 0,
        theme: <ConfigProviderTheme>'light',
    }),
    getters: {},
    actions: {
        changeTheme(theme: ConfigProviderTheme) {
            if (typeof window == 'undefined' || !('startViewTransition' in document)) {
                this.theme = theme;
                return;
            }

            document
                .startViewTransition(() => {
                    this.theme = theme;
                })
                .ready.then(() => {
                    const originX =
                        (window.visualViewport?.width || window.innerWidth) / 2;
                    const originY =
                        (window.visualViewport?.height || window.innerHeight) / 2;
                    const radius = Math.hypot(
                        Math.max(originX, window.innerWidth - originX),
                        Math.max(originY, window.innerHeight - originY)
                    );
                    const clipPath = [
                        `circle(0px at ${originX}px ${originY}px)`,
                        `circle(${radius}px at ${originX}px ${originY}px)`,
                    ];
                    const isDark = this.theme === 'dark';

                    document.documentElement.animate(
                        { clipPath: isDark ? clipPath.reverse() : clipPath },
                        {
                            duration: 380,
                            easing: 'ease-in',
                            pseudoElement: isDark
                                ? '::view-transition-old(root)'
                                : '::view-transition-new(root)',
                        }
                    );
                });
        },
        setTheme(theme: Theme) {
            this.themeIndex = theme.index;

            if (theme.value !== 'auto') {
                this.changeTheme(theme.value);
            }
        },
    },
});
