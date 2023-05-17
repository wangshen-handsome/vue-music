<template>
  <el-table :data="list" class="table" @row-click="rowClick">
    <el-table-column prop="index" label="序号" width="80" align="center" />
    <el-table-column show-overflow-tooltip prop="name" label="歌名" align="center">
      <template #default="{ row }">
        <span>{{ row.name }}</span>
        <span class="vip" v-if="row.vip">&emsp;VIP</span>
        <span class="license" v-if="row.license">&emsp;暂无版权</span>
      </template>
    </el-table-column>
    <el-table-column show-overflow-tooltip prop="singer" label="歌手" align="center" />
    <el-table-column show-overflow-tooltip prop="alName" label="专辑" align="center" />
    <el-table-column prop="songTime" label="时长" width="100" align="center" />
  </el-table>
  <el-pagination
    class="page"
    :page-size="20"
    layout="prev, pager, next"
    :total="playList.num"
    @size-change="changePageNum"
    @current-change="changePageNum"
    @prev-click="changePageNum"
    @next-click="changePageNum"
  />
</template>
<script setup lang="ts">
import { ref, watch, PropType } from "vue";

const props = defineProps({
  playList: Object as PropType<any>,
});

//存放当前页数据
let list = ref<any[]>([]);

//页码
const pageNum = ref<number>(1);

//页码改变事件
const changePageNum = (index: number) => {
  pageNum.value = index;
};

watch(pageNum, () => {
  gainList();
});

//获取list
const gainList = () => {
  list.value = props.playList.tracks.slice((pageNum.value - 1) * 20, pageNum.value * 20);
};

//行点击事件
const rowClick = (row: any, column: any, event: any) => {
  console.log(row, column, event);
};

gainList();
</script>
<style scoped lang="scss">
.table {
  width: 100%;
  cursor: pointer;
}
.page {
  padding: 10px 0;
}
.vip {
  color: #409eff;
}
.license {
  color: #f40;
}
</style>
