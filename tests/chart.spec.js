// @ts-check
import { test, expect } from '@playwright/test'

test.describe('ECharts 组件测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('页面标题正确', async ({ page }) => {
    await expect(page).toHaveTitle(/ECharts/)
  })

  test('折线图渲染成功', async ({ page }) => {
    // 等待折线图区域出现
    const lineSection = page.locator('section').filter({ hasText: '折线图' })
    await expect(lineSection).toBeVisible()

    // 等待 ECharts canvas 渲染
    const canvas = lineSection.locator('canvas')
    await expect(canvas).toBeVisible({ timeout: 10000 })
  })

  test('柱状图渲染成功', async ({ page }) => {
    const barSection = page.locator('section').filter({ hasText: '柱状图' })
    await expect(barSection).toBeVisible()

    const canvas = barSection.locator('canvas')
    await expect(canvas).toBeVisible({ timeout: 10000 })
  })

  test('饼图渲染成功', async ({ page }) => {
    const pieSection = page.locator('section').filter({ hasText: '饼图' })
    await expect(pieSection).toBeVisible()

    const canvas = pieSection.locator('canvas')
    await expect(canvas).toBeVisible({ timeout: 10000 })
  })

  test('散点图渲染成功', async ({ page }) => {
    const scatterSection = page.locator('section').filter({ hasText: '散点图' })
    await expect(scatterSection).toBeVisible()

    const canvas = scatterSection.locator('canvas')
    await expect(canvas).toBeVisible({ timeout: 10000 })
  })

  test('雷达图渲染成功', async ({ page }) => {
    const radarSection = page.locator('section').filter({ hasText: '雷达图' })
    await expect(radarSection).toBeVisible()

    const canvas = radarSection.locator('canvas')
    await expect(canvas).toBeVisible({ timeout: 10000 })
  })

  test('主题切换功能', async ({ page }) => {
    // 点击 dark 主题按钮
    const darkBtn = page.locator('.theme-bar button').filter({ hasText: 'dark' })
    await darkBtn.click()

    // 验证按钮激活状态
    await expect(darkBtn).toHaveClass(/active/)
  })

  test('加载状态显示', async ({ page }) => {
    const loadingSection = page.locator('section').filter({ hasText: '加载状态' })
    await expect(loadingSection).toBeVisible()

    // 应该显示加载动画
    const spinner = loadingSection.locator('.loading-spinner')
    await expect(spinner).toBeVisible()
  })

  test('空数据状态显示', async ({ page }) => {
    const emptySection = page.locator('section').filter({ hasText: '空数据状态' })
    await expect(emptySection).toBeVisible()

    // 应该显示空数据提示
    const emptyText = emptySection.locator('.chart-empty p')
    await expect(emptyText).toHaveText('暂无数据')
  })

  test('图表点击事件', async ({ page }) => {
    // 监听控制台日志
    const consoleMessages = []
    page.on('console', msg => {
      if (msg.text().includes('点击了图表')) {
        consoleMessages.push(msg.text())
      }
    })

    // 点击折线图
    const lineSection = page.locator('section').filter({ hasText: '折线图' })
    const canvas = lineSection.locator('canvas')
    await canvas.click({ position: { x: 200, y: 150 } })

    // 等待事件触发
    await page.waitForTimeout(500)

    // 验证点击事件已触发
    expect(consoleMessages.length).toBeGreaterThan(0)
  })

  test('响应式布局 - 窗口缩放', async ({ page }) => {
    // 等待图表渲染
    const lineSection = page.locator('section').filter({ hasText: '折线图' })
    const canvas = lineSection.locator('canvas')
    await expect(canvas).toBeVisible({ timeout: 10000 })

    // 获取初始尺寸
    const initialSize = await canvas.boundingBox()

    // 缩小窗口
    await page.setViewportSize({ width: 800, height: 600 })
    await page.waitForTimeout(500) // 等待 resize 防抖

    // 验证图表仍然可见
    await expect(canvas).toBeVisible()
  })
})
