<template>
  <div class="collision-wrapper">
    <div class="collision-container">
      <!-- Tabs -->
      <div class="custom-tabs">
        <div 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['tab-item', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-panel">
        <div class="source-panels-wrapper">
          <!-- Left Panel -->
          <div class="source-panel">
            <div class="panel-header">
              <div class="blue-bar"></div>
              <span>输入数据源：</span>
            </div>
            <div class="form-row radio-row">
              <el-radio-group v-model="leftSourceType">
                <el-radio label="sensitive">敏感人员库</el-radio>
                <el-radio label="basic">基础数据库</el-radio>
                <el-radio label="local">本地数据</el-radio>
              </el-radio-group>
            </div>
            
            <template v-if="leftSourceType !== 'local'">
              <div class="form-row align-center">
                <span class="label">选择数据源：</span>
                <DataSourceSelector v-model="leftSource" :options="dataSourceOptions" class="flex-1" />
              </div>
              <div class="note">
                备注：数据源仅能选择一个数据类型，数据内容支持单多选
              </div>
            </template>
            
            <template v-else>
              <LocalDataUpload />
            </template>
          </div>

          <!-- VS Icon -->
          <div class="vs-icon">VS</div>

          <!-- Right Panel -->
          <div class="source-panel">
            <div class="panel-header">
              <div class="blue-bar"></div>
              <span>输入数据源：</span>
            </div>
            <div class="form-row radio-row">
              <el-radio-group v-model="rightSourceType">
                <el-radio label="sensitive">敏感人员库</el-radio>
                <el-radio label="basic">基础数据库</el-radio>
              </el-radio-group>
            </div>
            <div class="form-row align-center">
              <span class="label">选择数据源：</span>
              <el-select v-model="rightSource" placeholder="请选择" class="flex-1">
                <el-option label="M1" value="m1"></el-option>
                <el-option label="M2" value="m2"></el-option>
              </el-select>
            </div>
            <div class="note">
              备注：数据源可选择多个数据源
            </div>
          </div>
        </div>

        <!-- Rule Collision -->
        <div class="rule-section">
          <div class="panel-header inline-header">
            <div class="blue-bar"></div>
            <span>规则碰撞：</span>
          </div>
          <el-radio-group v-model="ruleType">
            <el-radio label="exact">精确</el-radio>
            <el-radio label="fuzzy">模糊</el-radio>
          </el-radio-group>
        </div>

        <!-- Task Settings -->
        <div class="task-section">
          <div class="task-label">
            <span class="required">*</span> 任务设置：
          </div>
          <el-input v-model="taskName" placeholder="请输入任务名" class="task-input"></el-input>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <el-button icon="el-icon-refresh-right" class="btn-reset" @click="resetForm">重置</el-button>
        <el-button type="primary" icon="el-icon-check" class="btn-submit" @click="submitForm">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import DataSourceSelector from '../components/DataSourceSelector.vue';
import LocalDataUpload from '../components/LocalDataUpload.vue';

export default {
  name: 'CollisionTaskView',
  components: {
    DataSourceSelector,
    LocalDataUpload
  },
  data() {
    return {
      activeTab: 'general',
      tabs: [
        { id: 'general', name: '通用碰撞' },
        { id: 'email', name: '邮件碰撞' },
        { id: 'contact', name: '通讯录碰撞' },
        { id: 'overseas', name: '境外时空节点碰撞' },
        { id: 'domestic', name: '境内时空节点碰撞' }
      ],
      leftSourceType: 'basic',
      leftSource: ['1-1-1-1'], // Default selected
      rightSourceType: 'sensitive',
      rightSource: 'm1',
      ruleType: 'exact',
      taskName: '',
      dataSourceOptions: [
        {
          id: '1',
          label: '基础库',
          children: [
            {
              id: '1-1',
              label: '通用区',
              children: [
                {
                  id: '1-1-1',
                  label: '文件类型1',
                  children: [
                    { id: '1-1-1-1', label: '数据表1' },
                    { id: '1-1-1-2', label: '数据表2' },
                    { id: '1-1-1-3', label: '数据表3' }
                  ]
                },
                {
                  id: '1-1-2',
                  label: '文件类型2',
                  children: [
                    { id: '1-1-2-1', label: '数据表4' }
                  ]
                },
                { id: '1-1-3', label: '文件类型3', children: [] }
              ]
            },
            { id: '1-2', label: '美国', children: [] },
            { id: '1-3', label: '英国', children: [] }
          ]
        },
        { id: '2', label: '出行库', children: [] },
        { id: '3', label: '邮件库', children: [] },
        { id: '4', label: '资料库', children: [] },
        { id: '5', label: '人脸库', children: [] }
      ]
    };
  },
  methods: {
    resetForm() {
      this.leftSourceType = 'basic';
      this.leftSource = [];
      this.rightSourceType = 'sensitive';
      this.rightSource = '';
      this.ruleType = 'exact';
      this.taskName = '';
    },
    submitForm() {
      if (!this.taskName) {
        this.$message.warning('请输入任务名');
        return;
      }
      this.$message.success('提交成功');
    }
  }
};
</script>

<style scoped>
.collision-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eef4fa;
  background-image: linear-gradient(135deg, #e4eff9 0%, #f0f5fa 100%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
  overflow-y: auto;
}

.collision-container {
  width: 1000px;
  max-width: 95%;
  position: relative;
  z-index: 1;
  margin-bottom: 60px;
}

.custom-tabs {
  display: flex;
  background: #e4edf7;
  border-radius: 8px 8px 0 0;
  padding: 8px 16px 0 16px;
}

.tab-item {
  padding: 12px 24px;
  font-size: 14px;
  color: #5c6b7a;
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  margin-right: 8px;
  transition: all 0.3s ease;
}

.tab-item:hover {
  color: #2e64ff;
}

.tab-item.active {
  background: #ffffff;
  color: #2e64ff;
  font-weight: bold;
}

.main-panel {
  background: #ffffff;
  border-radius: 0 8px 8px 8px;
  padding: 30px 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.source-panels-wrapper {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-bottom: 30px;
}

.source-panel {
  flex: 1;
  background: #f4f8fc;
  border: 1px solid #e6edf5;
  border-radius: 8px;
  padding: 24px;
  position: relative;
}

.vs-icon {
  font-size: 48px;
  font-weight: 900;
  font-style: italic;
  font-family: 'Arial Black', Impact, sans-serif;
  background: linear-gradient(135deg, #a0b4d8 0%, #dce6f2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 20px;
  display: flex;
  align-items: center;
  filter: drop-shadow(2px 4px 6px rgba(160, 180, 216, 0.4));
}

.panel-header {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
}

.inline-header {
  margin-bottom: 0;
  margin-right: 20px;
}

.blue-bar {
  width: 4px;
  height: 16px;
  background: #2e64ff;
  border-radius: 2px;
  margin-right: 8px;
}

.form-row {
  margin-bottom: 20px;
}

.radio-row {
  padding-left: 12px;
}

.align-center {
  display: flex;
  align-items: center;
}

.label {
  font-size: 14px;
  color: #666;
  margin-right: 12px;
  width: 90px;
}

.flex-1 {
  flex: 1;
}

.note {
  font-size: 13px;
  color: #999;
  margin-top: 12px;
  padding-left: 102px;
}

.rule-section {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 12px;
}

.task-section {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.task-label {
  font-size: 14px;
  color: #333;
  width: 100px;
  display: flex;
  align-items: center;
}

.required {
  color: #f56c6c;
  margin-right: 4px;
}

.task-input {
  flex: 1;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 20px;
}

.btn-reset {
  width: 120px;
  border-radius: 4px;
}

.btn-submit {
  width: 120px;
  background: #2e64ff;
  border-color: #2e64ff;
  border-radius: 4px;
}

/* Element UI Overrides */
::v-deep .el-radio__input.is-checked .el-radio__inner {
  border-color: #2e64ff;
  background: #2e64ff;
}
::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #2e64ff;
}
::v-deep .el-select .el-input__inner {
  border-color: #e4e7ed;
}
::v-deep .el-select .el-input.is-focus .el-input__inner {
  border-color: #2e64ff;
}
</style>
