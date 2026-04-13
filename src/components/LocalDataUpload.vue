<template>
  <div class="local-upload-container">
    <el-upload
      class="custom-upload"
      drag
      action="#"
      :auto-upload="false"
      :show-file-list="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">点击或拖拽上传文档</div>
      <div class="upload-tip">支持 doc、pdf、xlsx、txt等多种格式，单个文件不超过 10MB</div>
    </el-upload>

    <div class="custom-file-list">
      <div class="file-item" v-for="(file, index) in fileList" :key="index">
        <div class="file-content">
          <div class="file-info">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">{{ file.size }}</span>
            <span class="file-status" :class="file.statusClass">{{ file.statusText }}</span>
          </div>
          <div class="file-actions">
            <el-button type="primary" size="mini" class="config-btn">字段配置</el-button>
            <i class="el-icon-close close-icon" @click="removeFile(index)"></i>
          </div>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: file.percentage + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocalDataUpload',
  data() {
    return {
      // Mock data to match the image perfectly
      fileList: [
        {
          name: 'WXD.doc',
          size: '100MB',
          statusClass: 'success',
          statusText: '上传成功',
          percentage: 100
        }
      ]
    };
  },
  methods: {
    removeFile(index) {
      this.fileList.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.local-upload-container {
  width: 100%;
  margin-top: 10px;
}

::v-deep .custom-upload .el-upload {
  width: 100%;
}

::v-deep .custom-upload .el-upload-dragger {
  width: 100%;
  height: 140px;
  background: #ffffff;
  border: 1px dashed #2e64ff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

::v-deep .custom-upload .el-upload-dragger:hover {
  background: #f4f8fc;
}

::v-deep .custom-upload .el-upload-dragger .el-icon-upload {
  font-size: 48px;
  color: #2e64ff;
  margin: 0 0 10px 0;
  line-height: 1;
}

::v-deep .custom-upload .el-upload-dragger .el-upload__text {
  color: #333;
  font-size: 14px;
  font-weight: bold;
}

.upload-tip {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
  text-align: center;
}

.custom-file-list {
  margin-top: 16px;
}

.file-item {
  position: relative;
  padding-bottom: 8px;
}

.file-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
}

.file-name {
  color: #333;
  font-weight: bold;
}

.file-size {
  color: #999;
}

.file-status.success {
  color: #34c759; /* Matches the green in the image */
}

.file-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.config-btn {
  background-color: #2e64ff;
  border-color: #2e64ff;
  padding: 6px 16px;
  border-radius: 4px;
  font-weight: bold;
}

.close-icon {
  color: #999;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.close-icon:hover {
  color: #f56c6c;
}

.progress-track {
  height: 4px;
  background: #ebeef5;
  border-radius: 2px;
  overflow: hidden;
  width: 100%;
}

.progress-fill {
  height: 100%;
  background: #34c759; /* Matches the green in the image */
  border-radius: 2px;
  transition: width 0.3s ease;
}
</style>
