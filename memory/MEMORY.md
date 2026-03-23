# ECharts 组件封装方案

## 技术栈
- Vue 2 (Options API)
- JavaScript (不使用 TypeScript)
- ECharts
- lodash-es
- pnpm (包管理器)

## 任务清单

| # | 任务 | 状态 |
|---|------|------|
| 1 | 项目初始化 (pnpm + Vue 2) | ✅ |
| 2 | BaseChart.vue 核心组件 | ✅ |
| 3 | chartConfig.js 配置生成器 | ✅ |
| 4 | theme.js 主题管理 | ✅ |

状态说明：⏳ 待完成 | 🚧 进行中 | ✅ 已完成

## 核心文件

```
src/
├── components/
│   └── BaseChart.vue      # 基础图表组件
├── utils/
│   └── theme.js           # 主题管理
├── config/
│   └── chartConfig.js     # 图表配置生成器
└── index.js               # 组件库入口
```

## 配置合并策略
默认配置 → 主题配置 → 业务配置 (使用 lodash merge 深度合并)

---

## Playwright 测试方案 (后续执行)

### 安装
```bash
pnpm add -D @playwright/test
npx playwright install
```

### 测试用例规划
```
tests/
├── base-chart.spec.js      # 基础图表测试
├── theme.spec.js           # 主题切换测试
└── responsive.spec.js      # 响应式测试
```

### 测试点
1. **渲染测试**
   - 各类型图表正确渲染 (line/bar/pie/scatter/radar)
   - 数据正确显示

2. **状态测试**
   - loading 状态显示
   - empty 状态显示
   - error 状态显示 + 重试功能

3. **交互测试**
   - 主题切换
   - 响应式 resize
   - 点击事件

4. **内存泄漏测试**
   - 组件销毁后实例已清理
