<template>
  <!--  <el-input-->
  <!--    v-model="searchText"-->
  <!--    class="search"-->
  <!--    placeholder="请输入歌词、歌名、歌手或专辑"-->
  <!--    @change="search"-->
  <!--  />-->

  <el-select
    class="search"
    v-model="searchSuggestionData.keywords"
    filterable
    remote
    reserve-keyword
    placeholder="请输入歌名、歌词、歌手或专辑"
    :remote-method="remoteMethod"
    :loading="searchHotListLoading"
    loading-text="加载中..."
    @focus="handleFocus"
  >
    <div class="search-box" v-if="!searchSuggestionList.order.length">
      <h3 class="label">热门搜索</h3>
      <el-option
        v-for="(item, index) in searchHotList"
        :key="index"
        :label="item.first"
        :value="item.first"
      >
        <span :class="[index < 3 ? `rank-${index}` : '']"
          >{{ index + 1 }} . {{ item.first }}</span
        >
      </el-option>
    </div>
    <el-option-group v-else v-for="item in listType" :label="item" :key="item">
      <el-option v-for="prop in item.value"></el-option>
    </el-option-group>
  </el-select>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";

import { useHomeStore } from "@/store/home";

const {
  searchHotList,
  actionSearchHotList,
  searchSuggestionList,
  searchSuggestionData,
  actionSearchSuggestionList,
  listType,
  searchHotListLoading,
} = toRefs(useHomeStore());

//搜索框数据变化触发事件
const remoteMethod = (query: string) => {
  if (query) {
    searchSuggestionData.value.keywords = query;
    actionSearchSuggestionList.value();
  } else {
    searchHotList.value = [];
  }
};
//搜索框得焦事件
const handleFocus = () => {
  actionSearchHotList.value();
};
//提交搜索
// const search = () => {
//     console.log(searchText.value);
// };
</script>
<style scoped lang="scss">
@import "@/styles/components/Search.scss";
</style>
