# ECharts 封装实践完整指南
## 一、❤通用图表组件封装
### 1.1 简历描述模板
#### 项目经验：数据可视化平台图表组件库
**<font style="color:rgb(51, 51, 51);">封装通用 ECharts 图表组件库</font>**<font style="color:rgb(51, 51, 51);">：</font><font style="color:#DF2A3F;">负责封装通用 ECharts 图表组件库，实现了 15+ 常用图表类型的统一封装。通过高阶组件模式和配置驱动设计，实现了图表的快速复用和灵活定制。封装后的组件使用量降低 60% 的重复代码，图表开发效率提升 3 倍。</font>

<font style="color:#DF2A3F;"></font>

#### 核心实现包括：
+ 设计了基于配置驱动的图表封装架构，支持主题切换、响应式布局和自动刷新
+ 实现了图表生命周期管理机制，解决了组件销毁时的内存泄漏问题
+ 开发了图表配置合并策略，支持默认配置、主题配置和业务配置的智能合并
+ 封装了图表加载状态、空数据和错误处理的统一方案

### 1.2 SOP 标准回答
#### ❤面试官：你是如何封装 ECharts 组件的？
我们当时做这个项目的时候，发现各个业务模块都在重复写图表代码，而且每个人写的风格不一样，维护起来很麻烦。于是我主导设计了一套通用的图表封装方案。

+ 首先我分析了业务中常用的图表类型，提取了共性需求，比如加载状态、空数据处理、错误处理这些。然后我设计了一个基础的 BaseChart 组件，把这些通用逻辑都封装进去。
+ 在实现上，我用了配置驱动的思路。只需要传入图表类型和数据，组件内部会根据类型生成对应的 ECharts 配置。同时考虑到灵活性，我还支持传入自定义配置来覆盖默认配置。
+ 有个技术难点是图表的响应式更新。我通过 watch 监听数据变化，并用防抖来优化更新频率，避免数据频繁变化导致的性能问题。
+ 最后在销毁阶段，我特别注意了内存泄漏的问题。在组件卸载时会主动 dispose 图表实例，并清理所有的事件监听器和定时器。

这套封装方案上线后，新增图表的开发时间从原来的半天缩短到 1 小时左右，而且代码质量和一致性都有明显提升。



#### <font style="color:#DF2A3F;">面试故事：封装图表</font>
我们当时做这个项目的时候，发现各个业务模块都在重复地写图表代码，而且每个人写的风格不一样，维护起来很麻烦。于是我就想到了设计一套通用的图表封装方案。可是后面发现<font style="background-color:rgba(255, 255, 255, 0);">更麻烦的是，</font>**<font style="background-color:rgba(255, 255, 255, 0);">不同业务场景对图表的需求差异巨大</font>**<font style="background-color:rgba(255, 255, 255, 0);">：有的只需要简单的默认展示，有的却需要深度定制。</font>我遇到的难点就是<font style="color:#DF2A3F;">既要保证封装后使用简单，又要支持复杂业务场景的深度定制。</font>

为了它，我设计了一套基于‘配置驱动’的封装方案，核心思路是‘默认配置 + 灵活扩展’。

+ 首先我分析了业务中常用的图表类型，把通用的逻辑，比如加载状态、空数据处理、错误处理这些，封装进基础的 BaseChart 组件。
+ 在实现上，我用了配置驱动的思路。只需要传入图表类型和数据，就会生成默认的 ECharts 图表。灵活性方面，我使用深度合并算法，支持配置的增量更新。还提供配置钩子函数，允许在最终配置生成前进行修改。 这样一来，既保证了普通场景的‘开箱即用’，又完美支持了特殊场景的‘深度定制’。”
+ 最后在销毁阶段，我特别注意了内存泄漏的问题。在组件卸载时会主动 dispose 图表实例，并清理所有的事件监听器和定时器。

这套封装方案上线后，新增图表的开发时间从原来的半天缩短到 1 小时左右，而且代码质量和一致性都有明显提升。



<details class="lake-collapse"><summary id="u7ff97775"><span class="ne-text">封装故事关键词</span></summary><p id="ud20ff858" class="ne-p"><span class="ne-text">你可以试着闭上眼睛，在脑海里像放电影一样过一遍这个流程：</span></p><ol class="ne-ol"><li id="u696a296f" data-lake-index-type="0"><span class="ne-text">看到乱象</span><span class="ne-text">（大家重复写代码，风格乱）；</span></li><li id="u9f6ec645" data-lake-index-type="0"><span class="ne-text">遇到两难</span><span class="ne-text">（想简单又想灵活，怎么平衡？）；</span></li><li id="u45c99834" data-lake-index-type="0"><span class="ne-text">祭出大招（默认配置+灵活扩展，完美解决）；</span></li><li id="u45101f83" data-lake-index-type="0"><span class="ne-text">夯实细节（卸载销毁）；</span></li><li id="u61bc003e" data-lake-index-type="0"><span class="ne-text">收获成果（半天变1小时，效率翻倍）。</span></li></ol></details>


#### 面试官：如何处理图表的响应式布局？
响应式布局我是从两个层面来处理的。

+ 第一个是容器层面。我在组件外层包了一个响应式容器，使用 ResizeObserver 来监听容器尺寸变化。当容器大小改变时，会自动调用 ECharts 的 resize 方法重新计算布局。为了避免频繁触发，我加了 150ms 的防抖处理。
+ 第二个是配置层面。针对不同屏幕尺寸，我定义了不同的配置策略。比如移动端会自动调整图表的内边距、字体大小、图例位置等。具体实现是通过媒体查询或者根据容器宽度动态生成配置。
+ 还有个细节是，在窗口缩小到一定程度时，有些复杂图表会自动简化显示。比如柱状图在小屏下会隐藏部分标签，折线图会减少坐标轴刻度数量，确保图表在小屏上也能清晰展示。



