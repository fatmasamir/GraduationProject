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
  const is_loadingMakeFeedback = ref<Boolean>(false);

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
        toast.error(data.errors);
      });
      is_loading.value = false;
      is_waiting.value = false;
    }
  }
  //set MakeFeedback
  async function MakeFeedback(id, data) {
    is_loadingMakeFeedback.value = true;
    const response = await callServer({
      url: "api/issue/" + id + "/feedback",
      method: "POST",
      auth: true,
      data,
    });
    if (response.ok) {
      await toast.success("Successfully Change Password... ");
      is_loadingMakeFeedback.value = false;
      // this.router.push("/login");
    } else {
      toast.error("Error");
      is_loadingMakeFeedback.value = false;
    }
  }
  return {
    get_history,
    MakeFeedback,
    Histories,
    is_loading,
    is_waiting,
    is_loadingMakeFeedback,
  };
});
