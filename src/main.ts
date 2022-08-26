import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App).use(store).use(router).mount('#app')
