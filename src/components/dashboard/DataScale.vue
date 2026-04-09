<template>
  <div class="panel">
    <div class="panel-title"><i class="el-icon-s-data"></i> 数据规模</div>
    <div class="scale-box">
      <span class="number">100.79</span>
      <span class="unit">亿</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataScale'
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
  font-size: 16px;
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
.scale-box {
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 8px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  color: #fff;
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
}
.number {
  font-size: 48px;
  font-weight: bold;
  line-height: 100px;
}
.unit {
  font-size: 20px;
  margin-left: 6px;
}
</style>
