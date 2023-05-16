<template>
  <div class="loading">
    <img :class="[tag ? 'tag' : 'img']" src="@/assets/gif/loading.gif" alt="" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";

defineProps({
  tag: Boolean,
});
</script>
<style scoped lang="scss">
.loading {
  width: 100%;
  height: 100%;
  // background-color: #f40;
  .img {
    width: 30%;
    display: block;
    margin: auto;
    padding-top: 10%;
  }
  .tag {
    width: 10%;
    display: block;
    margin: auto;
  }
}
</style>
