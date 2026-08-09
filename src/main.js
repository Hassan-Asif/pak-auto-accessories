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

// Wait until Vue Router has finished
// resolving the first page.
router.isReady()
  .then(() => {
    app.mount('#app')

    // Remove the static HTML loader
    const loader = document.getElementById('initial-loader')

    if (loader) {
      loader.style.opacity = '0'

      setTimeout(() => {
        loader.remove()
      }, 300)
    }
  })
  .catch((error) => {
    console.error('Router initialization failed:', error)

    // Prevent an infinite loading screen
    app.mount('#app')

    const loader = document.getElementById('initial-loader')

    if (loader) {
      loader.remove()
    }
  })