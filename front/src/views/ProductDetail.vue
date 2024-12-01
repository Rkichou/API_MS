<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="text-red-600 text-center">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Details -->
      <div class="space-y-6">
        <img :src="product.image" :alt="product.name" class="w-full h-96 object-cover rounded-lg shadow-lg"/>
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
          <p class="mt-2 text-gray-600">{{ product.description }}</p>
          <div class="mt-4">
            <span class="text-2xl font-bold text-gray-900">${{ product.price }}</span>
            <span v-if="product.disponibilite" class="ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              En stock
            </span>
            <span v-else class="ml-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              Rupture de stock
            </span>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="tag in product.tags" :key="tag" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {{ tag }}
            </span>
          </div>
          <button 
            @click="addToCart"
            :disabled="!product.disponibilite || cartStore.loading"
            class="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ cartStore.loading ? 'Ajout en cours...' : 'Ajouter au panier' }}
          </button>
        </div>
      </div>

      <!-- Recommendations -->
      <div v-if="recommendations.length > 0" class="space-y-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Produits recommandés</h2>
        <div class="grid gap-6">
          <div v-for="rec in recommendations" :key="rec._id" 
               class="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
               @click="navigateToProduct(rec._id)">
            <img :src="rec.image" :alt="rec.name" class="w-full sm:w-24 h-24 object-cover rounded"/>
            <div class="flex-1">
              <h3 class="font-semibold text-lg">{{ rec.name }}</h3>
              <p class="text-gray-600 text-sm line-clamp-2">{{ rec.description }}</p>
              <div class="mt-2 flex items-center justify-between">
                <span class="font-bold">${{ rec.price }}</span>
                <button 
                  @click.stop="addToCartRecommendation(rec)"
                  :disabled="cartStore.loading"
                  class="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {{ cartStore.loading ? 'Ajout...' : 'Ajouter au panier' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-600">
        Aucune recommandation disponible pour ce produit
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()
const authStore = useAuthStore()

const product = ref(null)
const recommendations = ref([])
const loading = ref(true)
const error = ref(null)

const fetchProduct = async () => {
  try {
    loading.value = true
    const response = await axios.get(`http://localhost:3005/products/liste/${route.params.id}`)
    product.value = response.data.product

    if (response.data.recommendations) {
      recommendations.value = response.data.recommendations.filter(
        rec => rec.categorie !== product.value.categorie
      )
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement du produit'
    toast.error('Erreur lors du chargement du produit')
  } finally {
    loading.value = false
  }
}

const addToCart = async () => {
  if (!authStore.isAuthenticated) {
    toast.info('Veuillez vous connecter pour ajouter des produits au panier')
    router.push('/login')
    return
  }

  try {
    await cartStore.addToCart(product.value)
    toast.success('Produit ajouté au panier')
  } catch (err) {
    toast.error('Erreur lors de l\'ajout au panier')
  }
}

const addToCartRecommendation = async (rec) => {
  if (!authStore.isAuthenticated) {
    toast.info('Veuillez vous connecter pour ajouter des produits au panier')
    router.push('/login')
    return
  }

  try {
    await cartStore.addToCart(rec)
    toast.success('Produit ajouté au panier')
  } catch (err) {
    toast.error('Erreur lors de l\'ajout au panier')
  }
}

const navigateToProduct = (productId) => {
  if (productId === route.params.id) return
  router.push(`/product/${productId}`)
}

onMounted(fetchProduct)
</script>