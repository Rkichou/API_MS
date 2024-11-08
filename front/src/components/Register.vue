<script>
import Products from "./Products.vue";
import router from "../router";
export default {
  props: [
    "setIsLoggedIn",
    "setToken",
    "setUserId",
    "setIsLoggedIn",
    "setToken",
    "setUserId",
  ],

  data() {
    return {
      email: "",
      password: "",
      isAdmin: "false",
    };
  },
  methods: {
    async handleSubmitRegister() {
      console.log("Email:", this.email);
      console.log("Mot de passe:", this.password);
      console.log("IsAdmin", this.isAdmin);
      console.log("Compte créé");

      try {
        const response = await fetch("http://localhost:3001/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            isAdmin: this.isAdmin,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          this.setIsLoggedIn(true);
          this.setToken(data.token);
          localStorage.setItem("token", data.token);
          this.setUserId(data.userId);
          localStorage.setItem("userId", data.userId);

          this.$router.push("/products");
        } else {
          alert(data.msg);
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        alert("Erreur lors de l'inscription.");
      }
    },
  },
};
</script>

<template>
<<<<<<< HEAD
  <section class="landing_page">
    <img src="../assets/img/background.jpg" alt="background">
    <div class="navbar">
      <img src="../assets/img/logo.png" alt="logo">
      <h1>GraphiXHub</h1>
=======
  <div class="container">
    <h1 class="page-title">Register</h1>
    <div class="login-card">
      <h2>Création de compte</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="registerEmail">Email</label>
          <input
            type="email"
            id="registerEmail"
            required
            placeholder="Entrez votre email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="registerPassword">Mot de passe</label>
          <input
            type="password"
            id="registerPassword"
            required
            placeholder="Entrez votre mot de passe"
            v-model="password"
          />
        </div>
        <div class="form-group">
          <label for="checkbox"
            >IsAdmin
            <input type="checkbox" id="checkbox" v-model="checked" />
          </label>
        </div>
        <button
          type="button"
          @click.prevent="handleSubmitRegister()"
          class="login-button"
        >
          Créer votre compte
        </button>
      </form>
>>>>>>> refs/remotes/origin/front
    </div>
    <div class="container">
      <div class="login-card">
        <button class="icon-button">
          <i class="fi fi-ss-enter"></i> 
        </button>
        <h2>Création de compte</h2>
        <h5>Embarquez vous dans l'univers du gaming haute performance !</h5>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="registerEmail"></label>
            <input type="email" id="registerEmail" required placeholder="Email" v-model="email" />
            <i class="fi fi-ss-envelope"></i>
          </div>
          <div class="form-group">
            <label for="registerPassword"></label>
            <input type="password" id="registerPassword" required placeholder="Mot de passe" v-model="password" />
            <i class="fi fi-ss-lock"></i>
          </div>
          <div class="form-group">
            <label for="checkbox">IsAdmin
              <input type="checkbox" id="checkbox" v-model="checked" />
            </label>
          </div>
          <button type="button" @click.prevent="handleSubmitRegister()" class="login-button">
            Créer votre compte
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-straight/css/uicons-solid-straight.css');
@import url('https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-straight/css/uicons-solid-straight.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
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
<<<<<<< HEAD
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 30px;
  height: 500px;
  max-width: 400px;
  width: 100%;
=======
  background-color: #000000;
  height: 100%;
  width: 100%;
  padding: 2em;
  position: relative;
  left: 55px;
}

.login-page {
  background-color: #f0f4f8;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  height: auto;
  width: 100%;
  padding: 1em;
}

.login-card {
  background-color: #ffffff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 10px 40px 3px rgba(0, 0, 0, 0.1);
>>>>>>> refs/remotes/origin/front
  text-align: center;
  z-index: 1;
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
  margin-top: 15px;
  margin-bottom: 30px;
  transform: rotate(180deg);
  font-size: 35px;
}


.login-card h2 {
  margin-bottom: 10px;
  font-weight: 500;
}

.login-card h5 {
  margin-bottom: 25px;
  font-weight: 400;
  color: grey;
  padding: auto;
}

.form-group {
  margin-bottom: 25px;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: 13px;
  padding-left: 30px;
  border: none;
  background-color: #f0f2f5;
  border-radius: 15px;
}

.form-group i {
  font-size: 12px; 
  margin-left: -350px; 
  color: #777;
  padding: auto;
  display: flex;
  justify-content: center;
  align-items: center;
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
  z-index: -2;
}

.navbar h1 {
  font-size: 18px;
  padding-left: 50px;
  color: #fff;
}

.navbar img {
  width: 80px;
}
</style>
