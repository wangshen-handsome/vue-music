<template>
  <el-input
    v-model="searchText"
    class="search"
    placeholder="请输入歌词、歌名、歌手或专辑"
    @change="search"
  />
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";

//搜索内容
let searchText = ref<string>("");
//提交搜索
const search = () => {
  console.log(searchText.value);
};
</script>
<style scoped lang="scss">
.search {
  max-width: 400px;
  margin-right: 20px;
}
</style>
