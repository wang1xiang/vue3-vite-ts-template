import { createRouterGuards } from '@/router/permission'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

export async function setupRouter(app: App) {
  createRouterGuards(router)
  app.use(router)

  await router.isReady()
}

export default router

