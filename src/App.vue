<template>
  <div id="app">
    <div class="nav-tabs">
      <el-menu :default-active="$route.path" mode="horizontal" router background-color="#0a1931" text-color="#fff" active-text-color="#409EFF">
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
  min-height: 100vh;
}

#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  background-color: #0a1931;
  border-bottom: 1px solid #1e3a8a;
}

.el-menu {
  border-bottom: none !important;
}

.view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
