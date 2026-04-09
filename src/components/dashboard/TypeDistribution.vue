<template>
  <div class="panel">
    <div class="panel-title"><i class="el-icon-document-copy"></i> 类型分布</div>
    <div class="grid-container">
      <div class="grid-item" v-for="item in items" :key="item.name">
        <div class="icon-box" :style="{ background: item.bg, color: item.color }">
          <i :class="item.icon"></i>
        </div>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="value">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypeDistribution',
  data() {
    return {
      items: [
        { name: '文档', value: '1,000', icon: 'el-icon-document', bg: '#eef3ff', color: '#409EFF' },
        { name: '图片', value: '1,000', icon: 'el-icon-picture-outline', bg: '#eefaf9', color: '#00C5D2' },
        { name: '音频', value: '1,000', icon: 'el-icon-headset', bg: '#edf4ff', color: '#00E473' },
        { name: '视频', value: '1,000', icon: 'el-icon-video-camera', bg: '#f0f3ff', color: '#a855f7' },
        { name: '邮件', value: '1,000', icon: 'el-icon-message', bg: '#f0f6ff', color: '#F39C12' }
      ]
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
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 16px;
}
.grid-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.info {
  display: flex;
  flex-direction: column;
}
.info .name {
  font-size: 13px;
  color: #666;
  margin-bottom: 2px;
}
.info .value {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}
</style>
