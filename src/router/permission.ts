import Cookie from 'js-cookie'
import { allowlist } from '@/utils/globalData'

import NProgress from 'nprogress'
import type { Router } from 'vue-router'

NProgress.configure({
  showSpinner: false,
})

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    document.title = `${to.meta.title || ''}`

    if (allowlist.find((name) => to.name === name)) {
      next()
      return
    }

    // login
    // if (!Cookie.get('token')) {
    //   next('/login')
    //   return
    // }
    next()
  })

  router.afterEach((to) => {
    NProgress.done()
  })
}
