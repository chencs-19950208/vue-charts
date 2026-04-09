<template>
  <div id="app">
    <div class="nav-tabs">
      <el-menu :default-active="$route.path" mode="horizontal" router background-color="#0a1931" text-color="#fff" active-text-color="#409EFF">
        <el-menu-item index="/dashboard">综合大屏</el-menu-item>
        <el-menu-item index="/pie">环形图</el-menu-item>
        <el-menu-item index="/bar">3D柱状图</el-menu-item>
      </el-menu>
    </div>
    
    <div class="view-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: #0a1931;
  color: #fff;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav-tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #0a1931;
  border-bottom: 1px solid #1e3a8a;
  flex-shrink: 0;
  z-index: 10;
}

.el-menu {
  border-bottom: none !important;
}

.view-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
}
</style>
