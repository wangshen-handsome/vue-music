<template>
  <div class="category">
    <div class="item" v-for="item in list">
      <div class="title">{{ item.name }}</div>
      <div class="content" v-if="!typeObj">
        <el-tag
          :type="typeName === prop.name ? 'success' : ''"
          class="tag"
          v-for="(prop, index) in item.list.slice(0, 8)"
          @click="changeCat(prop, index)"
          >{{ prop.name }}</el-tag
        >

        <el-popover :width="'auto'" trigger="click" class="popover">
          <template #reference>
            <span class="tag" v-if="item.list.length > 9">
              更多
              <el-icon size="12" color="#909090"><ArrowDown /></el-icon>
            </span>
          </template>
          <el-tag
            class="span"
            :type="typeName === prop.name ? 'success' : ''"
            v-for="(prop, index) in item.list.slice(9)"
            @click="changeCat(prop, index)"
            >{{ prop.name }}</el-tag
          >
        </el-popover>
      </div>
      <div class="content" v-else>
        <el-tag
          :type="index == typeObj[prop.type] ? 'success' : ''"
          class="tag"
          v-for="(prop, index) in item.list.slice(0, 8)"
          @click="changeCat(prop, index)"
          >{{ prop.name }}</el-tag
        >

        <el-popover :width="'auto'" trigger="click" class="popover">
          <template #reference>
            <span class="tag" v-if="item.list.length > 9">
              更多
              <el-icon size="12" color="#909090"><ArrowDown /></el-icon>
            </span>
          </template>
          <el-tag
            class="span"
            :type="index === typeObj[prop.type] ? 'success' : ''"
            v-for="(prop, index) in item.list.slice(9)"
            @click="changeCat(prop, index)"
            >{{ prop.name }}</el-tag
          >
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElTag, ElPopover } from "element-plus";

import { ArrowDown } from "@element-plus/icons-vue";

const emit = defineEmits(["changeCat"]);

withDefaults(
  defineProps<{
    list: any[];
    typeName: string;
    typeObj: any;
  }>(),
  {
    typeName: undefined,
    typeObj: undefined,
  }
);

const changeCat = (prop: any, index: number) => {
  emit("changeCat", prop, index);
};
</script>
<style scoped lang="scss">
@import "@/styles/components/category.scss";
</style>
