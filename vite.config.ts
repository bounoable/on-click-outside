import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/onClickOutside.ts'),
      name: 'onClickOutside',
      fileName: (format) => `onClickOutside.${format}.js`,
    },
  },

  test: {
    environment: 'happy-dom',
  },
})
