import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      entryRoot: resolve(__dirname, './src'),
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