<details class="lake-collapse"><summary id="uc6083f5d"><span class="ne-text">简历上：</span></summary><ul class="ne-ul"><li id="ua6f9619a" data-lake-index-type="0" style="text-align: left"><strong><span class="ne-text" style="color: rgb(51, 51, 51)">构建响应式大屏适配方案</span></strong><span class="ne-text" style="color: rgb(51, 51, 51)">：针对 </span><strong><span class="ne-text" style="color: rgb(51, 51, 51)">2K/4K 多分辨率</span></strong><span class="ne-text" style="color: rgb(51, 51, 51)"> 及 </span><strong><span class="ne-text" style="color: rgb(51, 51, 51)">动态缩放</span></strong><span class="ne-text" style="color: rgb(51, 51, 51)"> 场景，实施 </span><strong><span class="ne-text" style="color: rgb(51, 51, 51)">图表自动重绘</span></strong><span class="ne-text" style="color: rgb(51, 51, 51)"> 与 </span><strong><span class="ne-text" style="color: rgb(51, 51, 51)">样式动态适配</span></strong><span class="ne-text" style="color: rgb(51, 51, 51)"> 策略，</span><strong><span class="ne-text" style="color: rgb(51, 51, 51)">根除</span></strong><span class="ne-text" style="color: rgb(51, 51, 51)"> 图形拉伸与字体模糊隐患，实现 </span><strong><span class="ne-text" style="color: rgb(51, 51, 51)">全终端像素级一致渲染</span></strong><span class="ne-text" style="color: rgb(51, 51, 51)">，无需针对不同屏幕单独开发，</span><strong><span class="ne-text" style="color: rgb(51, 51, 51)">适配效率提升70%</span></strong><span class="ne-text" style="color: rgb(51, 51, 51)">。</span></li></ul></details>


