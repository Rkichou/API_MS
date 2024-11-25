<template>
  <div>
  <Header />

  <main>
    <RouterView />
  </main>

  <Footer />
</div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style >
body {
  margin: 0;
  padding: 0;
  width: 98.9vw; /* Définit la largeur du body à celle de la fenêtre */

}
</style>
