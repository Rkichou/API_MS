<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">Login</h1>
    
    <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md">
      <div class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </div>

      <div class="mt-4 text-center">
        <router-link to="/register" class="text-sm text-blue-600 hover:text-blue-500">
          Don't have an account? Register
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  try {
    loading.value = true
    await authStore.login({
      email: email.value,
      password: password.value
    })
    toast.success('Login successful')
    router.push('/')
  } catch (error) {
    toast.error(error.response?.data?.msg || 'Login failed')
  } finally {
    loading.value = false
  }
}
</script>