/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  root: './tests/fixtures',
  test: { watchIgnore: ['node_modules'] },
})
