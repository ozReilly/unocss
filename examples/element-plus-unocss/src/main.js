import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import 'uno.css'
import i18n from './locales/i18n'
createApp(App).use(ElementPlus).use(i18n).mount('#app')
