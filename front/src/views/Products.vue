<template>
  <div class="px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Nos Produits</h1>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="text-red-600 text-center">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product._id" 
           class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover"/>
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
          <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tag in product.tags" :key="tag" 
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {{ tag }}
            </span>
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span class="text-lg font-bold">${{ formatPrice(product.price) }}</span>
            <div class="flex flex-wrap gap-2 justify-center sm:justify-end">
              <button 
                @click="navigateToProduct(product._id)"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full sm:w-auto">
                Voir détails
              </button>
              <button 
                @click="addToCart(product)"
                :disabled="cartStore.loading"
                class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50 w-full sm:w-auto">
                {{ cartStore.loading ? 'Ajout...' : 'Ajouter' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()
const authStore = useAuthStore()

const products = ref([])
const loading = ref(false)
const error = ref(null)

const formatPrice = (price) => {
  return Number(price).toFixed(2)
}

const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:3005/products/liste')
    products.value = response.data
  } catch (err) {
    error.value = 'Erreur lors du chargement des produits'
    toast.error('Erreur lors du chargement des produits')
  } finally {
    loading.value = false
  }
}

const addToCart = async (product) => {
  if (!authStore.isAuthenticated) {
    toast.info('Veuillez vous connecter pour ajouter des produits au panier')
    router.push('/login')
    return
  }

  try {
    await cartStore.addToCart(product)
    toast.success('Produit ajouté au panier')
  } catch (err) {
    toast.error('Erreur lors de l\'ajout au panier')
  }
}

const navigateToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

onMounted(fetchProducts)
</script>