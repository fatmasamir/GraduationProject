<template>
  <div class="card p-3">
    <div class="grid grid-cols-3 gap-3 w-full">
      <div class="card__image h-48" v-for="i in 125" :key="i">
        <Skeletor class="w-full h-full" />
      </div>
    </div>
  </div>
</template>

<script>
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";

export default {
  name: "App",
  components: {
    Skeletor,
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px; */
}

.card {
  /* width: 360px;
  margin: 0 auto; */
}

.card__image {
  margin-bottom: 12px;
}

.card__slim {
  display: flex;
  margin-bottom: 12px;
}

.card__avatar {
  margin-right: 12px;
}

.card__meta {
  flex-grow: 1;
}

.card__meta p,
.card__meta h2 {
  margin: 0;
}

.card__text {
  margin-bottom: 12px;
}

.card__actions {
  display: flex;
  justify-content: flex-end;
}

.vue-skeletor--pill,
.vue-skeletor--text {
  border-radius: 4px;
}
</style>
