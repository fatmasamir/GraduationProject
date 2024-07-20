<script setup lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
import ScrollTop from "./components/global/ScrollTop/index.vue";

//loading
const loading = ref(true);

//onMounted
onMounted(() => {
  //setTimeout
  setTimeout(function () {
    loading.value = false;
  }, 1000);
});
</script>
<template>
  <div class="scrollTop"><a href="#"></a></div>
  <router-view></router-view><ScrollTop />
</template>
