import path from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

import UnoCSS from 'unocss/vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import UnpluginIcons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  return {
    base: '/',
    plugins: [
      UnoCSS(),
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue\??/
        ],
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          {
            'vue': [
              'createVNode',
              'render'
            ],
            'vue-router': [
              'createRouter',
              'createWebHistory',
              'createWebHashHistory',
              'useRouter',
              'useRoute'
            ],
            'uuid': [
              ['v4', 'uuidv4']
            ],
            // 全局使用 _.xxxx()
            'lodash-es': [
              // default imports
              ['*', '_'] // import { * as _ } from 'lodash-es',
            ]
          },
          // type import
          {
            from: 'vue',
            imports: [
              'App',
              'VNode',
              'ComponentPublicInstance',
              'ComponentPublicInstanceCostom',
              'ComponentInternalInstance'
            ],
            type: true
          },
          {
            from: 'vue-router',
            imports: [
              'RouteRecordRaw',
              'RouteLocationRaw',
              'LocationQuery',
              'RouteParams',
              'RouteLocationNormalizedLoaded',
              'RouteRecordName',
              'NavigationGuard'
            ],
            type: true
          }
        ],
        resolvers:
          mode === 'development'
            ? []
            : [ElementPlusResolver()],
        dirs: [
          './src/hooks'
        ],
        dts: './auto-imports.d.ts',
        eslintrc: {
          enabled: true
        },
        vueTemplate: true
      }),
      Components({
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        resolvers: [
          IconsResolver({
            prefix: 'AutoIcon'
          }),
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      // Auto use Iconify icon
      UnpluginIcons({
        autoInstall: true,
        compiler: 'vue3',
        scale: 1.2,
        defaultStyle: '',
        defaultClass: 'unplugin-icon'
      }),
    ],
    /**
     * 用 esbuild.drop 替换 rollup-plugin-terser
     */
    esbuild: {
      drop: [
        'console',
        'debugger'
      ]
    },
    // According to the need to open proxy
    // server: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://172.xx.xxx.xx/xxxxxxx/api',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '')
    //     }
    //   }
    // },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    },
    define: {
      'process.env': process.env
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use '@/styles/element-variables.scss' as *;`
        }
      }
    },
  }
})
