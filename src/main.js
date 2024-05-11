import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'


// createApp(App).use(ElementPlus).use(router).mount('#app')
const app = createApp(App)


import $ from 'jquery'

window.jQuery = $
window.$ = $

app.use(ElementPlus)
app.use(router)
app.mount('#app')
