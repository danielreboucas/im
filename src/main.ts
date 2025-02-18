import 'primeicons/primeicons.css'
import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import App from './App.vue'
import { useGlobalErrorHandler } from './plugins/errorHandler'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(ToastService)
app.config.errorHandler = useGlobalErrorHandler()

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
