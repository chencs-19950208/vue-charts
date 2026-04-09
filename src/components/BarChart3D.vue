<template>
  <div class="chart-wrapper">
    <div ref="chart" class="chart-container"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'BarChart3D',
  data() {
    return {
      chartInstance: null,
      countries: [
        '英国', '法国', '德国', '美国', '日本', '韩国', '意大利', '加拿大', 
        '澳大利亚', '俄罗斯', '印度', '巴西', '南非', '阿根廷', '墨西哥', 
        '西班牙', '荷兰', '瑞士', '瑞典', '挪威'
      ],
      values: [
        2100, 1700, 2800, 3500, 2400, 1900, 1500, 2200, 
        2000, 1800, 2600, 1400, 1200, 1100, 1300, 
        1600, 1750, 1850, 1950, 2050
      ]
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
    this.$refs.chart.addEventListener('wheel', this.handleWheel, { passive: false });
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    window.removeEventListener('resize', this.handleResize);
    if (this.$refs.chart) {
      this.$refs.chart.removeEventListener('wheel', this.handleWheel);
    }
  },
  methods: {
    handleWheel(e) {
      if (!this.chartInstance) return;
      
      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 5) return; // 忽略微小滚动
      
      e.preventDefault(); // 阻止页面默认滚动
      
      const option = this.chartInstance.getOption();
      if (!option || !option.dataZoom || !option.dataZoom[0]) return;
      
      let start = option.dataZoom[0].startValue;
      let end = option.dataZoom[0].endValue;
      
      // 根据滚动方向决定步长
      const step = delta > 0 ? 1 : -1;
      
      let newStart = start + step;
      let newEnd = end + step;
      
      const maxIndex = this.countries.length - 1;
      
      // 边界处理
      if (newStart < 0) {
        newStart = 0;
        newEnd = 2;
      }
      if (newEnd > maxIndex) {
        newEnd = maxIndex;
        newStart = maxIndex - 2;
      }
      
      // 如果有变化则触发更新
      if (newStart !== start) {
        this.chartInstance.dispatchAction({
          type: 'dataZoom',
          startValue: newStart,
          endValue: newEnd
        });
      }
    },
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart);

      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          show: true, // 开启 grid 以捕获空白区域的鼠标拖拽事件
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          top: '15%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.countries,
          axisLine: {
            lineStyle: {
              color: '#4b6382'
            }
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: '#4b6382'
            }
          },
          axisLabel: {
            color: '#8ba0b2',
            fontSize: 12,
            margin: 15
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#8ba0b2',
            fontSize: 12
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#1e304f',
              type: 'dashed'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: 0,
            zoomLock: true, // 锁定缩放，保持刻度固定
            zoomOnMouseWheel: false, // 禁用滚轮缩放
            moveOnMouseWheel: false, // 禁用原生滚轮平移，使用我们自定义的 handleWheel
            moveOnMouseMove: true, // 启用鼠标拖拽平移
            preventDefaultMouseMove: false,
            startValue: 0,
            endValue: 2 // 固定显示 3 个国家，与原图密度保持一致
          },
          {
            type: 'slider',
            show: false, // 隐藏滚动条，但保留其逻辑功能辅助 inside
            xAxisIndex: 0,
            startValue: 0,
            endValue: 2
          }
        ],
        series: [
          {
            type: 'custom',
            name: '数值',
            renderItem: (params, api) => {
              const xLocation = api.coord([api.value(0), api.value(1)]);
              const xLocation0 = api.coord([api.value(0), 0]);
              
              const x = xLocation[0];
              const y = xLocation[1];
              const y0 = xLocation0[1];
              
              const barWidth = 16; // 柱子单侧宽度
              const angleOffset = 8; // 顶部菱形的倾斜高度
              
              // 顶部菱形
              const topFace = {
                type: 'polygon',
                shape: {
                  points: [
                    [x, y - angleOffset],
                    [x + barWidth, y],
                    [x, y + angleOffset],
                    [x - barWidth, y]
                  ]
                },
                style: {
                  fill: '#54d5ff' // 亮青色
                }
              };
              
              // 左侧面
              const leftFace = {
                type: 'polygon',
                shape: {
                  points: [
                    [x - barWidth, y],
                    [x, y + angleOffset],
                    [x, y0 + angleOffset],
                    [x - barWidth, y0]
                  ]
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#34a1e5' },
                    { offset: 1, color: 'rgba(52,161,229,0.05)' }
                  ])
                }
              };
              
              // 右侧面
              const rightFace = {
                type: 'polygon',
                shape: {
                  points: [
                    [x, y + angleOffset],
                    [x + barWidth, y],
                    [x + barWidth, y0],
                    [x, y0 + angleOffset]
                  ]
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#1e68a8' },
                    { offset: 1, color: 'rgba(30,104,168,0.05)' }
                  ])
                }
              };
              
              return {
                type: 'group',
                children: [leftFace, rightFace, topFace]
              };
            },
            data: this.values
          }
        ]
      };

      this.chartInstance.setOption(option);
    }
  }
};
</script>

<style scoped>
.chart-wrapper {
  width: 500px;
  background: linear-gradient(180deg, #051429 0%, #0a2756 100%);
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.chart-container {
  width: 100%;
  height: 400px;
  cursor: grab;
}

.chart-container:active {
  cursor: grabbing;
}
</style>
