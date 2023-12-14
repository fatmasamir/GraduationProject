<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import SimpleInput from "@/components/global/CusomInputs/SimpleInput/SimpleInput.vue";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import AOS from "aos";

// i18n
const { t } = useI18n();

// formRef
const formRef = ref(null);

// meta
const { meta } = useForm();

// formLogin
const { errors, handleSubmit, defineInputBinds } = useForm({
  validationSchema: Yup.object({
    name: Yup.string().required(),
    phone: Yup.string().required(),
    message: Yup.string().min(6).required(),
  }),
});

//message ,name,phone
const name = defineInputBinds("name");
const phone = defineInputBinds("phone");
const message = defineInputBinds("message");
const image = ref();
const imageUrl = ref();
const imageName = ref();
const error = ref(false);

// fileSelected
let fileSelected = (event) => {
  const file = event.target.files.item(0);
  image.value = file;
  const reader = new FileReader();
  error.value = false;
  reader.addEventListener("load", imageLoaded);
  reader.readAsDataURL(file);
};
let imageLoaded = (event) => {
  imageUrl.value = event.target.result;
  imageName.value = image.value.name;
};
// handel submit
let onSubmit = handleSubmit((values: any) => {
  error.value = false;
  if (image.value) {
    let formdata = new FormData();
    let data = {
      name: values.name,
      phone: values.phone,
      message: values.message,
      image: image.value,
    };
    for (let key in data) {
      formdata.append(key, data[key]);
    }
    console.log("formdata =", formdata);
  } else {
    error.value = true;
  }
});

onMounted(() => {
  AOS.init();
});
</script>
<template>
  <div
    class="card"
    data-aos="fade-in"
    data-aos-easing="linear"
    data-aos-duration="900"
  >
    <div class="card-body">
      <h6>Fill in your data so we can help you</h6>
      <form @submit.prevent="onSubmit">
        <div class="row mt-4">
          <div class="col-md-6">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                type="text"
                id="name"
                name="name"
                v-bind="name"
                placeholder="Name"
                :class="{ 'is-invalid': errors.name }"
              />

              <div class="invalid-feedback">{{ errors.name }}</div>
            </SimpleInput>
          </div>
          <div class="col-md-6">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <input
                type="tel"
                id="phone"
                name="phone"
                v-bind="phone"
                placeholder="phone"
                :class="{ 'is-invalid': errors.phone }"
              />

              <div class="invalid-feedback">{{ errors.phone }}</div>
            </SimpleInput>
          </div>
          <div class="col-10 upload_content">
            <p v-if="imageName">{{ imageName }}</p>
            <p v-else>Upload your problem images</p>
            <div class="invalid-feedback" v-if="error">
              Upload your problem images is a required field
            </div>
          </div>
          <div class="col-2 upload_icon">
            <img src="@/assets/images/export.svg" />
            <input
              type="file"
              accept="image/*"
              @change="fileSelected"
              class="imgfileType"
            />
          </div>
          <div class="col-md-12 mt-3">
            <SimpleInput>
              <!-- <label>Email <span class="text-red">*</span> </label> -->
              <textarea
                type="message"
                id="message"
                name="message"
                v-bind="message"
                placeholder="message"
                :class="{ 'is-invalid': errors.message }"
              ></textarea>

              <div class="invalid-feedback">{{ errors.message }}</div>
            </SimpleInput>
          </div>
          <div class="col-12 mt-3">
            <SimpleButton type="send" class="register_lab">
              <button type="submit">
                {{ t("Send") }}
              </button>
              <!-- <button type="submit" disabled v-else>
                {{ t("wait") }}
              </button> -->
            </SimpleButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "./FormStyling.scss";
.card {
  width: 70%;
  margin-top: 5%;
}
.simple-button.send button {
  width: max-content;
}
@media screen and (max-width: 993px) {
  .card {
    width: 100%;
  }
}
</style>