#### <font style="color:#DF2A3F;">🎙️</font><font style="color:#DF2A3F;"> 面试故事：《构建响应式大屏适配方案：根除 2K/4K 下的拉伸与模糊》</font>
<details class="lake-collapse"><summary id="ud9439512"><span class="ne-text">简短</span></summary><p id="ucec11187" class="ne-p"><span class="ne-text">【背景引入】<br /></span><span class="ne-text">“在之前的‘企业生产监控大屏’项目中，我们面临的一个核心挑战就是图表多分辨率下的 适配。图表在</span><span class="ne-text" style="color: #DF2A3F">不同分辨率</span><span class="ne-text">下，经常出现</span><span class="ne-text" style="color: #DF2A3F">拉伸变形和字体边缘模糊的问题</span><span class="ne-text">，影响展示效果。”</span></p><p id="ud354e5a2" class="ne-p"><span class="ne-text">【核心行动】</span><span class="ne-text"><br /></span><span class="ne-text">“为了解决这个痛点，我主导构建了一套</span><span class="ne-text">响应式适配方案</span><span class="ne-text">，主要从两个层面入手：</span></p><ul class="ne-ul"><li id="ufd55beae" data-lake-index-type="0"><span class="ne-text">第一是容器监听层。我舍弃了传统的 </span><code class="ne-code"><span class="ne-text">window.resize</span></code><span class="ne-text">，改用 </span><code class="ne-code"><span class="ne-text">ResizeObserver</span></code><span class="ne-text"> 精准监听图表容器尺寸变化，并配合 150ms 防抖 自动触发  ECharts 实例的 </span><code class="ne-code"><span class="ne-text">resize()</span></code><span class="ne-text"> 方法。。这确保了无论屏幕比例如何，图表都能实时自适应。</span></li><li id="ucde59a3f" data-lake-index-type="0"><span class="ne-text">第二是渲染优化层。针对 2K/4K 屏的模糊隐患，我在初始化 ECharts 时，我做了 DPR（设备像素比）深度适配，强制将 Canvas 的绘制像素放大对应倍数（比如 2 倍屏就放大 2 倍绘制，再 CSS 缩小显示）。这就好比用 4K 的素材去填充 1080P 的框，从而实现高清渲染，彻底根除了字体模糊和线条锯齿。</span></li></ul><p id="u4a2691a0" class="ne-p"><span class="ne-text">【结果量化】<br /></span><span class="ne-text">“这套方案上线后，解决了图表在不同分辨率下变形和模糊问题。不用为不同屏幕单独开发代码，适配效率提升了 70%。</span></p></details>
<details class="lake-collapse"><summary id="udac0e3ec"><span class="ne-text">长</span></summary><p id="udd32a463" class="ne-p"><span class="ne-text">第一步：背景与痛点——为什么难？）<br /></span><span class="ne-text">“面试官，在这个‘企业生产监控大屏’项目中，我们面临的一个核心挑战就是多分辨率适配。有的用普通的 1080P 显示器，有的用 2K 甚至 4K 的大屏，甚至还有不同比例的拼接屏。<br /></span><span class="ne-text">在项目初期，我们发现两个严重问题：</span></p><ol class="ne-ol"><li id="u7760a8c8" data-lake-index-type="0"><span class="ne-text">图形拉伸变形</span><span class="ne-text">：在不同比例屏幕上，图表被强行拉伸，导致圆形变椭圆，布局错乱。</span></li><li id="u41c5762b" data-lake-index-type="0"><span class="ne-text">字体与线条模糊</span><span class="ne-text">：特别是在 2K/4K 高分屏上，由于 Canvas 默认未适配设备像素比（DPR），文字边缘发虚，线条锯齿严重，完全达不到‘高清大屏’的要求。</span><span class="ne-text"><br /></span><span class="ne-text">如果为每种屏幕单独开发一套代码，工作量巨大且无法维护。所以，我的目标是：</span><span class="ne-text">构建一套通用的响应式适配方案，实现全终端像素级一致渲染，适配效率提升 70%。</span><span class="ne-text">”</span></li></ol><p id="u60aa388f" class="ne-p"><span class="ne-text">（第二步：核心方案——容器监听与自动重绘）</span><span class="ne-text"><br /></span><span class="ne-text">“为了解决这个问题，我从</span><span class="ne-text">容器</span><span class="ne-text">和</span><span class="ne-text">配置</span><span class="ne-text">两个层面实施了策略。</span></p><p id="u4e2e848f" class="ne-p"><span class="ne-text">首先是容器层面的‘自适应监听’。<br /></span><span class="ne-text">我没有使用传统的 </span><code class="ne-code"><span class="ne-text">window.resize</span></code><span class="ne-text"> 事件（因为它监听的是窗口，而不是图表容器），而是引入了 </span><code class="ne-code"><span class="ne-text">ResizeObserver</span></code><span class="ne-text"> API。我在图表组件外层包裹了一个响应式容器，利用 </span><code class="ne-code"><span class="ne-text">ResizeObserver</span></code><span class="ne-text"> 实时监听容器尺寸的变化。一旦检测到宽高改变，我就自动调用 ECharts 实例的 </span><code class="ne-code"><span class="ne-text">resize()</span></code><span class="ne-text"> 方法。<br /></span><span class="ne-text">这里有个细节：为了避免容器微小抖动或频繁变化导致的性能浪费，我对 </span><code class="ne-code"><span class="ne-text">resize</span></code><span class="ne-text"> 调用加了 150ms 的防抖（Debounce）处理。<br /></span><span class="ne-text">这一步确保了无论屏幕怎么变，图表始终能自动重绘，完美填充容器，根除了图形拉伸的问题。”</span></p><p id="u45bb97a7" class="ne-p"><span class="ne-text">（第三步：深度优化——DPR 适配与动态配置）</span><span class="ne-text"><br /></span><span class="ne-text">“解决了布局，接下来是更难的</span><span class="ne-text">清晰度问题</span><span class="ne-text">。</span><span class="ne-text"><br /></span><span class="ne-text">针对 2K/4K 屏的模糊隐患，我在初始化 ECharts 时，做了</span><span class="ne-text">DPR（设备像素比）的深度适配</span><span class="ne-text">。</span><span class="ne-text"><br /></span><span class="ne-text">默认情况下，ECharts 在某些高 D PR 设备上可能不会自动放大画布。我通过获取</span><span class="ne-text"> </span><code class="ne-code"><span class="ne-text">window.devicePixelRatio</span></code><span class="ne-text">，在</span><span class="ne-text"> </span><code class="ne-code"><span class="ne-text">init</span></code><span class="ne-text"> </span><span class="ne-text">阶段显式传入</span><span class="ne-text"> </span><code class="ne-code"><span class="ne-text">devicePixelRatio</span></code><span class="ne-text"> </span><span class="ne-text">参数</span><span class="ne-text">，或者在内部强制将 Canvas 的绘制像素放大对应倍数（比如 2 倍屏就放大 2 倍绘制，再 CSS 缩小显示）。</span><span class="ne-text"><br /></span><span class="ne-text">这就好比用 4K 的素材去填充 1080P 的框，从而实现了</span><span class="ne-text">像素级的高清渲染</span><span class="ne-text">，彻底根除了字体模糊和线条锯齿。</span></p><p id="u1c77c85e" class="ne-p"><span class="ne-text">同时，为了应对不同尺寸下的样式差异，我实施了</span><span class="ne-text">‘配置动态适配’策略</span><span class="ne-text">。</span><span class="ne-text"><br /></span><span class="ne-text">我在组件内部根据容器宽度，动态生成或合并 ECharts 配置：</span></p><ul class="ne-ul"><li id="u6862bb6b" data-lake-index-type="0"><span class="ne-text">大屏模式</span><span class="ne-text">：展示完整的图例、详细的坐标轴刻度、大字号标题。</span></li><li id="u88280d03" data-lake-index-type="0"><span class="ne-text">中小屏模式</span><span class="ne-text">：自动调整内边距（Grid），缩小字体，甚至移动图例位置以避免遮挡。</span><span class="ne-text"><br /></span><span class="ne-text">这通过</span><span class="ne-text">媒体查询</span><span class="ne-text">结合</span><span class="ne-text">JS 动态计算</span><span class="ne-text">实现，确保在任何分辨率下，图表不仅‘放得下’，而且‘看得清’。”</span></li></ul><p id="ue071925d" class="ne-p"><span class="ne-text">（第四步：极致体验——小屏简化策略）</span><span class="ne-text"><br /></span><span class="ne-text">“最后，我还做了一个</span><span class="ne-text">体验优化</span><span class="ne-text">。</span><span class="ne-text"><br /></span><span class="ne-text">当屏幕缩小到一定程度（比如窄屏监控模式），有些复杂图表如果强行展示所有数据，会显得非常拥挤。</span><span class="ne-text"><br /></span><span class="ne-text">所以我设计了</span><span class="ne-text">‘智能简化’机制</span><span class="ne-text">：</span></p><ul class="ne-ul"><li id="u740805fb" data-lake-index-type="0"><span class="ne-text">对于柱状图，小屏下自动隐藏部分非关键标签，只保留峰值提示。</span></li><li id="u1943bae4" data-lake-index-type="0"><span class="ne-text">对于折线图，动态减少坐标轴的刻度数量（比如从每 5 分钟一个刻度变为每 30 分钟一个）。</span><span class="ne-text"><br /></span><span class="ne-text">这确保了即使在受限空间内，核心数据依然清晰可辨，不会出现信息过载。”</span></li></ul><p id="uec5c4cbf" class="ne-p"><span class="ne-text">（第五步：成果量化）</span><span class="ne-text"><br /></span><span class="ne-text">“这套方案上线后，效果非常理想：</span></p><ul class="ne-ul"><li id="ua86d6d85" data-lake-index-type="0"><span class="ne-text">视觉一致性</span><span class="ne-text">：实现了从 1080P 到 4K 大屏的</span><span class="ne-text">全终端像素级一致渲染</span><span class="ne-text">，再也听不到客户抱怨‘字看不清’或‘图变形了’。</span></li><li id="ubdbf32bd" data-lake-index-type="0"><span class="ne-text">开发效率</span><span class="ne-text">：我们不再需要为不同分辨率单独写代码，</span><span class="ne-text">适配效率提升了 70%</span><span class="ne-text">。</span></li><li id="u88aac5c7" data-lake-index-type="0"><span class="ne-text">稳定性：结合防抖和自动重绘，即使在大屏动态缩放或切换分屏模式时，图表也能流畅响应，无卡顿、无闪烁。”</span></li></ul></details>
---









