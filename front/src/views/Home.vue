<template>
  <div class="space-y-12">
    <section class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to GRAPHIXHUB</h1>
      <p class="text-xl text-gray-600 mb-8">Your Ultimate Destination for High-Performance Computing</p>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div v-for="(category, index) in categories" :key="index" 
           class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <img :src="category.image" :alt="category.title" class="w-full h-48 object-cover"/>
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">{{ category.title }}</h3>
          <p class="text-gray-600 mb-4">{{ category.description }}</p>
          <router-link 
            :to="category.link" 
            class="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Browse {{ category.title }}
          </router-link>
        </div>
      </div>
    </div>

    <section class="text-center py-12 bg-gray-50">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Why Choose GRAPHIXHUB?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
        <div v-for="(feature, index) in features" :key="index" class="p-6">
          <div class="text-blue-600 mb-4">
            <component :is="feature.icon" class="h-8 w-8 mx-auto"/>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ShieldCheckIcon, TruckIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'

const categories = ref([
  {
    title: 'Graphics Cards',
    description: 'High-performance GPUs for gaming and professional work',
    image: '/src/assets/p3.jpeg',
    link: '/category/graphic-card'
  },
  {
    title: 'Processors',
    description: 'Powerful CPUs for ultimate computing performance',
    image: '/src/assets/p5.jpeg',
    link: '/category/processor'
  },
  {
    title: 'Pre-built PCs',
    description: 'Custom-built gaming and workstation computers',
    image: '/src/assets/p4.jpeg',
    link: '/category/prebuild'
  }
])

const features = ref([
  {
    icon: ShieldCheckIcon,
    title: 'Quality Guaranteed',
    description: 'All products are genuine and come with manufacturer warranty'
  },
  {
    icon: TruckIcon,
    title: 'Fast Shipping',
    description: 'Quick and secure delivery to your doorstep'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Best Prices',
    description: 'Competitive prices and regular special offers'
  }
])
</script>