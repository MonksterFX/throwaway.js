import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import ReadNote from './views/ReadNote.vue';
import CreateNote from './views/CreateNote.vue';
import Default from './views/Default.vue';
import App from './App.vue';
import './index.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: CreateNote },
    { path: '/note/read', component: ReadNote },
    // { path: '/', component: Default },
  ],
});

const app = createApp(App);
// TODO: Remove dirty hack for sideload throwAway
app.config.globalProperties.window = window;
app.use(router);
app.mount('#app');
