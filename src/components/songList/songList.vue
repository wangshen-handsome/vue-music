<template>
  <el-table
    :data="list"
    class="table"
    @cell-mouse-enter="mouseEnter"
    @cell-mouse-leave="mouseLeave"
  >
    <el-table-column prop="index" label="序号" width="80" align="center">
      <template #default="{ row }">
        <template v-if="row.index !== hoverIndex">{{ row.index }}</template>
        <template v-else>
          <pause-one @click="changeIsPlay" v-if="false" theme="filled" size="22" />
          <play @click="clickPlayMusic(row)" v-else theme="filled" size="22" />
        </template>
      </template>
    </el-table-column>
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
import { ref, watch, PropType, toRefs } from "vue";

import { Play, PauseOne } from "@icon-park/vue-next";

import { usePlayBarStore } from "@/store/playBar";

const { clickPlayMusic, changeIsPlay } = toRefs(usePlayBarStore());

const props = defineProps({
  playList: Object as PropType<any>,
});

//存放当前页数据
let list = ref<any[]>([]);

//移入的下标
let hoverIndex = ref<number>(-1);

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

//行移入事件
const mouseEnter = (row: any) => {
  hoverIndex.value = row.index;
};

//行移出事件
const mouseLeave = () => {
  hoverIndex.value = -1;
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
