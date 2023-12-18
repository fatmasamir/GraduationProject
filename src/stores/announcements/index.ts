import callServer from "@/assets/scripts/callServer/callServer";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../auth/index";
const toast = useToast();
export const UseProfile = defineStore("Profile", () => {
  const Profile = ref([]);
  // is_waiting
  const is_waiting = ref<Boolean>(false);
  const is_loading = ref<Boolean>(false);

  //Get new_username
  async function get_new_username(data) {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/profile/change-username",
      method: "POST",
      auth: true,
      data,
    });
    if (response.ok) {
      console.log(JSON.parse(data));
      const Usernew = JSON.parse(localStorage.getItem("user"));
      Usernew.name = JSON.parse(data).new_username;
      console.log("User =", Usernew);
      localStorage.setItem("user", JSON.stringify(Usernew));
      toast.success("Successfully Change Name Profile... ");
      is_loading.value = false;
      is_waiting.value = false;
    } else {
      await response.json().then((data) => {
        toast.error(data.message);
      });
      is_loading.value = false;
      is_waiting.value = false;
    }
  }
  //Get change_password
  async function get_change_password(data) {
    is_loading.value = true;
    is_waiting.value = true;
    const response = await callServer({
      url: "api/profile/change-password",
      method: "POST",
      auth: true,
      data,
    });
    if (response.ok) {
      console.log(JSON.parse(data));
      const Usernew = JSON.parse(localStorage.getItem("user"));
      toast.success("Successfully Change Password... ");
      is_loading.value = false;
      is_waiting.value = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.router.push("/login");
    } else {
      await response.json().then((data) => {
        toast.error(data.message);
      });
      is_loading.value = false;
      is_waiting.value = false;
    }
  }
  return {
    get_new_username,
    get_change_password,
    is_loading,
  };
});
