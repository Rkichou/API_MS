<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Order Summary -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
        <div class="space-y-4">
          <div v-for="item in cartStore.items" :key="item.product_id" class="flex justify-between">
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="border-t pt-4 font-bold">
            <div class="flex justify-between">
              <span>Total</span>
              <span>${{ cartStore.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Form -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Payment Details</h2>
        <form @submit.prevent="handleCheckout" class="space-y-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {{ loading ? 'Processing...' : 'Proceed to Payment' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useCartStore } from '../stores/cart'
import axios from 'axios'

const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()
const loading = ref(false)

const handleCheckout = async () => {
  try {
    loading.value = true
    const response = await axios.post('http://localhost:3005/cart/checkout/create-session', {
      items: cartStore.items.map(item => ({
        name: item.name,
        price: Math.round(item.price * 100), // Convert to cents for Stripe
        quantity: item.quantity
      }))
    })
    
    // Redirect to Stripe Checkout
    window.location.href = response.data.url
  } catch (error) {
    toast.error('Failed to initiate checkout')
    console.error('Checkout error:', error)
  } finally {
    loading.value = false
  }
}
</script>