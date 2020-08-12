import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store'
// TODO: 在main.ts和main.scss中导入外部css有什么区别？？？
// import 'bulma/bulma.sass'
import '@fortawesome/fontawesome-free/css/all.css'
// import 'animate.css'

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
