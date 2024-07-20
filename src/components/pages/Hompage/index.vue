<script setup>
import { defineProps, onMounted, ref } from "vue";
import poupdetailes from "./poupdetailes.vue";
import { UseProducts } from "@/stores/products/index";
import { useRoute } from "vue-router";
const Products = UseProducts();
const route = useRoute();
const poupdetailesShow = ref(false);
const props = defineProps(["Products"]);
const firstImageLoad = ref(true);
const GetInformationProduct = async (id) => {
  await Products.getProductInfo(id);
  poupdetailesShow.value = true;
};
const loadImage = () => {
  firstImageLoad.value = false;
};
onMounted(() => {
  firstImageLoad.value = true;
});
</script>
<template>
  <!-- <pre>{{ props.Products }}</pre> -->
  <div class="grid-container w-full">
    <div
      :class="'product' + i"
      v-for="(prod, i) in props.Products"
      :key="prod"
      class="product relative"
    >
      <img
        :src="prod.firstThumbImage"
        v-if="firstImageLoad"
        class="w-full h-full object-cover"
      />
      <img
        class="w-full h-full object-cover"
        :src="prod.firstImage"
        :class="firstImageLoad ? 'hidden' : ''"
        @load="loadImage"
      />
      <div
        class="edit absolute top-0 left-0 w-full h-full z-40"
        @click="GetInformationProduct(prod.id)"
      ></div>
    </div>

    <poupdetailes
      v-if="poupdetailesShow && !Products.Product_notfound"
      @closepop="poupdetailesShow = false"
    />
  </div>
</template>
<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows:
    150px 150px 150px 100px
    150px 150px 150px 100px
    150px 150px 150px 100px
    150px 150px 150px 100px
    150px 150px 150px 100px
    150px 150px 150px 100px
    150px 150px 150px 100px
    150px 150px 150px 100px
    150px 150px 150px 100px
    150px 150px 150px 100px
    150px 150px 150px 100px
    150px;
  row-gap: 5px;
  column-gap: 5px;
  .product {
    // position: relative;
    img {
      // width: 100%;
      // height: 100%;
      // object-fit: cover;
    }
    .edit {
      // display: none;
      // align-items: top;
      // justify-content: start;
      // z-index: 999;
    }
    &:hover {
      // box-shadow: 0px 0px 10px black;
      cursor: pointer;
      .edit {
        display: flex;
      }
    }
  }
  @media (max-width: 768px) {
    grid-template-rows:
      100px 150px 150px 50px
      100px 150px 150px 50px
      100px 150px 150px 50px
      100px 150px 150px 50px
      100px 150px 150px 50px
      100px 150px 150px 50px
      100px 150px 150px 50px
      100px 150px 150px 50px
      100px 150px 150px 50px
      100px 150px 150px 50px
      100px 150px 150px 50px;
  }
}
.product5 {
  grid-row: 2 / span 2;
  grid-column: 2 / span 2;
}
.product12 {
  grid-row: 6 / span 2;
  grid-column: 1 / span 2;
}
.product23 {
  grid-row: 10 / span 2;
  grid-column: 2 / span 2;
}
.product30 {
  grid-row: 14 / span 2;
  grid-column: 1 / span 2;
}
.product41 {
  grid-row: 18 / span 2;
  grid-column: 2 / span 2;
}
.product48 {
  grid-row: 22 / span 2;
  grid-column: 1 / span 2;
}
.product59 {
  grid-row: 27 / span 2;
  grid-column: 2 / span 2;
}
.product69 {
  grid-row: 30 / span 2;
  grid-column: 1 / span 2;
}
.product77 {
  grid-row: 34 / span 2;
  grid-column: 2 / span 2;
}
.product84 {
  grid-row: 38 / span 2;
  grid-column: 1 / span 2;
}
.product95 {
  grid-row: 42 / span 2;
  grid-column: 2 / span 2;
}
.hidden {
  opacity: 0;
}
</style>
