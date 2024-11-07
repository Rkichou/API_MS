<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <h1>Liste de nos produits</h1>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.card {
  font-size: 400;
}
</style>
