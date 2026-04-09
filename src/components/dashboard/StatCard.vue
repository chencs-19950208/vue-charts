<template>
  <div class="stat-card" :style="{ background: data.bg }">
    <div class="card-header">
      <span class="title">{{ data.title }}</span>
      <div class="icon-wrapper">
        <i :class="data.icon"></i>
      </div>
    </div>
    <div class="value">{{ data.value }}</div>
    <div class="tags">
      <span v-for="tag in data.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.stat-card {
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  font-size: 14px;
  font-weight: bold;
}
.icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(64, 158, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #409EFF;
  font-size: 20px;
}
.value {
  font-size: 28px;
  font-weight: bold;
  color: #111;
  margin: 12px 0;
}
.tags {
  display: flex;
  gap: 8px;
}
.tag {
  background: rgba(64, 158, 255, 0.15);
  color: #409EFF;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
