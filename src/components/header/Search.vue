<template>
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
    <div class="search-box" v-if="!searchSuggestionData.keywords">
      <h3 class="label">热门搜索</h3>
      <el-option
        v-for="(item, index) in searchHotList"
        :key="index"
        :label="item.first"
        :value="item.first"
        @click="search(item)"
      >
        <span :class="[index < 3 ? `rank-${index}` : '']"
          >{{ index + 1 }} . {{ item.first }}</span
        >
      </el-option>
    </div>
    <div v-else>
      <el-option-group
        v-for="item in searchSuggestionList.order"
        :label="getTitle(item)"
        :key="getTitle(item)"
      >
        <div v-if="item === 'songs'">
          <el-option
            v-for="prop in searchSuggestionList.songs"
            :key="prop.id"
            :label="prop.name"
            :value="prop.name"
            @click="search(prop)"
          >
            {{ prop.name }}-
            <span v-for="(a, b) in prop.artists">{{
              (b !== 0 ? "/" : "") + a.name
            }}</span>
          </el-option>
        </div>
        <div v-if="item === 'albums'">
          <el-option
            v-for="prop in searchSuggestionList.albums"
            :key="prop.id"
            :label="prop.name"
            :value="prop.name"
          >
            {{ prop.name }}-
            <span>{{ prop.artist.name }}</span>
          </el-option>
        </div>
        <div v-if="item === 'artists'">
          <el-option
            v-for="prop in searchSuggestionList.artists"
            :key="prop.id"
            :label="prop.name"
            :value="prop.name"
          >
            {{ prop.name }}
          </el-option>
        </div>
        <div v-if="item === 'playlists'">
          <el-option
            v-for="prop in searchSuggestionList.playlists"
            :key="prop.id"
            :label="prop.name"
            :value="prop.name"
          >
            {{ prop.name }}
          </el-option>
        </div>
      </el-option-group>
    </div>
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
  searchHotListLoading,
} = toRefs(useHomeStore());

//搜索框数据变化触发事件
const remoteMethod = (query: string) => {
  if (query) {
    searchSuggestionData.value.keywords = query;
    actionSearchSuggestionList.value();
  } else {
    searchHotList.value = [];
    searchSuggestionData.value.keywords = "";
    handleFocus();
  }
};
//搜索框得焦事件
const handleFocus = () => {
  actionSearchHotList.value();
  searchSuggestionList.value = {
    albums: [],
    artists: [],
    order: [],
    playlists: [],
    songs: [],
  };
};
//提交搜索
const search = (item: any) => {
  console.log(item);
};

//获取类别
const getTitle = (name: string) => {
  switch (name) {
    case "songs":
      return "单曲";
    case "albums":
      return "专辑";
    case "artists":
      return "歌手";
    case "playlists":
      return "歌单";
    default:
      return name;
  }
};
</script>
<style scoped lang="scss">
@import "@/styles/components/Search.scss";
</style>
