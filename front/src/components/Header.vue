<template>
    <header style="background: #191d38;">
      <nav class="navbar">
        <router-link to="/" style="text-decoration: none;">  <div class="logo">
          <span>GRAPHIXHUB</span>
          <span class="subtitle">A définir</span>
        </div></router-link>
  
        <div class="menu">
          <!-- Products Link -->
          <div class="products">
            <router-link to="/Products" class="btn-login">Products</router-link>
          </div>
  
          <!-- Conditional Rendering for Login and Register -->
          <div v-if="!isLoggedIn" style="display: flex;
    gap: 20px;">
            <div class="cart-login">
              <router-link to="/login" class="btn-login">Login</router-link>
            </div>
            <div class="cart-register">
              <router-link to="/register" class="btn-login">Register</router-link>
            </div>
          </div>
  
          <!-- Account Link when Logged In -->
          <div v-else>
            <div class="cart-account">
            <button class="btn-login" @click="showAccountPopup = true">Account</button>
            </div>
          </div>
        </div>
      </nav>
       <!-- Account Popup -->
    <div v-if="showAccountPopup" class="popup">
      <div class="popup-content">
        <h3>Account Information</h3>
        <p><strong>User ID:</strong> {{ userId }}</p>
        <button class="logout-button" @click="handleLogout">Logout</button>
        <button class="close-button" @click="showAccountPopup = false">Close</button>
      </div>
    </div>
    </header>
  </template>
  
  <script>
export default {
  data() {
    return {
      isLoggedIn: false, // Tracks whether the user is logged in
      userId: null, // Stores the logged-in user's ID
      showAccountPopup: false, // Controls the visibility of the account pop-up
    };
  },
  mounted() {
    // Check if a token exists in localStorage when the component mounts
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      this.isLoggedIn = true;
      this.userId = userId; // Retrieve the user ID from localStorage
    }
  },
  methods: {
    handleLogout() {
      // Clear localStorage and reset states
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.isLoggedIn = false;
      this.userId = null;
      this.showAccountPopup = false;

      // Optionally redirect to the login page
      this.$router.push("/login");
    },
  },
};
</script>
  <style scoped>
  .container {
    background-image: url("../assets/img/background.jpg");
    padding: 0;
    margin: 0;
    width: auto;
    height: auto;
  }
  span {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
  .text {
    color: white;
  }
  .logo {
    font-size: 20px;
    font-weight: bold;
  }
  .subtitle {
    font-size: 12px;
    font-style: italic;
    color: #006d16;
    display: block;
  }
  .btn-link {
    font-size: 20px;
    font-weight: 900;
    color: white;
  }
  .btn-link:hover {
    border-radius: 90px;
    border: 2px solid #7388d4;
  }
  
  /* Navbar styles */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: transparent;
    color: white;
  }
  .menu {
    display: flex;
    gap: 20px;
  }
  .menu-toggle {
    display: none;
    background-color: #333;
    color: white;
    font-size: 30px;
    border: none;
    cursor: pointer;
  }
  img {
    mix-blend-mode: multiply; /* Essayer également avec 'darken' ou 'screen' selon les cas */
  }
  .logo {
    font-size: 20px;
    font-weight: bold;
  }
  .btn-login {
    font-size: 25px;
    font-weight: 500;
    background: none;
    border: none;
    text-decoration: none;
  }
  
  .btn-login1 {
    font-weight: 900;
    font-size: 28px;
    font-family: cursive;
    text-decoration: none;
  }
  .logo .subtitle {
    font-size: 12px;
    font-style: italic;
    color: #006d16;
    display: block;
  }
  
  @media (max-width: 768px) {
    .menu {
      display: none;
      flex-direction: column;
      background-color: #333;
      width: 100%;
      position: absolute;
      top: 50px;
      left: 0;
      z-index: 1;
      padding: 10px 0;
    }
  
    .menu.open {
      display: flex;
    }
  
    .menu a {
      font-size: 16px;
      padding: 10px 20px;
      width: 100%;
      text-align: center;
    }
  
    .menu-toggle {
      display: block;
      background-color: #333;
      color: white;
      font-size: 30px;
      border: none;
      cursor: pointer;
      padding: 5px 10px;
    }
  
    .user-cart {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  @media (max-width: 480px) {
    .menu a {
      font-size: 14px; /* Réduire la taille de police */
      padding: 8px 15px; /* Ajuster les marges */
    }
  
    .menu-toggle {
      font-size: 26px; /* Réduire la taille du bouton */
      padding: 4px 8px;
    }
  
    .user-cart {
      top: 8px;
      right: 8px;
    }
  
    .menu {
      top: 40px; /* Ajuste la position du menu déroulant pour éviter les chevauchements */
    }
  }
  h1 {
    color: purple;
  }
  .principal {
    position: relative;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  .annonce-right:hover,
  .annonce-left:hover {
    box-shadow: 20px 3px 3px 3px rgb(181, 181, 181);
  }
  .principal div {
    margin: 40px;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  
  .annonce-right,
  .annonce-left {
    transform: scale(1.1);
    position: relative;
    width: 200vh;
    height: 65vh;
    box-shadow: 10px 40px 3px rgba(0, 0, 0, 0.1);
    background: radial-gradient(
      circle at 30% 30%,
      #d3e9ff,
      #adbfff,
      #7388d4,
      #2b2b47
    );
    border-radius: 35px;
    flex-direction: column;
    align-items: center;
    color: rgb(98, 93, 93);
    text-align: center;
    font-size: 300;
  }
  
  .uno {
    background: radial-gradient(
      circle at 30% 30%,
      #e9d3ff,
      #c5adff,
      #9a73d4,
      #472b47
    );
  }
  
  .annonce-left {
    background: radial-gradient(
      circle at 30% 30%,
      #d3fff1,
      #adebff,
      #73c1d4,
      #2b4747
    );
  
    display: flex;
    justify-content: flex-end;
  }
  .annonce-right img {
    display: flex;
    border-radius: 30px;
  }
  .annonce-left img {
    display: flex;
    justify-content: flex-start;
    border-radius: 30px;
  }
  
  @keyframes slideFadeIn {
    from {
      opacity: 0;
      transform: translateY(1000px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .slide-fade-in {
    opacity: 0;
    animation: slideFadeIn 1.3s ease-out forwards;
  }

  /* Popup Styles */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.popup-content h3 {
  margin-bottom: 10px;
}

.popup-content p {
  margin-bottom: 20px;
  font-size: 16px;
}

.logout-button,
.close-button {
  padding: 10px 15px;
  margin: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button {
  background: #ff4d4f;
  color: white;
}

.close-button {
  background: #ccc;
  color: black;
}

.logout-button:hover {
  background: #e04344;
}

.close-button:hover {
  background: #bbb;
}
  </style>
  