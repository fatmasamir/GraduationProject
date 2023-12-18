<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import SimpleInput from "@/components/global/CusomInputs/SimpleInput/SimpleInput.vue";
import SimpleButton from "@/components/global/Buttons/simpleButton/SimpleButton.vue";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { defineProps } from "vue";
import AOS from "aos";
import Loading from "../../global/Loading/index.vue";
// i18n
const props = defineProps(["Histories"]);
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
onMounted(() => {
  AOS.init();
  for (let key in props.Histories) {
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
    <h6 class="card-header">History details</h6>
    <div class="card-body" v-if="props.Histories">
      <div
        class="History-Card"
        v-for="(list, index) in props.Histories"
        :key="list.id"
      >
        <div class="history-detailes" v-if="!NumberHistory[index]">
          <div class="content">
            <div class="row mr-2 p-0">
              <div
                class="col-lg-3 image-history"
                v-for="img in list.image"
                :key="img"
              >
                <img :src="img.original_url" class="imag-history" /><span
                  v-if="list.status == 1"
                  class="Accepted"
                  >Accepted</span
                ><span v-if="list.status == 2" class="Rejected">Rejected</span
                ><span v-else class="Pending">Pending</span>
              </div>
              <div class="col-lg-9">
                <h4>{{ list.title }}</h4>
                <p class="my-1">{{ list.description }}</p>
                <span>{{ list.date }}</span>
              </div>
            </div>
          </div>
          <SimpleButton type="send">
            <button @click="MakeFeedback(index)">
              Send feedback
            </button></SimpleButton
          >
        </div>
        <div class="history-detailes-form" v-else>
          <div class="content">
            <form @submit.prevent="onSubmit">
              <div class="row m-0 p-0">
                <div class="col-md-10 m-0 p-0">
                  <SimpleInput>
                    <textarea placeholder="Feedback" :rows="4"></textarea>
                    <span class="send-feedback"> Send feedback </span>
                  </SimpleInput>
                </div>
                <div class="col-md-2 m-0 p-0">
                  <SimpleButton type="send">
                    <button type="submit" @click="MakeFeedback(index)">
                      Back
                    </button></SimpleButton
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
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
      width: 100%;
      .row {
        align-items: center;
      }
      .imag-history {
        height: 178px;
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
    .image-history {
      position: relative;
      .Accepted,
      .Rejected,
      .Pending {
        position: absolute;
        bottom: 10px;
        background: rgba(23, 201, 8, 1);
        padding: 5px;
        left: 20px;
        color: rgba(255, 255, 255, 1);
      }
      .Rejected {
        background: rgba(193, 2, 2, 1);
      }
      .Pending {
        background: rgba(191, 172, 2, 1);
      }
    }
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