### 1.3 难点与亮点分析
#### 难点 1：图表配置的灵活性与复用性平衡
问题：既要保证封装后使用简单，又要支持复杂业务场景的深度定制。

解决方案：

+ 采用三层配置合并策略：默认配置 → 主题配置 → 业务配置
+ 使用深度合并算法，支持配置的增量更新而非全量覆盖
+ 提供配置钩子函数，允许业务方在最终配置生成前进行修改

技术亮点：

+ 实现了智能配置合并，支持数组的追加而非替换
+ 配置校验机制，避免无效配置导致图表渲染失败
+ 配置热更新，无需重新创建图表实例



#### 难点 2：内存泄漏与性能优化
问题：图表实例未正确销毁导致内存累积，大量图表同时渲染造成页面卡顿。

解决方案：

+ 实现完整的生命周期管理，确保组件销毁时清理所有资源
+ 使用图表实例池，复用已创建的实例
+ 实现懒加载和虚拟滚动，按需渲染可视区域内的图表

技术亮点：

+ 自动检测并清理僵尸图表实例
+ 实现了图表的延迟初始化，提升首屏加载速度
+ 使用 requestAnimationFrame 优化动画性能



#### 难点 3：数据更新的时机和方式
问题：数据频繁更新导致图表闪烁，大数据量更新造成界面卡顿。

解决方案：

+ 实现数据 diff 算法，只更新变化的部分
+ 使用防抖和节流控制更新频率
+ 对于大数据量更新，使用分批更新策略

技术亮点：

+ 智能判断是否需要全量重绘还是增量更新
+ 实现了平滑过渡动画，提升用户体验
+ 支持数据流式更新，适配实时监控场景

