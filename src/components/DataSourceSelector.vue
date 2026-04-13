<template>
  <el-popover
    placement="bottom-start"
    width="auto"
    trigger="click"
    v-model="visible"
    popper-class="custom-cascader-popover"
  >
    <div class="cascader-container">
      <!-- Column 1 -->
      <div class="cascader-menu">
        <div 
          v-for="item in options" 
          :key="item.id"
          class="cascader-item"
          :class="{ active: activeLevel1 === item.id }"
          @mouseenter="activeLevel1 = item.id; activeLevel2 = null; activeLevel3 = null"
        >
          <el-checkbox 
            :value="isNodeChecked(item)" 
            :indeterminate="isNodeIndeterminate(item)"
            @change="handleNodeCheck(item, $event)"
            @click.native.stop
          ></el-checkbox>
          <span class="label">{{ item.label }}</span>
          <i class="el-icon-arrow-right" v-if="item.children && item.children.length"></i>
        </div>
      </div>

      <!-- Column 2 -->
      <div class="cascader-menu" v-if="level2Options.length">
        <div 
          v-for="item in level2Options" 
          :key="item.id"
          class="cascader-item"
          :class="{ active: activeLevel2 === item.id }"
          @mouseenter="activeLevel2 = item.id; activeLevel3 = null"
        >
          <span class="label">{{ item.label }}</span>
          <i class="el-icon-arrow-right" v-if="item.children && item.children.length"></i>
        </div>
      </div>

      <!-- Column 3 -->
      <div class="cascader-menu" v-if="level3Options.length">
        <div 
          v-for="item in level3Options" 
          :key="item.id"
          class="cascader-item"
          :class="{ active: activeLevel3 === item.id }"
          @mouseenter="activeLevel3 = item.id"
        >
          <span class="label">{{ item.label }}</span>
          <i class="el-icon-arrow-right" v-if="item.children && item.children.length"></i>
        </div>
      </div>

      <!-- Column 4 -->
      <div class="cascader-menu" v-if="level4Options.length">
        <div 
          v-for="item in level4Options" 
          :key="item.id"
          class="cascader-item"
        >
          <el-checkbox 
            :value="isNodeChecked(item)"
            @change="handleNodeCheck(item, $event)"
            @click.native.stop
          ></el-checkbox>
          <span class="label">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <div slot="reference" class="selector-input" :class="{ 'is-active': visible }">
      <div class="placeholder" v-if="!displayValue">{{ placeholder }}</div>
      <div class="value" v-else>{{ displayValue }}</div>
      <i class="el-icon-arrow-down" :class="{ 'is-reverse': visible }"></i>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: 'DataSourceSelector',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      visible: false,
      activeLevel1: null,
      activeLevel2: null,
      activeLevel3: null,
      selectedLeafIds: [...this.value]
    };
  },
  watch: {
    value(newVal) {
      this.selectedLeafIds = [...newVal];
    },
    options: {
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.length > 0 && !this.activeLevel1) {
          this.activeLevel1 = newVal[0].id;
          if (newVal[0].children && newVal[0].children.length > 0) {
            this.activeLevel2 = newVal[0].children[0].id;
            if (newVal[0].children[0].children && newVal[0].children[0].children.length > 0) {
              this.activeLevel3 = newVal[0].children[0].children[0].id;
            }
          }
        }
      }
    }
  },
  computed: {
    level2Options() {
      const node = this.options.find(n => n.id === this.activeLevel1);
      return node && node.children ? node.children : [];
    },
    level3Options() {
      const node = this.level2Options.find(n => n.id === this.activeLevel2);
      return node && node.children ? node.children : [];
    },
    level4Options() {
      const node = this.level3Options.find(n => n.id === this.activeLevel3);
      return node && node.children ? node.children : [];
    },
    displayValue() {
      if (this.selectedLeafIds.length === 0) return '';
      if (this.selectedLeafIds.length === 1) {
        let label = '';
        const findLabel = (nodes) => {
          for (const node of nodes) {
            if (node.id === this.selectedLeafIds[0]) {
              label = node.label;
              return true;
            }
            if (node.children && findLabel(node.children)) return true;
          }
          return false;
        };
        findLabel(this.options);
        return label;
      }
      return `已选择 ${this.selectedLeafIds.length} 项`;
    }
  },
  methods: {
    getLeafIds(node) {
      let ids = [];
      if (!node.children || node.children.length === 0) {
        ids.push(node.id);
      } else {
        node.children.forEach(child => {
          ids = ids.concat(this.getLeafIds(child));
        });
      }
      return ids;
    },
    isNodeChecked(node) {
      const leafIds = this.getLeafIds(node);
      if (leafIds.length === 0) return false;
      return leafIds.every(id => this.selectedLeafIds.includes(id));
    },
    isNodeIndeterminate(node) {
      const leafIds = this.getLeafIds(node);
      if (leafIds.length === 0) return false;
      const checkedCount = leafIds.filter(id => this.selectedLeafIds.includes(id)).length;
      return checkedCount > 0 && checkedCount < leafIds.length;
    },
    handleNodeCheck(node, checked) {
      const leafIds = this.getLeafIds(node);
      if (checked) {
        leafIds.forEach(id => {
          if (!this.selectedLeafIds.includes(id)) {
            this.selectedLeafIds.push(id);
          }
        });
      } else {
        this.selectedLeafIds = this.selectedLeafIds.filter(id => !leafIds.includes(id));
      }
      this.$emit('input', this.selectedLeafIds);
    }
  }
};
</script>

<style scoped>
.selector-input {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 0 15px;
  height: 40px;
  line-height: 40px;
  background: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s;
}
.selector-input:hover, .selector-input.is-active {
  border-color: #2e64ff;
}
.selector-input .placeholder {
  color: #c0c4cc;
  font-size: 14px;
}
.selector-input .value {
  color: #606266;
  font-size: 14px;
}
.selector-input i {
  color: #c0c4cc;
  transition: transform 0.3s;
}
.selector-input i.is-reverse {
  transform: rotate(180deg);
}

.cascader-container {
  display: flex;
  background: #fff;
  border-radius: 4px;
}
.cascader-menu {
  min-width: 130px;
  border-right: 1px solid #f0f2f5;
  padding: 6px 0;
  max-height: 280px;
  overflow-y: auto;
}
.cascader-menu:last-child {
  border-right: none;
}
.cascader-item {
  padding: 0 15px;
  height: 34px;
  line-height: 34px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
}
.cascader-item:hover, .cascader-item.active {
  background-color: #f4f8fc;
  color: #2e64ff;
}
.cascader-item .el-checkbox {
  margin-right: 8px;
}
.cascader-item .label {
  flex: 1;
}
.cascader-item i {
  margin-left: 8px;
  font-size: 12px;
  color: #bfcbd9;
}
</style>

<style>
.custom-cascader-popover {
  padding: 0 !important;
  border-radius: 4px !important;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1) !important;
}
/* Custom checkbox indeterminate style to match image (solid square) */
.custom-cascader-popover .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #2e64ff;
  border-color: #2e64ff;
}
.custom-cascader-popover .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  content: '';
  position: absolute;
  display: block;
  background-color: #2e64ff; /* Hide the default dash by making it same color as bg */
  height: 2px;
  transform: scale(0.5);
  left: 0;
  right: 0;
  top: 5px;
}
.custom-cascader-popover .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #2e64ff;
  border-color: #2e64ff;
}
</style>
