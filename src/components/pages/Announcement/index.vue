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

// handel submit
let onSubmit = () => {
  console.log("hello");
};
let NumberHistory = ref([]);
let MakeFeedback = (index) => {
  console.log("NumberHistory", NumberHistory.value);
  NumberHistory.value[index] = !NumberHistory.value[index];
  console.log("NumberHistory", NumberHistory.value);
};
let data = ref([
  {
    id: 1,
    title: "Title",
    img: new URL(`@/assets/images/image1.png`, import.meta.url).href,
    date: "10/10/2022",
    style: "Accepted",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
  },
  {
    id: 1,
    title: "Title",
    img: new URL(`@/assets/images/image1.png`, import.meta.url).href,
    date: "10/10/2022",
    style: "Rejected",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
  },
  {
    id: 2,
    title: "Title",
    img: new URL(`@/assets/images/image1.png`, import.meta.url).href,
    date: "10/10/2022",
    style: "Pending",
    discription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
  },
]);
onMounted(() => {
  AOS.init();
  for (let key in data) {
    NumberHistory.value.push(false);
  }
  console.log("NumberHistory", NumberHistory.value);
});
</script>
<template>
  <div
    class="card"
    data-aos="fade-in"
    data-aos-easing="linear"
    data-aos-duration="900"
  >
    <h6 class="card-header">Announcement</h6>
    <div class="card-body">
      <div class="History-Card" v-for="(list, index) in data" :key="list.id">
        <div class="history-detailes" v-if="!NumberHistory[index]">
          <div class="content">
            <div class="row mr-2 p-0">
              <div class="col-lg-7 col-12">
                <h4>{{ list.title }}</h4>
                <p class="my-1">{{ list.discription }}</p>
                <span>{{ list.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../Hompage/FormStyling.scss";
.card {
  width: 90%;
  margin-top: 5%;
  padding: 0px;
  hr {
    background: rgba(252, 252, 252, 1);
  }
  .card-body {
    padding: 0px !important;
    .content {
      .imag-history {
        width: 100%;
      }
    }
  }
  .card-header {
    padding: 20px 30px 20px;
    background: white;
    border: 0px;
  }
  .history-detailes {
    display: flex;
    border-top: 5px solid rgba(252, 252, 252, 1);
    padding: 30px 0px;
    padding: 30px 20px;
    justify-content: space-between;
    align-items: center;

    h4 {
      margin: 5px 0px;
    }
    p {
      width: 90%;
    }
    span {
      color: rgba(139, 139, 139, 1);
    }
  }
  .history-detailes-form {
    border-top: 5px solid rgba(252, 252, 252, 1);
    padding: 30px 0px;
    padding: 30px 20px;
    .row {
      display: flex;
      align-items: center;
      button {
        margin-left: auto;
      }
      .simple-input {
        position: relative;
        textarea {
          height: 188px;
        }
        .send-feedback {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: rgba(0, 16, 99, 1);
          font-weight: 600;
          cursor: pointer !important;
        }
      }
    }
  }
}
.simple-button.send button {
  width: max-content;
}
@media screen and (max-width: 993px) {
  .card {
    width: 100%;
    margin-bottom: 100px;
    .simple-button,
    .simple-button button {
      width: 100%;
    }
  }
  .history-detailes {
    flex-direction: column;
  }
}
</style>
