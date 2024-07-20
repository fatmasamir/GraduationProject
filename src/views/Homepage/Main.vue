<script setup>
import Hompage from "@/components/pages/Hompage/index.vue";
import { UseProducts } from "@/stores/products/index";
import { onMounted, ref } from "vue";
import Loading from "@/components/global/loading/index.vue";
const Products = UseProducts();
const page = ref(1);
const NextPage = () => {
  page.value += 1;
  Products.get_products(page.value);
};
// const pref = () => {
//   page.value -= 1;
//   Products.get_products(page.value);
// };
onMounted(() => {
  Products.get_products(page.value);
});
</script>
<template>
  <div class="HomePage bg-bgBasic">
    <!-- <Navbar /> -->
    <div class="container w-3/5 m-auto bg-bgwhite shadow-md">
      <!-- <pre>{{ Products.Products }}</pre> -->

      <div
        v-for="(pro, i) in Products.Products"
        :key="i"
        v-if="!Products.is_loading"
      >
        <Hompage :Products="pro" />
      </div>

      <Loading v-else />
      <div class="buttons w-full text-center py-5">
        <button
          @click="NextPage()"
          class="flex justify-center items-center w-full bg-transparent border-0 text-lg font-medium text-primary"
        >
          load more
          <img
            src="@/assets/images/arrow-down-svgrepo-com.svg"
            class="w-5 h-5"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@media (max-width: 768px) {
  .HomePage .container {
    width: 95% !important;
  }
}
</style>