### 1.4 完整技术实现
#### 基础图表组件封装
```vue
<!-- BaseChart.vue -->
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
    <div v-else-if="error" class="chart-error">
      <div class="error-icon">⚠️</div>
      <p>{{ error }}</p>
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

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { debounce, merge } from 'lodash-es'
import { useTheme } from './useTheme'
import { getDefaultOptions } from './chartConfig'

const props = defineProps({
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
})

const emit = defineEmits(['click', 'ready', 'error', 'refresh'])

// 图表实例（使用 shallowRef 避免深度响应）
const chartInstance = shallowRef(null)
// 图表容器引用
const chartRef = ref(null)
// 错误信息
const error = ref(null)
// 是否为空数据
const isEmpty = ref(false)
// ResizeObserver 实例
let resizeObserver = null
// 自动刷新定时器
let refreshTimer = null

// 获取主题配置
const { getThemeOptions } = useTheme()

// 初始化图表
const initChart = async () => {
  try {
    error.value = null
    
    // 检查数据是否为空
    if (!checkData()) {
      isEmpty.value = true
      return
    }
    
    isEmpty.value = false
    
    await nextTick()
    
    if (!chartRef.value) return
    
    // 如果实例已存在，先销毁
    if (chartInstance.value) {
      chartInstance.value.dispose()
    }
    
    // 创建图表实例
    chartInstance.value = echarts.init(chartRef.value, props.theme)
    
    // 生成图表配置
    const finalOptions = generateOptions()
    
    // 设置配置
    chartInstance.value.setOption(finalOptions, true)
    
    // 绑定事件
    bindEvents()
    
    // 通知图表就绪
    emit('ready', chartInstance.value)
    
  } catch (err) {
    console.error('图表初始化失败:', err)
    error.value = err.message || '图表渲染失败'
    emit('error', err)
  }
}

// 检查数据是否为空
const checkData = () => {
  if (!props.data) return false
  
  if (Array.isArray(props.data)) {
    return props.data.length > 0
  }
  
  if (typeof props.data === 'object') {
    return Object.keys(props.data).length > 0
  }
  
  return false
}

// 生成图表配置
const generateOptions = () => {
  // 获取默认配置
  const defaultOpts = getDefaultOptions(props.type, props.data)
  
  // 获取主题配置
  const themeOpts = getThemeOptions(props.theme)
  
  // 工具栏配置
  const toolboxOpts = props.showToolbox ? {
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
  const finalOptions = merge(
    {},
    defaultOpts,
    themeOpts,
    toolboxOpts,
    props.options
  )
  
  return finalOptions
}

// 绑定事件
const bindEvents = () => {
  if (!chartInstance.value) return
  
  // 点击事件
  chartInstance.value.on('click', (params) => {
    emit('click', params)
  })
  
  // 可以添加更多事件监听
}

// 更新图表
const updateChart = () => {
  if (!chartInstance.value) {
    initChart()
    return
  }
  
  if (!checkData()) {
    isEmpty.value = true
    return
  }
  
  isEmpty.value = false
  
  try {
    const finalOptions = generateOptions()
    chartInstance.value.setOption(finalOptions, true)
  } catch (err) {
    console.error('图表更新失败:', err)
    error.value = err.message
    emit('error', err)
  }
}

// 防抖更新
const debouncedUpdate = debounce(updateChart, 300)

// 调整图表大小
const resizeChart = () => {
  if (chartInstance.value && !chartInstance.value.isDisposed()) {
    chartInstance.value.resize()
  }
}

// 防抖 resize
const debouncedResize = debounce(resizeChart, 150)

// 设置响应式监听
const setupResponsive = () => {
  if (!props.responsive || !chartRef.value) return
  
  // 使用 ResizeObserver 监听容器尺寸变化
  resizeObserver = new ResizeObserver(() => {
    debouncedResize()
  })
  
  resizeObserver.observe(chartRef.value)
}

// 设置自动刷新
const setupAutoRefresh = () => {
  if (props.autoRefresh > 0) {
    refreshTimer = setInterval(() => {
      emit('refresh')
      updateChart()
    }, props.autoRefresh)
  }
}

// 清理自动刷新
const clearAutoRefresh = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
}

// 重试
const handleRetry = () => {
  error.value = null
  initChart()
}

// 监听数据变化
watch(
  () => props.data,
  () => {
    debouncedUpdate()
  },
  { deep: true }
)

// 监听配置变化
watch(
  () => props.options,
  () => {
    debouncedUpdate()
  },
  { deep: true }
)

// 监听主题变化
watch(
  () => props.theme,
  () => {
    // 主题变化需要重新初始化
    initChart()
  }
)

// 监听加载状态
watch(
  () => props.loading,
  (newVal) => {
    if (!newVal && chartInstance.value) {
      // 加载完成后更新图表
      nextTick(() => {
        updateChart()
      })
    }
  }
)

// 生命周期
onMounted(() => {
  initChart()
  setupResponsive()
  setupAutoRefresh()
})

onUnmounted(() => {
  // 清理图表实例
  if (chartInstance.value && !chartInstance.value.isDisposed()) {
    chartInstance.value.dispose()
    chartInstance.value = null
  }
  
  // 清理 ResizeObserver
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  
  // 清理定时器
  clearAutoRefresh()
})

// 暴露方法给父组件
defineExpose({
  chartInstance,
  refresh: updateChart,
  resize: resizeChart,
  getImage: () => {
    if (chartInstance.value) {
      return chartInstance.value.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: '#fff'
      })
    }
    return null
  }
})
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
```

#### 图表配置生成器
```javascript
// chartConfig.js
export const getDefaultOptions = (type, data) => {
  const configs = {
    line: getLineOptions(data),
    bar: getBarOptions(data),
    pie: getPieOptions(data),
    scatter: getScatterOptions(data),
    radar: getRadarOptions(data)
  }
  
  return configs[type] || {}
}

// 折线图默认配置
const getLineOptions = (data) => {
  return {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: data.series?.map(s => s.name) || []
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.xAxis || []
    },
    yAxis: {
      type: 'value'
    },
    series: data.series?.map(s => ({
      name: s.name,
      type: 'line',
      smooth: true,
      data: s.data,
      emphasis: {
        focus: 'series'
      }
    })) || []
  }
}

// 柱状图默认配置
const getBarOptions = (data) => {
  return {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: data.series?.map(s => s.name) || []
    },
    xAxis: {
      type: 'category',
      data: data.xAxis || []
    },
    yAxis: {
      type: 'value'
    },
    series: data.series?.map(s => ({
      name: s.name,
      type: 'bar',
      data: s.data,
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      }
    })) || []
  }
}

// 饼图默认配置
const getPieOptions = (data) => {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: data.map(d => d.name) || []
    },
    series: [
      {
        name: '数据',
        type: 'pie',
        radius: '50%',
        data: data || [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          formatter: '{b}: {d}%'
        }
      }
    ]
  }
}

// 散点图默认配置
const getScatterOptions = (data) => {
  return {
    grid: {
      left: '3%',
      right: '7%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'value',
      scale: true
    },
    yAxis: {
      type: 'value',
      scale: true
    },
    series: data.series?.map(s => ({
      name: s.name,
      type: 'scatter',
      data: s.data,
      symbolSize: 8,
      emphasis: {
        focus: 'series'
      }
    })) || []
  }
}

// 雷达图默认配置
const getRadarOptions = (data) => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: data.series?.map(s => s.name) || []
    },
    radar: {
      indicator: data.indicator || []
    },
    series: [
      {
        type: 'radar',
        data: data.series || []
      }
    ]
  }
}
```

