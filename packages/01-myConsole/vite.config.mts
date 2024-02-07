import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      root: './',
      exclude: './vite.config.mts'
    }),
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'ESDrager',
      fileName: format => `index.${format}.js`,
    },
  },
})
