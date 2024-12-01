<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Profil</h1>

    <div class="grid md:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <nav class="space-y-4">
          <button
            @click="currentTab = 'profile'"
            :class="{'bg-blue-100': currentTab === 'profile'}"
            class="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 transition-colors"
          >
            <UserIcon class="inline-block w-5 h-5 mr-2" />
            Informations Personnelles
          </button>
          <button
            @click="currentTab = 'orders'"
            :class="{'bg-blue-100': currentTab === 'orders'}"
            class="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 transition-colors"
          >
            <ShoppingBagIcon class="inline-block w-5 h-5 mr-2" />
            Commandes
          </button>
          <button
            @click="currentTab = 'favorites'"
            :class="{'bg-blue-100': currentTab === 'favorites'}"
            class="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 transition-colors"
          >
            <HeartIcon class="inline-block w-5 h-5 mr-2" />
            Favoris
          </button>
          <button
            @click="currentTab = 'address'"
            :class="{'bg-blue-100': currentTab === 'address'}"
            class="w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 transition-colors"
          >
            <HomeIcon class="inline-block w-5 h-5 mr-2" />
            Adresses
          </button>
          <button
            @click="logout"
            class="w-full text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
          >
            <ArrowRightOnRectangleIcon class="inline-block w-5 h-5 mr-2" />
            Déconnexion
          </button>
        </nav>
      </div>

      <!-- Content Area -->
      <div class="md:col-span-3 bg-white rounded-lg shadow p-6">
        <!-- Personal Information -->
        <div v-if="currentTab === 'profile'" class="space-y-6">
          <h2 class="text-2xl font-semibold">Informations Personnelles</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="mt-1 text-gray-900">{{ userEmail }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Type de compte</label>
              <p class="mt-1 text-gray-900">{{ isAdmin }}</p>
            </div>
          </div>
        </div>

        <!-- Orders -->
        <div v-if="currentTab === 'orders'" class="space-y-6">
          <h2 class="text-2xl font-semibold">Commandes</h2>
          <div v-if="loading" class="text-center">Chargement...</div>
          <div v-else>
            <div v-for="order in orders" :key="order.id" class="border rounded-lg p-4 mb-4">
              <h3 class="text-lg font-semibold">Commande #{{ order.id }}</h3>
              <p>Date: {{ order.date }}</p>
              <p>Statut: {{ order.status }}</p>
              <p>Total: {{ order.total }}€</p>
            </div>
          </div>
        </div>

        <!-- Favorites -->
        <div v-if="currentTab === 'favorites'" class="space-y-6">
          <h2 class="text-2xl font-semibold">Favoris</h2>
          <!-- Afficher les favoris ici -->
        </div>

        <!-- Addresses -->
        <div v-if="currentTab === 'address'" class="space-y-6">
          <h2 class="text-2xl font-semibold">Adresses</h2>
          <!-- Afficher les adresses ici -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'
import api from '../config/api'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const currentTab = ref('profile')
const loading = ref(false)
const userEmail = ref('')
const isAdmin = ref(false)
const orders = ref([])

const fetchUserProfile = async () => {
  try {
    loading.value = true
    const userId = localStorage.getItem('userId')
    if (!userId) return

    const response = await api.get(`api/users/${userId}`)
    const user = response.data
    userEmail.value = user.email
    isAdmin.value = user.isAdmin
  } catch (error) {
    toast.error('Erreur lors du chargement du profil')
  } finally {
    loading.value = false
  }
}

const fetchOrders = async () => {
  try {
    loading.value = true
    const userId = localStorage.getItem('userId')
    if (!userId) return

    const response = await api.get(`api/orders/${userId}`)
    orders.value = response.data
  } catch (error) {
    toast.error('Erreur lors du chargement des commandes')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const userId = localStorage.getItem('userId')
  if (!userId) {
    router.push('/login')
    return
  }

  try {
    await fetchUserProfile()
    if (currentTab.value === 'orders') {
      await fetchOrders()
    }
  } catch (error) {
    toast.error('Erreur lors du chargement du profil')
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>