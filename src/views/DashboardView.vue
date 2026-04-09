<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <!-- Top Stat Cards -->
      <div class="top-panel">
        <div class="top-cards">
          <StatCard v-for="(card, index) in statCards" :key="index" :data="card" />
        </div>
      </div>
      
      <div class="main-content">
        <!-- Left Column -->
        <div class="left-column">
          <DataScale />
          <ElementFields />
          <TypeDistribution />
        </div>
        
        <!-- Right Column -->
        <div class="right-column">
          <DataSystem />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatCard from '../components/dashboard/StatCard.vue';
import DataScale from '../components/dashboard/DataScale.vue';
import ElementFields from '../components/dashboard/ElementFields.vue';
import TypeDistribution from '../components/dashboard/TypeDistribution.vue';
import DataSystem from '../components/dashboard/DataSystem.vue';

export default {
  name: 'DashboardView',
  components: {
    StatCard,
    DataScale,
    ElementFields,
    TypeDistribution,
    DataSystem
  },
  data() {
    return {
      statCards: [
        { title: '外交名单', value: '35,821', icon: 'el-icon-user-solid', bg: '#eef3ff', tags: ['专用'] },
        { title: '中间库', value: '85,291', icon: 'el-icon-monitor', bg: '#eefaf9', tags: ['个人'] },
        { title: '基础库', value: '12,405', icon: 'el-icon-coin', bg: '#edf4ff', tags: ['通用'] },
        { title: '邮件库', value: '4,521,092', icon: 'el-icon-message', bg: '#f0f3ff', tags: ['通用', '专用'] },
        { title: '资料库', value: '928,341', icon: 'el-icon-document', bg: '#f0f6ff', tags: ['通用', '专用'] },
        { title: '人脸库', value: '342,105', icon: 'el-icon-camera-solid', bg: '#f0f4ff', tags: ['通用', '专用'] }
      ]
    }
  }
}
</script>

<style scoped>
.dashboard-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f4f7fc;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.dashboard-container {
  width: 100%;
  max-width: 1600px;
  box-sizing: border-box;
}
.top-panel {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
}
.top-cards {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}
.main-content {
  display: flex;
  gap: 20px;
  height: calc(100vh - 180px);
  min-height: 700px;
}
.left-column {
  width: 360px;
  display: flex;
  flex-direction: column;
}
.right-column {
  flex: 1;
}
</style>
