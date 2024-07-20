<script setup>
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { UseProducts } from "@/stores/products/index";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const Products = UseProducts();
</script>
<template>
  <div class="popup-edit fixed z-50 top-0 left-0 w-full h-full bg-bgPopup">
    <div
      class="card w-2/5 h-6/6 bg-bgwhite overflow-y-auto my-7 mx-auto p-3"
      v-if="Products.Product"
    >
      <div
        class="header-info flex flex-column-reverse justify-between items-center"
      >
        <div class="info flex justify-start items-center gap-3">
          <img
            :src="Products.Product.seller.user.avatar_url"
            class="w-10 h-10 rounded-full"
          />
          <div>
            <h6 class="m-0">{{ Products.Product.seller.en_name }}</h6>
            <p class="m-0 text-xs">{{ Products.Product.seller.en_name }}</p>
          </div>
        </div>
        <div @click="$emit('closepop')">
          <img
            src="@/assets/images/close-svgrepo-com.svg"
            class="w-5 h-5 rounded-full cursor-pointer"
          />
        </div>
      </div>
      <div class="body-info">
        <div class="img-pro my-1">
          <img :src="Products.Product.sellerProduct.image.url" />
        </div>
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="50"
          :pagination="{ clickable: true }"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          id="mySlider"
        >
          <swiper-slide
            class="h-80"
            v-for="pimage in Products.Product.sellerProduct.image"
            :key="pimage"
            ><img :src="pimage.url" class="h-full w-full"
          /></swiper-slide>
        </swiper>
        <div class="information_product" style="direction: rtl">
          <ul class="breadcrump flex justify-start items-center mt-3 gap-2">
            <li v-for="parent in Products.Product.parents" :key="parent">
              {{ parent.ar_name }} <span class="text-second">></span>
            </li>
          </ul>
          <p
            class="mt-3"
            v-html="Products.Product.sellerProduct.ar_description"
          ></p>
          <h5 class="mt-3">إسم المنتج</h5>
          <p class="tex-subColor">
            {{ Products.Product.sellerProduct.prod.ar_name }}
          </p>
        </div>
      </div>
      <!-- <pre> {{ Products.Product }}</pre> -->
    </div>
    <div
      class="card w-2/5 h-5/6 bg-bgwhite overflow-y-auto my-7 mx-auto p-3"
      @click="$emit('closepop')"
      v-else
    >
      <p class="m-auto w-full tex-second text-center mt-64">Lodding ...</p>
    </div>
  </div>
</template>
<style scoped lang="scss">
.popup-edit {
  .card {
    @media (max-width: 768px) {
      width: 95%;
    }
  }
}
.breadcrump {
  li:last-child span {
    display: none;
  }
}
</style>
