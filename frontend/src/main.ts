import Vant, { setNotifyDefaultOptions, showConfirmDialog } from 'vant';
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

    showConfirmDialog({
        title: '错误',
        message: `程序遇到错误：<p style="color: #ad0000;">"${(err as Error).message}"</p>是否需要重启？`,
        messageAlign: 'left',
        allowHtml: true,
        confirmButtonText: '重启',
        cancelButtonText: '取消',
    })
        .then(() => {
            window.location.reload();
        })
        .catch(() => {
            console.log('取消');
        });
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
