import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue2()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'EChartsComponent',
      fileName: 'echarts-component'
    }
  }
})
