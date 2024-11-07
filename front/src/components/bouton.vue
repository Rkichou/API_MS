<template>
  <div class="cart">
    <div class="cart-header">
      <!-- Utilisation de router-link pour rediriger vers login et register -->
      <router-link to="/login" class="btn-login">Login</router-link>
      <router-link to="/register" class="btn-register">Register</router-link>
    </div>
  </div>
</template>

<style scoop>
.cart {
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  flex-direction: row;
}
.cart-header {
  padding: 30px;
}

.btn-login,
.btn-register {
  background-color: #4caf50;
}
</style>
