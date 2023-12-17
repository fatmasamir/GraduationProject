<script setup>
import Hompage from "@/components/pages/Hompage/index.vue";
import Slidebar from "@/components/global/Slidebar/index.vue";
import { onMounted, ref } from "@vue/runtime-core";
import { useRouter } from "vue-router";

//router
let router = useRouter();

//onMounted
onMounted(() => {
  if (!localStorage.getItem("access_token")) {
    console.log(localStorage.getItem("access_token"));
    router.push("/login");
  }
});
</script>
<template>
  <div class="Pages">
    <div class="row p-0 m-0">
      <div class="col-md-2 col-0 p-0 m-0"><Slidebar /></div>
      <div class="col-md-10 col-12">
        <h2 class="logo-mobile">Logo</h2>
        <Hompage />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
