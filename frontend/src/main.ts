import Vant, { setNotifyDefaultOptions, showNotify } from 'vant';
import '@vant/touch-emulator'; /* 桌面鼠标事件端适配 */

import App from './App.vue';
import router from './router';
import piniaPersist from './plugins/piniaPersist';

import 'vant/lib/index.css';
import './assets/css/main.less';

const app = createApp(App);
const pinia = createPinia();

app.config.errorHandler = (err, instance, info) => {
    console.error(err, instance, info);

    if (!!localStorage.key(0)) {
        showNotify({
            type: 'danger',
            message: '检测到程序错误，尝试清除本地数据并刷新页面！',
            color: '#ad0000',
            background: '#ffe1e1',
        });
        setTimeout(() => {
            localStorage.clear();
            window.location.reload();
        }, 1000);
    } else {
        showNotify({
            type: 'danger',
            message: '遇到无法恢复的错误，请联系管理员！',
        });
    }
};

pinia.use(piniaPersist);

app.use(pinia);
app.use(router);
app.use(Vant);
app.mount('#app');

setNotifyDefaultOptions({
    type: 'primary',
    position: 'top',
    duration: 2000,
});

const settingStore = useSettingStore();

window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (evt: MediaQueryListEvent) => {
        settingStore.themeIndex === 2 &&
            settingStore.changeTheme(evt.matches ? 'dark' : 'light');
    });
