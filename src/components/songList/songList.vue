<template>
  <div class="list">
    <div class="header">
      <div class="left">
        <div class="title">歌曲列表</div>
        <div class="num">{{ playList.num }}首歌</div>
      </div>
    </div>
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
            <pause-one
              @click="changeIsPlay"
              v-if="isPauseShow(row)"
              theme="filled"
              size="22"
            />
            <play
              @click="clickPlayMusic(row)"
              v-if="isPlayShow(row)"
              theme="filled"
              size="22"
            />
            <video-two
              @click="goMvDetail(row.mv)"
              v-if="row.mv"
              theme="filled"
              size="22"
            />
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
  </div>
</template>
<script setup lang="ts">
import { ref, watch, toRefs, computed } from "vue";

import { pauseMusic } from "@/utils/pauseMusic";

import { useRouter } from "vue-router";

import { Play, PauseOne, VideoTwo, PlayOne } from "@icon-park/vue-next";

import { usePlayBarStore } from "@/store/playBar";

const { clickPlayMusic, changeIsPlay, isPlay, playUrl } = toRefs(usePlayBarStore());

const router = useRouter();

const props = defineProps<{
  playList: any;
}>();

//存放当前页数据
let list = ref<any[]>([]);

const isPauseShow = computed(() => {
  return (row: any) => {
    let tag = row.src === playUrl.value && isPlay && !row.vip && !row.license;
    return tag;
  };
});

const isPlayShow = computed(() => {
  return (row: any) => {
    let tag = (row.src !== playUrl.value && !row.vip && !row.license) || !isPlay;
    return tag;
  };
});

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

const goMvDetail = (mv: number) => {
  pauseMusic();
  router.push("/mvDetail?id=" + mv);
};

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
.list {
  width: 100%;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 20px 27px rgba(0, 0, 0, 0.2);
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .left {
      display: flex;
      align-items: center;
      .title {
        font-size: 24px;
        font-weight: 600;
        margin-right: 20px;
      }
      .num {
        font-size: 14px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      padding: 7px 14px;
      background-color: #409eff;
      border-radius: 50px;
      color: white;
      cursor: pointer;
      .text {
        margin-left: 10px;
      }
      .icon {
        transform: translateY(2px);
      }
    }
  }
}
</style>
