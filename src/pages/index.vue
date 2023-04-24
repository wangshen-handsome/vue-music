<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header></Header></el-header>
      <el-container class="container">
        <el-aside width="200px"><Left></Left></el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import Header from "@/components/header/Header.vue";
import Left from "@/components/main/left/Left.vue";
</script>
<style scoped lang="scss">
@import "@/styles/pages/index.scss";
</style>
