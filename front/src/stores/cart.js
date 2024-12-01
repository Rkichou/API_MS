import { defineStore } from "pinia";
import api from "../config/api";
import { useAuthStore } from './auth';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    loading: false,
  }),

  getters: {
    itemCount: (state) => state.items.length,
    total: (state) => {
      return state.items.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return sum + (price * quantity);
      }, 0);
    },
  },

  actions: {
    async addToCart(product) {
      const authStore = useAuthStore();
      const router = useRouter();
      const toast = useToast();

      if (!authStore.isAuthenticated) {
        toast.info('Please login to add items to cart');
        router.push('/login');
        return;
      }

      try {
        const response = await api.post("/cart/add", {
          user_id: localStorage.getItem("userId"),
          product_id: product._id,
          quantity: 1,
          price: product.price,
          name: product.name,
          image: product.image
        });
        await this.fetchCart();
        return response;
      } catch (error) {
        throw error;
      }
    },

    async fetchCart() {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          this.items = [];
          return;
        }

        this.loading = true;
        const response = await api.get(`/cart/user/${userId}`);
        if (response.data && response.data.cart) {
          this.items = response.data.cart.items.map(item => ({
            ...item,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 0
          }));
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        this.items = [];
      } finally {
        this.loading = false;
      }
    },

    async updateQuantity(productId, quantity) {
      try {
        await api.put("/cart/update", {
          user_id: localStorage.getItem("userId"),
          product_id: productId,
          quantity,
        });
        await this.fetchCart();
      } catch (error) {
        throw error;
      }
    },

    async removeFromCart(productId) {
      try {
        await api.delete("/cart/remove", {
          data: {
            user_id: localStorage.getItem("userId"),
            product_id: productId,
          },
        });
        await this.fetchCart();
      } catch (error) {
        throw error;
      }
    },

    clearCart() {
      this.items = [];
    }
  },
});