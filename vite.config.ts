import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    /**
     * happy-dom has an issue with document.activeElement:
     * https://github.com/capricorn86/happy-dom/issues/456
     */
    environment: 'jsdom',
  },
})
