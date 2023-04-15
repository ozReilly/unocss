import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { AstroIntegration } from 'astro'
import type { VitePluginConfig } from '@unocss/vite'
import VitePlugin from '@unocss/vite'
import type { UserConfigDefaults } from '@unocss/core'

export interface AstroIntegrationConfig<Theme extends {} = {}> extends VitePluginConfig<Theme> {
  /**
   * Include reset styles
   * When passing `true`, `@unocss/reset/tailwind.css` will be used
   * @default false
   */
  injectReset?: string | boolean

  /**
   * Inject UnoCSS entry import for every astro page
   * @default true
   */
  injectEntry?: boolean | string

  /**
   * Inject extra imports for every astro page
   * @default []
   */
  injectExtra?: string[]
}

export default function UnoCSSAstroIntegration<Theme extends {}>(
  options: AstroIntegrationConfig<Theme> = {},
  defaults?: UserConfigDefaults,
): AstroIntegration {
  const {
    injectEntry = true,
    injectReset = false,
    injectExtra = [],
  } = options

  return {
    name: 'unocss',
    hooks: {
      'astro:config:setup': async ({ config, injectScript }) => {
        const scan = resolve(fileURLToPath(config.srcDir), 'components/**/*').replace(/\\/g, '/')
        // Adding components to UnoCSS's extra content
        options.content ||= {}
        options.content.filesystem ||= []
        options.content.filesystem.push(scan)

        config.vite.plugins ||= []
        config.vite.plugins.push(...VitePlugin(options, defaults) as any)

        const injects: string[] = []
        if (injectReset) {
          const resetPath = typeof injectReset === 'string'
            ? injectReset
            : '@unocss/reset/tailwind.css'
          injects.push(`import "${resetPath}"`)
        }
        if (injectEntry) {
          injects.push(typeof injectEntry === 'string'
            ? injectEntry
            : 'import "uno.css"')
        }
        if (injectExtra.length > 0)
          injects.push(...injectExtra)
        if (injects?.length)
          injectScript('page-ssr', injects.join('\n'))
      },
    },
  }
}
