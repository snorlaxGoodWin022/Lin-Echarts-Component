# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

这是一个 **Vue 2 + ECharts** 图表组件封装项目，目标是提供一套通用、可复用的图表组件库。

## Tech Stack

- **Vue 2** (Options API)
- **JavaScript** (不使用 TypeScript)
- **ECharts**
- **lodash-es**
- **pnpm** (包管理器)

## Commands

```bash
pnpm install      # 安装依赖
pnpm run dev      # 开发模式
pnpm run build    # 构建生产版本
```

## Core Architecture

组件采用**配置驱动**的设计模式，核心架构：

```
src/
├── components/
│   └── BaseChart.vue      # 基础图表组件（核心）
├── utils/
│   └── theme.js           # 主题管理
├── config/
│   └── chartConfig.js     # 图表默认配置生成器
└── index.js               # 组件库入口
```

### 核心组件设计

**BaseChart.vue** 职责：
- 图表类型支持：line, bar, pie, scatter, radar
- 状态管理：loading、empty、error 三种状态
- 响应式布局：ResizeObserver + 150ms 防抖
- 主题切换：支持 default/dark/blue/green
- 生命周期：`beforeDestroy` 时 dispose 图表实例，清理 ResizeObserver 和定时器，防止内存泄漏

**配置合并策略**（三层合并）：
```
默认配置 → 主题配置 → 业务配置
```
使用 lodash `merge` 深度合并。

### Props 设计

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | String | required | 图表类型 |
| data | Array/Object | [] | 图表数据 |
| options | Object | {} | 自定义 ECharts 配置 |
| height | String | '400px' | 图表高度 |
| width | String | '100%' | 图表宽度 |
| loading | Boolean | false | 加载状态 |
| theme | String | 'default' | 主题名称 |
| responsive | Boolean | true | 是否响应式 |
| autoRefresh | Number | 0 | 自动刷新间隔(ms) |

### Methods

- `refresh()`: 刷新图表
- `resize()`: 调整大小
- `getImage()`: 获取图片 DataURL

## Development Notes

- 图表实例不放在 data 中，直接挂载到 `this` 上避免响应式
- 数据更新使用 300ms 防抖优化（watch + debounce）
- 组件销毁时必须清理：`chartInstance.dispose()`、`resizeObserver.disconnect()`、`clearInterval(timer)`
