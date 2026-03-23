<template>
  <div class="base-chart-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="chart-loading">
      <div class="loading-spinner"></div>
      <p>图表加载中...</p>
    </div>

    <!-- 空数据状态 -->
    <div v-else-if="isEmpty" class="chart-empty">
      <div class="empty-icon">📊</div>
      <p>{{ emptyText }}</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="errorMsg" class="chart-error">
      <div class="error-icon">⚠️</div>
      <p>{{ errorMsg }}</p>
      <button @click="handleRetry">重试</button>
    </div>

    <!-- 图表容器 -->
    <div
      v-else
      ref="chartRef"
      class="chart-wrapper"
      :style="{ height: height, width: width }"
    ></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { merge } from 'lodash-es'
import { getThemeOptions } from '../utils/theme'
import { getDefaultOptions } from '../config/chartConfig'

export default {
  name: 'BaseChart',

  props: {
    // 图表类型
    type: {
      type: String,
      required: true,
      validator: (value) => ['line', 'bar', 'pie', 'scatter', 'radar'].includes(value)
    },
    // 图表数据
    data: {
      type: [Array, Object],
      default: () => []
    },
    // 自定义配置
    options: {
      type: Object,
      default: () => ({})
    },
    // 图表高度
    height: {
      type: String,
      default: '400px'
    },
    // 图表宽度
    width: {
      type: String,
      default: '100%'
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 空数据提示
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 是否自动响应式
    responsive: {
      type: Boolean,
      default: true
    },
    // 主题
    theme: {
      type: String,
      default: 'default'
    },
    // 是否显示工具栏
    showToolbox: {
      type: Boolean,
      default: false
    },
    // 自动刷新间隔（毫秒）
    autoRefresh: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      errorMsg: null,
      isEmpty: false
    }
  },

  mounted() {
    this.initChart()
    this.setupResponsive()
    this.setupAutoRefresh()
  },

  beforeDestroy() {
    // 清理图表实例
    if (this.chartInstance && !this.chartInstance.isDisposed()) {
      this.chartInstance.dispose()
      this.chartInstance = null
    }

    // 清理 ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }

    // 清理定时器
    this.clearAutoRefresh()
  },

  watch: {
    data: {
      handler() {
        this.debouncedUpdate()
      },
      deep: true
    },
    options: {
      handler() {
        this.debouncedUpdate()
      },
      deep: true
    },
    theme() {
      // 主题变化需要重新初始化
      this.initChart()
    },
    loading(newVal) {
      if (!newVal && this.chartInstance) {
        this.$nextTick(() => {
          this.updateChart()
        })
      }
    }
  },

  methods: {
    // 初始化图表
    async initChart() {
      try {
        this.errorMsg = null

        // 检查数据是否为空
        if (!this.checkData()) {
          this.isEmpty = true
          return
        }

        this.isEmpty = false

        await this.$nextTick()

        if (!this.$refs.chartRef) return

        // 如果实例已存在，先销毁
        if (this.chartInstance) {
          this.chartInstance.dispose()
        }

        // 创建图表实例
        this.chartInstance = echarts.init(this.$refs.chartRef, this.theme)

        // 生成图表配置
        const finalOptions = this.generateOptions()

        // 设置配置
        this.chartInstance.setOption(finalOptions, true)

        // 绑定事件
        this.bindEvents()

        // 通知图表就绪
        this.$emit('ready', this.chartInstance)

      } catch (err) {
        console.error('图表初始化失败:', err)
        this.errorMsg = err.message || '图表渲染失败'
        this.$emit('error', err)
      }
    },

    // 检查数据是否为空
    checkData() {
      if (!this.data) return false

      if (Array.isArray(this.data)) {
        return this.data.length > 0
      }

      if (typeof this.data === 'object') {
        return Object.keys(this.data).length > 0
      }

      return false
    },

    // 生成图表配置
    generateOptions() {
      // 获取默认配置
      const defaultOpts = getDefaultOptions(this.type, this.data)

      // 获取主题配置
      const themeOpts = getThemeOptions(this.theme)

      // 工具栏配置
      const toolboxOpts = this.showToolbox ? {
        toolbox: {
          feature: {
            saveAsImage: { title: '保存为图片' },
            dataView: { title: '数据视图', readOnly: false },
            restore: { title: '还原' },
            dataZoom: { title: { zoom: '区域缩放', back: '还原缩放' } }
          }
        }
      } : {}

      // 合并所有配置（深度合并）
      return merge({}, defaultOpts, themeOpts, toolboxOpts, this.options)
    },

    // 绑定事件
    bindEvents() {
      if (!this.chartInstance) return

      // 点击事件
      this.chartInstance.on('click', (params) => {
        this.$emit('click', params)
      })
    },

    // 更新图表
    updateChart() {
      if (!this.chartInstance) {
        this.initChart()
        return
      }

      if (!this.checkData()) {
        this.isEmpty = true
        return
      }

      this.isEmpty = false

      try {
        const finalOptions = this.generateOptions()
        this.chartInstance.setOption(finalOptions, true)
      } catch (err) {
        console.error('图表更新失败:', err)
        this.errorMsg = err.message
        this.$emit('error', err)
      }
    },

    // 防抖更新
    debouncedUpdate() {
      if (this._updateTimer) {
        clearTimeout(this._updateTimer)
      }
      this._updateTimer = setTimeout(() => {
        this.updateChart()
      }, 300)
    },

    // 调整图表大小
    resizeChart() {
      if (this.chartInstance && !this.chartInstance.isDisposed()) {
        this.chartInstance.resize()
      }
    },

    // 防抖 resize
    debouncedResize() {
      if (this._resizeTimer) {
        clearTimeout(this._resizeTimer)
      }
      this._resizeTimer = setTimeout(() => {
        this.resizeChart()
      }, 150)
    },

    // 设置响应式监听
    setupResponsive() {
      if (!this.responsive || !this.$refs.chartRef) return

      // 使用 ResizeObserver 监听容器尺寸变化
      this.resizeObserver = new ResizeObserver(() => {
        this.debouncedResize()
      })

      this.resizeObserver.observe(this.$refs.chartRef)
    },

    // 设置自动刷新
    setupAutoRefresh() {
      if (this.autoRefresh > 0) {
        this._refreshTimer = setInterval(() => {
          this.$emit('refresh')
          this.updateChart()
        }, this.autoRefresh)
      }
    },

    // 清理自动刷新
    clearAutoRefresh() {
      if (this._refreshTimer) {
        clearInterval(this._refreshTimer)
        this._refreshTimer = null
      }
    },

    // 重试
    handleRetry() {
      this.errorMsg = null
      this.initChart()
    },

    // 获取图片
    getImage() {
      if (this.chartInstance) {
        return this.chartInstance.getDataURL({
          type: 'png',
          pixelRatio: 2,
          backgroundColor: '#fff'
        })
      }
      return null
    }
  }
}
</script>

<style scoped>
.base-chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.chart-wrapper {
  width: 100%;
  height: 100%;
}

.chart-loading,
.chart-empty,
.chart-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  color: #999;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-icon,
.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.chart-error button {
  margin-top: 16px;
  padding: 8px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chart-error button:hover {
  background: #2980b9;
}
</style>