## 二、主题配置系统
### 2.1 主题配置实现
```javascript
// useTheme.js
import { ref, computed } from 'vue'

// 预定义主题
const themes = {
  default: {
    color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    backgroundColor: '#ffffff',
    textStyle: {
      color: '#333333'
    },
    title: {
      textStyle: {
        color: '#333333'
      }
    },
    legend: {
      textStyle: {
        color: '#333333'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.9)',
      borderColor: '#333',
      textStyle: {
        color: '#fff'
      }
    }
  },
  
  dark: {
    color: ['#4992ff', '#7cffb2', '#fddd60', '#ff6e76', '#58d9f9', '#05c091', '#ff8a45', '#8d48e3', '#dd79ff'],
    backgroundColor: '#1e1e1e',
    textStyle: {
      color: '#dddddd'
    },
    title: {
      textStyle: {
        color: '#eeeeee'
      }
    },
    legend: {
      textStyle: {
        color: '#dddddd'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.9)',
      borderColor: '#777',
      textStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#555'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#333'
      }
    }
  },
  
  blue: {
    color: ['#1890ff', '#13c2c2', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#fa8c16', '#eb2f96', '#2f54eb'],
    backgroundColor: '#f0f5ff',
    textStyle: {
      color: '#333333'
    },
    title: {
      textStyle: {
        color: '#1890ff'
      }
    }
  },
  
  green: {
    color: ['#52c41a', '#13c2c2', '#1890ff', '#faad14', '#f5222d', '#722ed1', '#fa8c16', '#eb2f96', '#2f54eb'],
    backgroundColor: '#f6ffed',
    textStyle: {
      color: '#333333'
    },
    title: {
      textStyle: {
        color: '#52c41a'
      }
    }
  }
}

// 当前主题
const currentTheme = ref('default')

export const useTheme = () => {
  // 获取主题配置
  const getThemeOptions = (themeName = currentTheme.value) => {
    return themes[themeName] || themes.default
  }
  
  // 设置主题
  const setTheme = (themeName) => {
    if (themes[themeName]) {
      currentTheme.value = themeName
    }
  }
  
  // 注册自定义主题
  const registerTheme = (name, config) => {
    themes[name] = config
  }
  
  // 获取所有主题名称
  const getThemeNames = () => {
    return Object.keys(themes)
  }
  
  return {
    currentTheme: computed(() => currentTheme.value),
    getThemeOptions,
    setTheme,
    registerTheme,
    getThemeNames
  }
}
```

### 2.2 主题切换组件
```vue
<!-- ThemeSelector.vue -->
<template>
  <div class="theme-selector">
    <button 
      v-for="name in themeNames" 
      :key="name"
      :class="['theme-btn', { active: currentTheme === name }]"
      @click="handleThemeChange(name)"
    >
      {{ name }}
    </button>
  </div>
</template>

<script setup>
import { useTheme } from './useTheme'

const { currentTheme, getThemeNames, setTheme } = useTheme()
const themeNames = getThemeNames()

const emit = defineEmits(['change'])

const handleThemeChange = (name) => {
  setTheme(name)
  emit('change', name)
}
</script>

<style scoped>
.theme-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.theme-btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.theme-btn:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}

.theme-btn.active {
  background: #1890ff;
  border-color: #1890ff;
  color: white;
}
</style>
```

## 三、图表联动与钻取
### 3.1 图表联动实现
```vue
<!-- ChartLinkage.vue -->
<template>
  <div class="chart-linkage">
    <div class="chart-row">
      <BaseChart
        ref="chart1Ref"
        type="bar"
        :data="barData"
        :options="barOptions"
        @click="handleBarClick"
        height="300px"
      />
    </div>
    
    <div class="chart-row">
      <BaseChart
        ref="chart2Ref"
        type="line"
        :data="lineData"
        :options="lineOptions"
        height="300px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseChart from './BaseChart.vue'
import * as echarts from 'echarts'

const chart1Ref = ref(null)
const chart2Ref = ref(null)

// 选中的类别
const selectedCategory = ref(null)

// 柱状图数据
const barData = ref({
  xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [{
    name: '销售额',
    data: [120, 200, 150, 80, 70, 110, 130]
  }]
})

const barOptions = ref({
  emphasis: {
    focus: 'series',
    blurScope: 'coordinateSystem'
  }
})

// 折线图数据
const lineData = ref({
  xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  series: [{
    name: '访问量',
    data: [10, 20, 30, 40, 35, 25, 15]
  }]
})

const lineOptions = ref({})

// 处理柱状图点击
const handleBarClick = (params) => {
  selectedCategory.value = params.name
  
  // 高亮当前选中的柱子
  const chart1 = chart1Ref.value?.chartInstance
  if (chart1) {
    chart1.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: params.dataIndex
    })
  }
  
  // 更新折线图数据（模拟钻取）
  updateLineChart(params.name)
}

// 更新折线图数据
const updateLineChart = (category) => {
  // 模拟根据选中类别获取详细数据
  const detailData = {
    '周一': [12, 15, 20, 35, 30, 25, 18],
    '周二': [20, 25, 30, 45, 40, 35, 28],
    '周三': [15, 18, 25, 35, 32, 28, 20],
    '周四': [8, 12, 18, 25, 22, 18, 10],
    '周五': [7, 10, 15, 22, 20, 15, 8],
    '周六': [11, 15, 22, 32, 28, 22, 15],
    '周日': [13, 18, 25, 35, 30, 25, 18]
  }
  
  lineData.value = {
    xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    series: [{
      name: `${category}访问量`,
      data: detailData[category] || []
    }]
  }
  
  lineOptions.value = {
    title: {
      text: `${category} 详细数据`,
      left: 'center'
    }
  }
}

// 实现双向联动
const setupLinkage = () => {
  const chart1 = chart1Ref.value?.chartInstance
  const chart2 = chart2Ref.value?.chartInstance
  
  if (!chart1 || !chart2) return
  
  // 连接图表
  echarts.connect([chart1, chart2])
  
  // 可以实现更多联动效果，比如同步缩放、同步提示等
}

// 组件挂载后设置联动
watch([chart1Ref, chart2Ref], () => {
  if (chart1Ref.value && chart2Ref.value) {
    setupLinkage()
  }
})
</script>

<style scoped>
.chart-linkage {
  padding: 20px;
}

.chart-row {
  margin-bottom: 20px;
}
</style>
```

