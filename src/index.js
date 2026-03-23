/**
 * ECharts 组件库入口
 */

import BaseChart from './components/BaseChart.vue'
import { getThemeOptions, setTheme, getCurrentTheme, registerTheme, getThemeNames } from './utils/theme'
import { getDefaultOptions } from './config/chartConfig'

// 组件列表
const components = [BaseChart]

// 安装函数
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

// 导出组件
export { BaseChart }

// 导出工具函数
export {
  getThemeOptions,
  setTheme,
  getCurrentTheme,
  registerTheme,
  getThemeNames,
  getDefaultOptions
}

// 默认导出安装函数
export default {
  install,
  BaseChart,
  getThemeOptions,
  setTheme,
  getCurrentTheme,
  registerTheme,
  getThemeNames,
  getDefaultOptions
}
