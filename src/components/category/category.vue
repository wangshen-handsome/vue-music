<template>
  <div class="category">
    <div class="item" v-for="item in list">
      <div class="title">{{ item.name }}</div>
      <div class="content">
        <el-tag
          :type="typeName === prop.name ? 'success' : ''"
          class="tag"
          v-for="prop in item.list.slice(0, 8)"
          @click="changeCat(prop)"
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
            v-for="prop in item.list.slice(9)"
            @click="changeCat(prop)"
            >{{ prop.name }}</el-tag
          >
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, PropType, toRefs } from "vue";

import { ElTag, ElPopover } from "element-plus";

import { ArrowDown } from "@element-plus/icons-vue";

import { useSongStore } from "@/store/songList";

const { topPlayData, actionTopPlayList } = toRefs(useSongStore());

defineProps({
  list: {
    type: Array as PropType<any[]>,
  },
});

//分类名称
let typeName = ref<string>("");

//分类点击事件
const changeCat = (prop: any) => {
  topPlayData.value.cat = typeName.value = prop.name;
  actionTopPlayList.value();
};
</script>
<style scoped lang="scss">
@import "@/styles/components/category.scss";
</style>