## 四、动态数据更新
### 4.1 实时数据更新实现
```vue
<!-- RealtimeChart.vue -->
<template>
  <div class="realtime-chart">
    <div class="control-bar">
      <button @click="toggleUpdate">
        {{ isUpdating ? '暂停' : '开始' }}更新
      </button>
      <button @click="resetData">重置数据</button>
      <span>更新间隔：</span>
      <select v-model.number="updateInterval">
        <option :value="500">500ms</option>
        <option :value="1000">1s</option>
        <option :value="2000">2s</option>
        <option :value="5000">5s</option>
      </select>
    </div>
    
    <BaseChart
      type="line"
      :data="chartData"
      :options="chartOptions"
      height="400px"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import BaseChart from './BaseChart.vue'

// 是否正在更新
const isUpdating = ref(false)
// 更新间隔
const updateInterval = ref(1000)
// 定时器
let timer = null

// 图表数据
const chartData = ref({
  xAxis: [],
  series: [{
    name: '实时数据',
    data: []
  }]
})

// 图表配置
const chartOptions = ref({
  title: {
    text: '实时数据监控',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '10%']
  },
  dataZoom: [{
    type: 'inside',
    start: 0,
    end: 100
  }, {
    start: 0,
    end: 100
  }]
})

// 最大数据点数
const MAX_DATA_COUNT = 50

// 初始化数据
const initData = () => {
  const now = new Date()
  const data = []
  const xAxis = []
  
  for (let i = 0; i < 20; i++) {
    const time = new Date(now.getTime() - (19 - i) * 1000)
    xAxis.push(formatTime(time))
    data.push(Math.random() * 100)
  }
  
  chartData.value = {
    xAxis,
    series: [{
      name: '实时数据',
      data
    }]
  }
}

// 格式化时间
const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

// 更新数据
const updateData = () => {
  const now = new Date()
  const time = formatTime(now)
  const value = Math.random() * 100
  
  // 添加新数据
  chartData.value.xAxis.push(time)
  chartData.value.series[0].data.push(value)
  
  // 移除超出限制的数据
  if (chartData.value.xAxis.length > MAX_DATA_COUNT) {
    chartData.value.xAxis.shift()
    chartData.value.series[0].data.shift()
  }
  
  // 触发响应式更新
  chartData.value = { ...chartData.value }
}

// 开始/暂停更新
const toggleUpdate = () => {
  isUpdating.value = !isUpdating.value
  
  if (isUpdating.value) {
    startUpdate()
  } else {
    stopUpdate()
  }
}

// 开始更新
const startUpdate = () => {
  if (timer) return
  
  timer = setInterval(() => {
    updateData()
  }, updateInterval.value)
}

// 停止更新
const stopUpdate = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// 重置数据
const resetData = () => {
  stopUpdate()
  isUpdating.value = false
  initData()
}

// 监听更新间隔变化
watch(updateInterval, () => {
  if (isUpdating.value) {
    stopUpdate()
    startUpdate()
  }
})

// 生命周期
onMounted(() => {
  initData()
})

onUnmounted(() => {
  stopUpdate()
})
</script>

<style scoped>
.realtime-chart {
  padding: 20px;
}

.control-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
}

.control-bar button {
  padding: 6px 16px;
  border: none;
  background: #1890ff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.control-bar button:hover {
  background: #40a9ff;
}

.control-bar select {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
</style>
```

