import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vant from 'vant';

import App from './App.vue';
import router from './router';
import piniaPersist from './plugins/piniaPersist';

import 'vant/lib/index.css';
import './assets/css/main.less';

const app = createApp(App);
const pinia = createPinia();

app.config.errorHandler = (err, instance, info) => {
    console.error(err, instance, info);
};

pinia.use(piniaPersist);

app.use(pinia);
app.use(router);
app.use(Vant);
app.mount('#app');
