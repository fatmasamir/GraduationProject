import callServer from "@/assets/scripts/callServer/callServer";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();
export const UseHistory = defineStore("History", () => {
  const Histories = ref([]);
  // is_waiting
  const is_waiting = ref<Boolean>(false);
  const is_loading = ref<Boolean>(false);

  //Get new_username
  async function get_history() {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/history",
      auth: true,
    });
    console.log(response);
    if (response.ok) {
      await response.json().then(async (data: { token: string }) => {
        Histories.value = data.data;
        console.log("Useissues=", Histories.value);
      });
    } else {
      await response.json().then((data) => {
        toast.error(data.message);
      });
      is_loading.value = false;
      is_waiting.value = false;
    }
  }
  return {
    get_history,
    Histories,
    is_loading,
    is_waiting,
  };
});