## 五、图表导出与打印
### 5.1 图表导出实现
```vue
<!-- ChartExport.vue -->
<template>
  <div class="chart-export">
    <div class="toolbar">
      <button @click="exportImage('png')">导出PNG</button>
      <button @click="exportImage('jpg')">导出JPG</button>
      <button @click="exportSVG">导出SVG</button>
      <button @click="exportPDF">导出PDF</button>
      <button @click="printChart">打印图表</button>
    </div>
    
    <BaseChart
      ref="chartRef"
      type="bar"
      :data="chartData"
      height="400px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseChart from './BaseChart.vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const chartRef = ref(null)

const chartData = ref({
  xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [{
    name: '销售额',
    data: [120, 200, 150, 80, 70, 110, 130]
  }]
})

// 导出图片
const exportImage = (type = 'png') => {
  const chart = chartRef.value?.chartInstance
  if (!chart) return
  
  try {
    const url = chart.getDataURL({
      type: type,
      pixelRatio: 2,
      backgroundColor: '#fff'
    })
    
    downloadFile(url, `chart.${type}`)
  } catch (error) {
    console.error('导出图片失败:', error)
    alert('导出失败，请重试')
  }
}

// 导出SVG
const exportSVG = () => {
  const chart = chartRef.value?.chartInstance
  if (!chart) return
  
  try {
    const svg = chart.renderToSVGString()
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    
    downloadFile(url, 'chart.svg')
    
    // 释放URL对象
    setTimeout(() => URL.revokeObjectURL(url), 100)
  } catch (error) {
    console.error('导出SVG失败:', error)
    alert('导出失败，请重试')
  }
}

// 导出PDF
const exportPDF = async () => {
  const chart = chartRef.value?.chartInstance
  if (!chart) return
  
  try {
    // 获取图表图片
    const url = chart.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff'
    })
    
    // 创建PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [800, 600]
    })
    
    // 添加图片到PDF
    pdf.addImage(url, 'PNG', 0, 0, 800, 600)
    
    // 保存PDF
    pdf.save('chart.pdf')
  } catch (error) {
    console.error('导出PDF失败:', error)
    alert('导出失败，请重试')
  }
}

// 打印图表
const printChart = () => {
  const chart = chartRef.value?.chartInstance
  if (!chart) return
  
  try {
    const url = chart.getDataURL({
      type: 'png',
      pixelRatio: 2,
      backgroundColor: '#fff'
    })
    
    // 创建打印窗口
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>打印图表</title>
          <style>
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            img {
              max-width: 100%;
              height: auto;
            }
            @media print {
              body {
                margin: 0;
              }
              img {
                max-width: 100%;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <img src="${url}" onload="window.print();window.close();" />
        </body>
      </html>
    `)
    printWindow.document.close()
  } catch (error) {
    console.error('打印失败:', error)
    alert('打印失败，请重试')
  }
}

// 下载文件
const downloadFile = (url, filename) => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.chart-export {
  padding: 20px;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.toolbar button {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.toolbar button:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}
</style>
```

### 5.2 使用示例
```vue
<!-- App.vue -->
<template>
  <div class="app">
    <h1>ECharts 封装实践示例</h1>
    
    <!-- 主题切换 -->
    <section>
      <h2>主题切换</h2>
      <ThemeSelector @change="handleThemeChange" />
      <BaseChart
        type="line"
        :data="lineData"
        :theme="currentTheme"
        height="300px"
      />
    </section>
    
    <!-- 图表联动 -->
    <section>
      <h2>图表联动</h2>
      <ChartLinkage />
    </section>
    
    <!-- 实时数据 -->
    <section>
      <h2>实时数据更新</h2>
      <RealtimeChart />
    </section>
    
    <!-- 图表导出 -->
    <section>
      <h2>图表导出</h2>
      <ChartExport />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseChart from './components/BaseChart.vue'
import ThemeSelector from './components/ThemeSelector.vue'
import ChartLinkage from './components/ChartLinkage.vue'
import RealtimeChart from './components/RealtimeChart.vue'
import ChartExport from './components/ChartExport.vue'

const currentTheme = ref('default')

const lineData = ref({
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
  series: [{
    name: '销售额',
    data: [120, 200, 150, 80, 70, 110]
  }]
})

const handleThemeChange = (theme) => {
  currentTheme.value = theme
}
</script>

<style>
.app {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

section {
  margin-bottom: 60px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 40px;
}

h2 {
  color: #666;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #1890ff;
}
</style>
```

## 六、真实项目经验总结
### 6.1 项目背景
在一个大型数据可视化平台项目中，我们需要展示超过 50 种不同类型的图表。最初每个图表都是独立实现的，代码重复率很高，维护成本也很大。项目经理要求我们对图表进行统一封装，提升开发效率和代码质量。

### 6.2 遇到的实际问题
问题1：不同业务场景对图表的需求差异很大，很难做到完全统一。

解决方案：采用了"默认配置 + 灵活扩展"的设计思路。提供80%常用场景的默认配置，同时允许业务方通过配置覆盖来实现特殊需求。实际使用中，大部分场景只需要传数据就能渲染，特殊场景也能通过自定义配置搞定。



问题2：图表实例没有正确销毁，导致页面切换后内存持续增长。

解决方案：在组件的 onUnmounted 钩子中统一处理资源清理。不仅要 dispose 图表实例，还要清理 ResizeObserver、定时器等。我还加了一个全局的图表实例管理器，定期检查并清理僵尸实例。上线后，内存泄漏问题彻底解决了。



❤问题3：大数据量图表渲染卡顿，影响用户体验。

解决方案：针对不同场景采用了不同的优化策略。对于静态大数据，使用 ECharts 的数据采样功能；对于实时数据流，实现了分批更新和滑动窗口；对于多图表页面，使用了虚拟滚动和懒加载。这些优化让页面流畅度提升了一个档次。

### 6.3 关键技术点
1. 配置合并策略：使用 lodash 的 merge 方法实现深度合并，但针对数组类型做了特殊处理，支持追加而非替换。
2. 响应式布局：使用 ResizeObserver 替代 window.resize 事件，提供更精确的尺寸监听。配合防抖优化，避免频繁触发。
3. 生命周期管理：从初始化、更新、销毁各个阶段都有完整的处理逻辑，确保图表的稳定运行。
4. 主题系统：预定义多套主题，支持运行时切换，也支持业务方注册自定义主题。
5. 导出功能：支持多种格式导出，包括 PNG、JPG、SVG、PDF，还实现了打印功能。

### 6.4 项目成果
这套封装方案在公司内部推广后，新增图表的开发时间从平均 4 小时缩短到 1 小时以内。代码重复率从 70% 降低到 20%。而且因为统一了实现方式，后续的维护和升级也变得很容易。

最重要的是，团队新人上手很快。以前需要花一周时间学习 ECharts，现在只需要半天就能开始开发图表功能了。

