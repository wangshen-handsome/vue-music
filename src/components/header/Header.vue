<template>
  <header class="header">
    <div class="menu">MUSIC</div>
    <Search></Search>
    <el-switch
      v-model="tag"
      class="switch"
      @change="changeTheme"
      :active-action-icon="Moon"
      :inactive-action-icon="Sunny"
      style="--el-switch-on-color: #000; --el-switch-border-color: #ccc"
    >
    </el-switch>
    <!-- <el-button class="login" link type="primary" @click="goLogin">登录</el-button> -->
  </header>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { Sunny, Moon } from "@element-plus/icons-vue";

import { useRouter } from "vue-router";

import Search from "./Search.vue";

const router = useRouter();

//主题开关
let tag = ref<boolean>(false);

//切换主题
/**
 * @description:
 * @return {*}
 */
const changeTheme = () => {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  toggleDark();
};

//前往登录页
// const goLogin = () => {
//   router.push("/login");
// };
</script>
<style scoped lang="scss">
@import "@/styles/components/Header.scss";
</style>
