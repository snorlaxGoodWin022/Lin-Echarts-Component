/**
 * 图表配置生成器
 * 根据图表类型和数据生成默认配置
 */

/**
 * 获取默认配置
 * @param {string} type - 图表类型
 * @param {object|array} data - 图表数据
 * @returns {object} ECharts 配置
 */
export function getDefaultOptions(type, data) {
  const configs = {
    line: getLineOptions,
    bar: getBarOptions,
    pie: getPieOptions,
    scatter: getScatterOptions,
    radar: getRadarOptions
  }

  const generator = configs[type]
  return generator ? generator(data) : {}
}

/**
 * 折线图默认配置
 */
function getLineOptions(data) {
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

/**
 * 柱状图默认配置
 */
function getBarOptions(data) {
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

/**
 * 饼图默认配置
 */
function getPieOptions(data) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: Array.isArray(data) ? data.map(d => d.name) : []
    },
    series: [
      {
        name: '数据',
        type: 'pie',
        radius: '50%',
        data: Array.isArray(data) ? data : [],
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

/**
 * 散点图默认配置
 */
function getScatterOptions(data) {
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

/**
 * 雷达图默认配置
 */
function getRadarOptions(data) {
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
        data: data.series?.map(s => ({
          name: s.name,
          value: s.value || s
        })) || []
      }
    ]
  }
}

export default {
  getDefaultOptions
}
