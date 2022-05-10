/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: { watchIgnore: ['node_modules'] },
})
