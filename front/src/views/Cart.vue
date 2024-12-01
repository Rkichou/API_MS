<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

    <div v-if="cartStore.loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="cartStore.items.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-600">Your cart is empty</p>
      <router-link to="/products" class="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
        Browse Products
      </router-link>
    </div>

    <div v-else>
      <div class="space-y-4">
        <div v-for="item in cartItems" :key="item.product_id" 
             class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <div class="flex items-center space-x-4">
            <img :src="item.image || '/src/assets/p3.jpeg'" :alt="item.name" class="w-16 h-16 object-cover rounded"/>
            <div>
              <h3 class="font-semibold">{{ item.name || 'Product' }}</h3>
              <p class="text-gray-600">${{ formatPrice(item.price) }}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <button @click="updateQuantity(item, -1)" 
                      class="p-1 rounded-full hover:bg-gray-100">
                <MinusIcon class="h-5 w-5"/>
              </button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item, 1)"
                      class="p-1 rounded-full hover:bg-gray-100">
                <PlusIcon class="h-5 w-5"/>
              </button>
            </div>
            <button @click="removeItem(item)" 
                    class="text-red-600 hover:text-red-800">
              <TrashIcon class="h-5 w-5"/>
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8 bg-white p-6 rounded-lg shadow">
        <div class="flex justify-between text-xl font-semibold mb-4">
          <span>Total:</span>
          <span>${{ formatPrice(cartTotal) }}</span>
        </div>
        <router-link to="/checkout" 
                     class="w-full block text-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Proceed to Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '../stores/cart'
import { useToast } from 'vue-toastification'

const cartStore = useCartStore()
const toast = useToast()

const cartItems = computed(() => cartStore.items)
const cartTotal = computed(() => cartStore.total)

const formatPrice = (price) => {
  return Number(price).toFixed(2)
}

const updateQuantity = async (item, change) => {
  try {
    const newQuantity = item.quantity + change
    if (newQuantity < 1) return
    
    await cartStore.updateQuantity(item.product_id, newQuantity)
    toast.success('Cart updated')
  } catch (error) {
    toast.error('Failed to update quantity')
  }
}

const removeItem = async (item) => {
  try {
    await cartStore.removeFromCart(item.product_id)
    toast.success('Item removed from cart')
  } catch (error) {
    toast.error('Failed to remove item')
  }
}

onMounted(() => {
  cartStore.fetchCart()
})
</script>