<template>
  <section class="product-list">
    <h1>Liste de nos produits</h1>
    <p v-if="isLoading">Chargement des produits...</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <div class="products-container">
      <div
        v-for="product in products"
        :key="product._id"
        class="product-card"
      >
        <div class="card-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="card-content">
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">{{ product.price.toFixed(2) }} €</p>
          <button class="view-more">Voir Plus</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from "vue";

const products = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3005/products/liste/");
    if (!response.ok) throw new Error("Failed to fetch products.");
    const data = await response.json();
    products.value = data;
    isLoading.value = false;
  } catch (error) {
    errorMessage.value = error.message || "An unexpected error occurred.";
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* General styling */
.product-list {
  padding: 2rem;
  text-align: center;
  background-color: #f9f9f9;
}

.product-list h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.error {
  color: red;
  font-size: 1.2rem;
}

/* Product card styling */
.product-card {
  width: 300px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}

.card-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.product-name {
  font-size: 1.5rem;
  color: #333;
  margin: 0.5rem 0;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
}

.product-price {
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
  margin: 0.5rem 0;
}

.view-more {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.view-more:hover {
  background-color: #0056b3;
}
</style>
