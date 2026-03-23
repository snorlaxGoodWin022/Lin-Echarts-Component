/**
 * 主题管理
 * 提供预定义主题和主题切换功能
 */

// 预定义主题配置
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
    },
    legend: {
      textStyle: {
        color: '#333333'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(24,144,255,0.9)',
      borderColor: '#1890ff',
      textStyle: {
        color: '#fff'
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
    },
    legend: {
      textStyle: {
        color: '#333333'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(82,196,26,0.9)',
      borderColor: '#52c41a',
      textStyle: {
        color: '#fff'
      }
    }
  }
}

// 当前主题
let currentTheme = 'default'

/**
 * 获取主题配置
 * @param {string} themeName - 主题名称
 * @returns {object} 主题配置
 */
export function getThemeOptions(themeName) {
  const name = themeName || currentTheme
  return themes[name] || themes.default
}

/**
 * 设置当前主题
 * @param {string} themeName - 主题名称
 */
export function setTheme(themeName) {
  if (themes[themeName]) {
    currentTheme = themeName
  }
}

/**
 * 获取当前主题名称
 * @returns {string} 当前主题名称
 */
export function getCurrentTheme() {
  return currentTheme
}

/**
 * 注册自定义主题
 * @param {string} name - 主题名称
 * @param {object} config - 主题配置
 */
export function registerTheme(name, config) {
  themes[name] = config
}

/**
 * 获取所有主题名称
 * @returns {string[]} 主题名称列表
 */
export function getThemeNames() {
  return Object.keys(themes)
}

export default {
  getThemeOptions,
  setTheme,
  getCurrentTheme,
  registerTheme,
  getThemeNames
}
