<template>
  <div class="max-w-md mx-auto">
    <h1 class="text-3xl font-bold text-center mb-8">Register</h1>
    
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

        <div class="flex items-center">
          <input
            id="isAdmin"
            v-model="isAdmin"
            type="checkbox"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="isAdmin" class="ml-2 block text-sm text-gray-900">
            Register as Admin
          </label>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ loading ? 'Creating account...' : 'Register' }}
        </button>
      </div>

      <div class="mt-4 text-center">
        <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-500">
          Already have an account? Login
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
const isAdmin = ref(false)
const loading = ref(false)

const handleSubmit = async () => {
  try {
    loading.value = true
    await authStore.register({
      email: email.value,
      password: password.value,
      isAdmin: isAdmin.value
    })
    toast.success('Registration successful')
    router.push('/')
  } catch (error) {
    toast.error(error.response?.data?.msg || 'Registration failed')
  } finally {
    loading.value = false
  }
}
</script>