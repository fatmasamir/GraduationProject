import callServer from "@/assets/scripts/callServer/callServer";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();
export const UseProducts = defineStore("Products", () => {
  const Products = ref({});
  const Product = ref({});
  const keyofpro = ref(0);
  const next_page_url = ref("");
  // is_loading
  const is_loading = ref<Boolean>(false);
  const Product_notfound = ref<Boolean>(false);

  //Get new_username
  async function get_products(page) {
    if (keyofpro.value == 0) {
      is_loading.value = true;
    }
    const response = await callServer({
      url: `website/seller-prods/getall?page=${page}`,
      auth: true,
    });
    if (response.ok) {
      await response.json().then(async (data: { token: string }) => {
        Products.value[keyofpro.value] = data.data.products.data;
        keyofpro.value = keyofpro.value + 1;
        next_page_url.value = data.data.products.next_page_url;
      });
      console.log(Products.value);
      is_loading.value = false;
    } else {
      await response.json().then((data) => {
        toast.error(data.errors);
      });
      is_loading.value = false;
    }
  }
  async function getProductInfo(id) {
    Product.value = "";
    Product_notfound.value = false;
    const response = await callServer({
      url: `seller/products/${id}/get`,
      auth: true,
    });
    if (response.ok) {
      await response.json().then(async (data: { token: string }) => {
        Product.value = data.data;
      });
    } else {
      await response.json().then((data) => {
        toast.error(data.ar_message);
        Product_notfound.value = true;
      });
    }
  }
  return {
    Products,
    get_products,
    is_loading,
    getProductInfo,
    Product,
    Product_notfound,
  };
});
