<template>
  <div id="app">
    <h1>ECharts 组件示例</h1>

    <!-- 主题切换 -->
    <div class="theme-bar">
      <span>主题：</span>
      <button
        v-for="t in themes"
        :key="t"
        :class="{ active: currentTheme === t }"
        @click="currentTheme = t"
      >
        {{ t }}
      </button>
    </div>

    <!-- 折线图 -->
    <section>
      <h2>折线图</h2>
      <BaseChart
        type="line"
        :data="lineData"
        :theme="currentTheme"
        height="300px"
        @click="handleClick"
      />
    </section>

    <!-- 柱状图 -->
    <section>
      <h2>柱状图</h2>
      <BaseChart
        type="bar"
        :data="barData"
        :theme="currentTheme"
        height="300px"
      />
    </section>

    <!-- 饼图 -->
    <section>
      <h2>饼图</h2>
      <BaseChart
        type="pie"
        :data="pieData"
        :theme="currentTheme"
        height="300px"
      />
    </section>

    <!-- 散点图 -->
    <section>
      <h2>散点图</h2>
      <BaseChart
        type="scatter"
        :data="scatterData"
        :theme="currentTheme"
        height="300px"
      />
    </section>

    <!-- 雷达图 -->
    <section>
      <h2>雷达图</h2>
      <BaseChart
        type="radar"
        :data="radarData"
        :theme="currentTheme"
        height="300px"
      />
    </section>

    <!-- 加载状态 -->
    <section>
      <h2>加载状态</h2>
      <BaseChart
        type="bar"
        :data="barData"
        :loading="showLoading"
        height="300px"
      />
      <button @click="showLoading = !showLoading">
        {{ showLoading ? '隐藏加载' : '显示加载' }}
      </button>
    </section>

    <!-- 空数据 -->
    <section>
      <h2>空数据状态</h2>
      <BaseChart
        type="bar"
        :data="[]"
        empty-text="暂无数据"
        height="300px"
      />
    </section>

    <!-- 自定义配置 -->
    <section>
      <h2>自定义配置</h2>
      <BaseChart
        type="line"
        :data="lineData"
        :options="customOptions"
        :theme="currentTheme"
        height="300px"
      />
    </section>
  </div>
</template>

<script>
import BaseChart from './components/BaseChart.vue'

export default {
  name: 'App',
  components: {
    BaseChart
  },
  data() {
    return {
      themes: ['default', 'dark', 'blue', 'green'],
      currentTheme: 'default',
      showLoading: true,
      // 折线图数据
      lineData: {
        xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
        series: [
          { name: '销售额', data: [120, 200, 150, 80, 70, 110] },
          { name: '利润', data: [60, 100, 80, 40, 35, 55] }
        ]
      },
      // 柱状图数据
      barData: {
        xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        series: [
          { name: '访问量', data: [120, 200, 150, 80, 70, 110, 130] }
        ]
      },
      // 饼图数据
      pieData: [
        { name: '直接访问', value: 335 },
        { name: '邮件营销', value: 310 },
        { name: '联盟广告', value: 234 },
        { name: '视频广告', value: 135 },
        { name: '搜索引擎', value: 548 }
      ],
      // 散点图数据
      scatterData: {
        series: [
          {
            name: '数据A',
            data: [[10, 20], [15, 30], [20, 25], [25, 40], [30, 35]]
          }
        ]
      },
      // 雷达图数据
      radarData: {
        indicator: [
          { name: '销售', max: 100 },
          { name: '管理', max: 100 },
          { name: '技术', max: 100 },
          { name: '客服', max: 100 },
          { name: '研发', max: 100 }
        ],
        series: [
          { name: '预算', value: [80, 70, 90, 60, 85] }
        ]
      },
      // 自定义配置
      customOptions: {
        title: {
          text: '自定义标题',
          left: 'center'
        },
        series: [
          { smooth: false, lineStyle: { width: 3 } }
        ]
      }
    }
  },
  methods: {
    handleClick(params) {
      console.log('点击了图表:', params)
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

h2 {
  color: #666;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1890ff;
}

section {
  margin-bottom: 40px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.theme-bar {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.theme-bar button {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.theme-bar button:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}

.theme-bar button.active {
  background: #1890ff;
  border-color: #1890ff;
  color: white;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #40a9ff;
}
</style>
