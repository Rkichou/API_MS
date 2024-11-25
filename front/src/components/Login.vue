<script>
import { useRouter } from "vue-router";

export default {
  props: [ "setToken", "setUserId"],

  data() {
    return {
      email: "",
      password: "",
      baseURL: "http://localhost:3005", // Adjust based on your API Gateway
    };
  },

  methods: {
    async handleSubmitLogin() {
      console.log("Attempting to log in with email:", this.email);

      try {
        const response = await fetch(`${this.baseURL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful:", data);
          alert("Connexion réussie !");
          
          // Update app state with login data
          localStorage.setItem("token", data.token);
          alert(`Token: ${data.token}`);
          localStorage.setItem("userId", data.userId);

          // Navigate to the products page
          this.$router.push("/");
        } else {
          // Handle specific error messages from the API
          console.error("Login error:", data.msg);
          alert(`Erreur: ${data.msg}`);
        }
      } catch (error) {
        console.error("Erreur réseau lors de la connexion:", error);
        alert("Erreur réseau. Veuillez réessayer plus tard.");
      }
    },
  },
};
</script>


<template>
  <section class="landing_page">
    <img src="../assets/img/background.jpg" alt="background" />
    
    <div class="container">
      <div class="login-card">
        <div class="login-page">
          <h2>Connexion</h2>
          <h5>Embarquez-vous dans l'univers du gaming haute performance !</h5>
          <form @submit.prevent="handleSubmitLogin">
            <div class="form-group">
              <label for="email"></label>
              <input
                type="email"
                id="email"
                required
                placeholder="Email"
                v-model="email"
                value="newuser@example.com"
              />
              <i class="fi fi-ss-envelope"></i>
            </div>
            <div class="form-group">
              <label for="password"></label>
              <input
                type="password"
                id="password"
                required
                placeholder="Mot de passe"
                v-model="password"
                value="password123"
              />
              <i class="fi fi-ss-lock"></i>
            </div>
            <button class="login-button" type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-straight/css/uicons-solid-straight.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

body,
html {
  height: 100%;
}

.landing_page {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.landing_page img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
}

.container {
  position: relative;
  background-color: #000;
  padding: 2em;
  border-radius: 30px;
  max-width: 400px;
  width: 100%;
  margin: auto;
}

.login-page {
  background-color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.login-card {
  background-color: #fff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.icon-button {
  background-color: #fff;
  color: black;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin: 15px 0 30px;
  font-size: 35px;
}

.icon-button .text {
  text-decoration: none;
  color: black;
  padding: 5px;
}

.form-group {
  position: relative;
  margin-bottom: 25px;
  width: 100%;
}

.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: 13px;
  padding-left: 40px;
  border: none;
  background-color: #f0f2f5;
  border-radius: 15px;
}

.form-group i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #777;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #2b2c36;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  z-index: 1;
}

.navbar h1 {
  font-size: 18px;
  color: #fff;
}

.navbar img {
  width: 80px;
}
</style>
