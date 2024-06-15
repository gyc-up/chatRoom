import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import { Lazyload, Toast } from 'vant'
// import Previewer from 'virtual:vue-component-preview'
import { routes } from 'vue-router/auto/routes'
import App from './App.vue'
import type { UserModule } from './types'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
// const routes = setupLayouts(generatedRoutes)
// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.app.use(Toast)
    // 将懒加载加入到 ctx 中
    ctx.app.use(Lazyload, {
      // loading: 'https://profile-avatar.csdnimg.cn/default.jpg!1',
      // error: 'https://profile-avatar.csdnimg.cn/default.jpg!1',
      lazyComponent: true,
    })
  },
)
