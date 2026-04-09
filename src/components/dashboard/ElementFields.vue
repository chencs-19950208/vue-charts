<template>
  <div class="panel">
    <div class="panel-title"><i class="el-icon-coin"></i> 要素字段</div>
    <div ref="chart" class="chart-container"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'ElementFields',
  data() {
    return {
      chartInstance: null
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
      const option = {
        grid: { top: 10, bottom: 10, left: 80, right: 40 },
        xAxis: { type: 'value', show: false },
        yAxis: {
          type: 'category',
          data: ['05 社保卡号', '04 邮箱号', '03 手机号', '02 证件', '01 姓名'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            formatter: function (value) {
              const parts = value.split(' ');
              return `{num|${parts[0]}} {name|${parts[1]}}`;
            },
            rich: {
              num: { color: '#409EFF', fontWeight: 'bold' },
              name: { color: '#666' }
            },
            align: 'left',
            margin: 80
          }
        },
        series: [
          {
            type: 'bar',
            data: [6, 17, 19, 21, 33],
            barWidth: 8,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: '#4facfe' },
                { offset: 1, color: '#00f2fe' }
              ]),
              borderRadius: 4
            },
            label: {
              show: true,
              position: 'right',
              formatter: '{c}%',
              color: '#333',
              fontSize: 12
            }
          }
        ]
      };
      this.chartInstance.setOption(option);
    }
  }
}
</script>

<style scoped>
.panel {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
}
.panel-title {
  font-size: 15px;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.panel-title i {
  color: #409EFF;
}
.chart-container {
  height: 220px;
  width: 100%;
}
</style>
