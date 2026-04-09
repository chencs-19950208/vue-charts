<template>
  <div class="panel data-system">
    <div class="panel-title"><i class="el-icon-pie-chart"></i> 数据体系</div>
    <div class="system-content">
      <!-- Pyramid -->
      <div class="pyramid-wrapper">
        <div class="layer top">
          <div class="shape">
            <span class="text">敏感人员库</span>
          </div>
          <div class="arrow"></div>
        </div>
        <div class="layer middle">
          <div class="shape">
            <span class="text">中间库</span>
          </div>
          <div class="arrow"></div>
        </div>
        <div class="layer bottom">
          <div class="shape">
            <span class="text">基础数据库</span>
          </div>
          <div class="arrow"></div>
        </div>
      </div>
      
      <!-- Right side charts -->
      <div class="charts-wrapper">
        <!-- Top Bar Chart -->
        <div ref="topChart" class="top-chart"></div>
        
        <!-- Middle Boxes -->
        <div class="middle-boxes">
          <div class="box" v-for="i in 4" :key="i">
            <div class="box-value">{{ i === 1 || i === 3 ? '4.5' : '12.8' }}<span class="unit">M</span></div>
            <div class="box-label">分类{{ ['一','二','三','四'][i-1] }}</div>
          </div>
        </div>
        
        <!-- Bottom Donut Chart -->
        <div ref="bottomChart" class="bottom-chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'DataSystem',
  data() {
    return {
      topChartInstance: null,
      bottomChartInstance: null
    };
  },
  mounted() {
    this.initTopChart();
    this.initBottomChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    if (this.topChartInstance) this.topChartInstance.dispose();
    if (this.bottomChartInstance) this.bottomChartInstance.dispose();
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (this.topChartInstance) this.topChartInstance.resize();
      if (this.bottomChartInstance) this.bottomChartInstance.resize();
    },
    initTopChart() {
      this.topChartInstance = echarts.init(this.$refs.topChart);
      const option = {
        grid: { top: 20, bottom: 20, left: 40, right: 40 },
        xAxis: { type: 'value', show: false },
        yAxis: {
          type: 'category',
          data: ['M3', 'M2', 'M1'],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: '#666', fontSize: 13 }
        },
        series: [
          {
            type: 'bar',
            data: [965, 728, 227],
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: '#4facfe' },
                { offset: 1, color: '#00f2fe' }
              ]),
              borderRadius: 5
            },
            label: {
              show: true,
              position: 'right',
              color: '#333',
              fontSize: 13,
              fontWeight: 'bold'
            }
          }
        ]
      };
      this.topChartInstance.setOption(option);
    },
    initBottomChart() {
      this.bottomChartInstance = echarts.init(this.$refs.bottomChart);
      const option = {
        tooltip: { trigger: 'item' },
        legend: {
          orient: 'vertical',
          right: '5%',
          top: 'center',
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          textStyle: { color: '#666', fontSize: 12 },
          formatter: function(name) {
            return name + '  28.57%';
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: 25, name: '基础数据', itemStyle: { color: '#2E64FF' } },
              { value: 25, name: '出行数据', itemStyle: { color: '#00C5D2' } },
              { value: 25, name: '邮件数据', itemStyle: { color: '#00E473' } },
              { value: 25, name: '资料数据', itemStyle: { color: '#F1C40F' } },
              { value: 25, name: '人脸数据', itemStyle: { color: '#E74C3C' } }
            ]
          },
          // Center text
          {
            type: 'pie',
            radius: ['0%', '0%'],
            center: ['35%', '50%'],
            label: {
              show: true,
              position: 'center',
              formatter: '{val|12701}\n{name|数据规模}',
              rich: {
                val: { fontSize: 22, fontWeight: 'bold', color: '#333', padding: [0,0,6,0] },
                name: { fontSize: 12, color: '#999' }
              }
            },
            data: [{ value: 0 }]
          }
        ]
      };
      this.bottomChartInstance.setOption(option);
    }
  }
}
</script>

<style scoped>
.panel {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
  height: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
/* Background curves */
.panel::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 50% 50%, rgba(64, 158, 255, 0.03) 0%, transparent 60%);
  z-index: 0;
  pointer-events: none;
}
.panel-title {
  font-size: 15px;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
}
.panel-title i {
  color: #409EFF;
}
.system-content {
  display: flex;
  height: calc(100% - 40px);
  position: relative;
  z-index: 1;
}
.pyramid-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  max-width: 500px;
}
.layer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.shape {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  filter: drop-shadow(0 10px 15px rgba(64, 158, 255, 0.3));
}
.layer.top .shape {
  width: 200px;
  height: 150px;
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  background: linear-gradient(180deg, #60a5fa 0%, #2563eb 100%);
  align-items: flex-end;
  padding-bottom: 25px;
  box-sizing: border-box;
}
.layer.middle .shape {
  width: 360px;
  height: 130px;
  clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
  background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
}
.layer.bottom .shape {
  width: 500px;
  height: 130px;
  clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
  background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
}
.arrow {
  position: absolute;
  width: 90px;
  height: 70px;
  background: rgba(64, 158, 255, 0.15);
  clip-path: polygon(0% 25%, 60% 25%, 60% 0%, 100% 50%, 60% 100%, 60% 75%, 0% 75%);
  z-index: -1;
}
.layer.top .arrow { right: 40px; }
.layer.middle .arrow { right: -10px; }
.layer.bottom .arrow { right: -60px; }

.charts-wrapper {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 60px;
}
.top-chart {
  height: 160px;
  width: 100%;
}
.middle-boxes {
  display: flex;
  gap: 16px;
  height: 130px;
  align-items: center;
}
.box {
  flex: 1;
  background: #f0f4f8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90px;
}
.box-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
.box-value .unit {
  font-size: 14px;
  margin-left: 2px;
}
.box-label {
  font-size: 13px;
  color: #666;
  margin-top: 6px;
}
.bottom-chart {
  height: 180px;
  width: 100%;
}
</style>
