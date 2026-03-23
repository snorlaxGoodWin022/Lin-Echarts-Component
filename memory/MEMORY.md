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
| 5 | Playwright 测试 | ✅ |

> 注：首次运行测试前需手动安装浏览器：`npx playwright install chromium`

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

## Playwright 测试方案

### 已完成的测试用例

| 测试项 | 状态 |
|--------|------|
| 折线图渲染 | ✅ |
| 柱状图渲染 | ✅ |
| 饼图渲染 | ✅ |
| 散点图渲染 | ✅ |
| 雷达图渲染 | ✅ |
| 主题切换 | ✅ |
| 加载状态 | ✅ |
| 空数据状态 | ✅ |
| 点击事件 | ✅ |
| 响应式布局 | ✅ |

### 运行测试

```bash
# 首次运行需安装浏览器
npx playwright install chromium

# 运行测试
pnpm test

# UI 模式
pnpm test:ui

# 查看报告
pnpm test:report
```
