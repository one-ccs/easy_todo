import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vant from 'vant';

import App from './App.vue';
import router from './router';
import piniaPersist from './plugins/piniaPersist';

import eventEmitter from '@/utils/eventEmitter';

import 'vant/lib/index.css';

import './assets/css/base.css';
import './assets/css/light.less';
import './assets/css/dark.less';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersist);

app.use(pinia);
app.use(router);
app.use(Vant);
app.mount('#app');

setInterval(() => {
    eventEmitter.emit('API:UN_AUTH');
}, 1000);
