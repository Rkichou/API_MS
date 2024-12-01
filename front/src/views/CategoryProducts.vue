<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">{{ categoryTitle }}</h1>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="error" class="text-red-600 text-center">
      {{ error }}
    </div>

    <div v-else-if="products.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-600">No products found in this category</p>
      <router-link to="/products" class="mt-4 inline-block text-blue-600 hover:text-blue-800">
        View all products
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product._id" 
           class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
           @click="navigateToProduct(product._id)">
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
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">${{ formatPrice(product.price) }}</span>
            <div class="space-x-2">
              <button 
                @click.stop="navigateToProduct(product._id)"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                View details
              </button>
              <button 
                @click.stop="addToCart(product)"
                :disabled="cartStore.loading"
                class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50">
                {{ cartStore.loading ? 'Adding...' : 'Add to cart' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCartStore } from '../stores/cart'
import api from '../config/api'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()

const products = ref([])
const loading = ref(false)
const error = ref(null)

const categoryTitle = computed(() => {
  const category = route.params.category
  return category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
})

const formatPrice = (price) => {
  return Number(price).toFixed(2)
}

const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await api.get('/products/liste')
    products.value = response.data.filter(product => {
      const normalizedCategory = product.categorie.toLowerCase().replace(/\s+/g, '-')
      return normalizedCategory === route.params.category.toLowerCase()
    })
  } catch (err) {
    console.error('Error fetching products:', err)
    error.value = 'Error loading products'
    toast.error('Error loading products')
  } finally {
    loading.value = false
  }
}

const addToCart = async (product) => {
  try {
    await cartStore.addToCart(product)
    toast.success('Product added to cart')
  } catch (err) {
    toast.error('Error adding product to cart')
  }
}

const navigateToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

watch(() => route.params.category, () => {
  fetchProducts()
})

onMounted(fetchProducts)
</script>