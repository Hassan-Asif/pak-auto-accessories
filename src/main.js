import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets.css'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Toast, {
  position: 'top-right',
  timeout: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true
})

app.mount('#app')