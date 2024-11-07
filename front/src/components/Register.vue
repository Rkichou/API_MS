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
  <div class="container">
    <h1 class="page-title">Ecommerce</h1>
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
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
}

.container {
  background-color: #69c3fa;
  height: 100%;
  width: 100%;
  padding: 2em;
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
  text-align: center;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 1em;
}

.form-group {
  margin-bottom: 1.5em;
  text-align: left;
}

label {
  color: #555;
  font-weight: bold;
  margin-bottom: 0.5em;
  display: block;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #000000;
  border-radius: 8px;
  background-color: #000000;
  font-size: 16px;
  transition: border-color 0.3s;
}

.login-button {
  width: 100%;
  padding: 0.75em;
  font-size: 16px;
  background-color: #69c3fa;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
}

.login-button:hover {
  background-color: #4338ca;
}

/* Styles responsives */
@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }

  .login-page {
    flex-direction: column;
    align-items: center;
  }

  .login-card {
    width: 90%;
    max-width: 400px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 20px;
  }

  .login-card {
    padding: 1.5em;
  }

  h2 {
    font-size: 20px;
  }

  .login-button {
    font-size: 14px;
  }
}
</style>
