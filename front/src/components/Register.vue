<template>
  <section class="landing-page">
    <img
      src="../assets/img/background.jpg"
      alt="background"
      class="background-image"
    />
    
    <div class="container">
      <div class="login-card">
        <button class="icon-button">
          <i class="fi fi-ss-enter"></i>
        </button>
        <h2>Création de compte</h2>
        <h5>Embarquez vous dans l'univers du gaming haute performance !</h5>
        <form @submit.prevent="handleSubmitRegister">
          <div class="form-group">
            <i class="fi fi-ss-envelope"></i>
            <input
              type="email"
              id="registerEmail"
              required
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <i class="fi fi-ss-lock"></i>
            <input
              type="password"
              id="registerPassword"
              required
              placeholder="Mot de passe"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <label for="checkbox">IsAdmin</label>
            <input type="checkbox" id="checkbox" v-model="isAdmin" />
          </div>
          <button type="submit" class="login-button">Créer votre compte</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["setIsLoggedIn", "setToken", "setUserId"],

  data() {
    return {
      email: "",
      password: "",
      isAdmin: false,
    };
  },
  methods: {
    async handleSubmitRegister() {
      console.log("Email:", this.email);
      console.log("Mot de passe:", this.password);
      console.log("IsAdmin:", this.isAdmin);

      try {
        const response = await fetch("http://localhost:3005/users/register", {
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
          console.log("Compte créé avec succès:", data);

          // Update parent props or local storage for authentication
        
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);

          // Redirect to the products page
          this.$router.push("/");
        } else {
          alert(data.msg || "Erreur lors de l'inscription.");
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        alert("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-straight/css/uicons-solid-straight.css");

/* General Styles */
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

.landing-page {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* Navbar Styles */
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
  padding-left: 50px;
  color: #fff;
}

.navbar .logo {
  width: 80px;
}

/* Form Container */
.container {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  z-index: 1;
}

.login-card {
  background-color: #ffffff;
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
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
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
}

/* Input Fields */
.form-group {
  margin-bottom: 25px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  background-color: #f0f2f5;
}

.form-group input[type="email"],
.form-group input[type="password"] {
  width: 100%;
  padding: 13px;
  padding-left: 40px;
  border: none;
  background-color: transparent;
  outline: none;
}

.form-group i {
  position: absolute;
  left: 10px;
  font-size: 16px;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Submit Button */
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

.login-button:hover {
  background-color: #41434e;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .login-card {
    padding: 1em;
  }

  .icon-button {
    font-size: 25px;
    padding: 5px 10px;
  }

  .login-button {
    padding: 8px;
    font-size: 14px;
  }
}
</style>
