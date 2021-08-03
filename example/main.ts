import { createApp } from 'vue'
import clipboard from '../src';
import App from './App.vue'

const app = createApp(App)
app.use(clipboard)
app.mount('#app')
