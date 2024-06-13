import 'virtual:uno.css'

import { setupRouter } from '@/router'
import { setupStore } from '@/store'

import App from '@/App.vue'

const app = createApp(App)

async function setupApp() {
  setupStore(app)
  await setupRouter(app)
  app.mount('#app')
}

setupApp()

export default app
