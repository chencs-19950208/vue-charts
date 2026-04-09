<template>
  <div id="app">
    <div class="chart-wrapper">
      <div ref="chart" class="chart-container"></div>
      <div class="legend-container">
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item, index) in chartData" :key="index">
            <div class="legend-item">
              <div class="legend-color" :style="{ backgroundColor: item.color }"></div>
              <div class="legend-name">{{ item.name }}</div>
              <div class="legend-value">{{ item.value }}</div>
              <div class="legend-percent">{{ item.percent }}%</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'App',
  data() {
    return {
      chartInstance: null,
      chartData: [
        { name: '机构1', value: 59, percent: 10, color: '#2E64FF' },
        { name: '机构5', value: 24, percent: 15, color: '#2E64FF' },
        { name: '机构2', value: 55, percent: 10, color: '#00C5D2' },
        { name: '机构6', value: 27, percent: 15, color: '#00C5D2' },
        { name: '机构3', value: 19, percent: 8, color: '#00E473' },
        { name: '机构7', value: 19, percent: 15, color: '#F1C40F' },
        { name: '机构4', value: 29, percent: 12, color: '#F39C12' },
        { name: '机构8', value: 13, percent: 15, color: '#E74C3C' }
      ]
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    },
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart);
      
      const pieData = [
        { value: 25, name: '机构1', itemStyle: { color: '#2E64FF' } },
        { value: 20, name: '机构2', itemStyle: { color: '#00C5D2' } },
        { value: 20, name: '机构3', itemStyle: { color: '#00E473' } },
        { value: 20, name: '机构7', itemStyle: { color: '#F1C40F' } },
        { value: 15, name: '机构8', itemStyle: { color: '#E74C3C' } }
      ];

      const option = {
        backgroundColor: 'transparent',
        series: [
          // 最外层环
          {
            type: 'pie',
            radius: ['82%', '88%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            label: { show: false },
            labelLine: { show: false },
            itemStyle: { color: '#1A2B56' },
            data: [{ value: 1 }]
          },
          // 彩色分段环
          {
            type: 'pie',
            radius: ['62%', '78%'],
            center: ['50%', '50%'],
            startAngle: 110,
            label: { show: false },
            labelLine: { show: false },
            data: pieData,
            itemStyle: {
              borderWidth: 6,
              borderColor: '#0a1931' // Match background color for spacing
            }
          },
          // 刻度外侧细环
          {
            type: 'pie',
            radius: ['55%', '55.5%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            label: { show: false },
            labelLine: { show: false },
            itemStyle: { color: '#2A4374' },
            data: [{ value: 1 }]
          },
          // 刻度盘 (陀螺仪中间环)
          {
            type: 'gauge',
            radius: '54%',
            center: ['50%', '50%'],
            startAngle: 90,
            endAngle: -270,
            splitNumber: 80,
            axisLine: { show: false },
            axisTick: {
              show: true,
              lineStyle: { color: '#2A4374', width: 2 },
              length: 15
            },
            splitLine: { show: false },
            axisLabel: { show: false },
            pointer: { show: false },
            detail: { show: false }
          },
          // 刻度内侧细环
          {
            type: 'pie',
            radius: ['43.5%', '44%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            label: { show: false },
            labelLine: { show: false },
            itemStyle: { color: '#2A4374' },
            data: [{ value: 1 }]
          },
          // 内部深色粗环
          {
            type: 'pie',
            radius: ['20%', '30%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            label: { show: false },
            labelLine: { show: false },
            itemStyle: { color: '#121F3D' },
            data: [{ value: 1 }]
          },
          // 中心发光点
          {
            type: 'pie',
            radius: ['0%', '6%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            label: { show: false },
            labelLine: { show: false },
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                { offset: 0, color: '#a855f7' },
                { offset: 1, color: '#6366f1' }
              ])
            },
            data: [{ value: 1 }]
          }
        ]
      };
      
      this.chartInstance.setOption(option);
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #0a1931;
  color: #fff;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#app {
  width: 100%;
  display: flex;
  justify-content: center;
}

.chart-wrapper {
  width: 400px;
  background: linear-gradient(180deg, #051429 0%, #0a2756 100%);
  border-radius: 10px;
  padding: 30px 20px;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.chart-container {
  width: 100%;
  height: 300px;
}

.legend-container {
  margin-top: 30px;
  padding: 0 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
}

.legend-color {
  width: 12px;
  height: 12px;
  margin-right: 10px;
  border-radius: 2px;
}

.legend-name {
  flex: 1;
  color: #a0cfff;
}

.legend-value {
  width: 30px;
  text-align: right;
  color: #fff;
  margin-right: 10px;
  font-weight: bold;
}

.legend-percent {
  width: 40px;
  text-align: right;
  color: #fff;
}
</style>
