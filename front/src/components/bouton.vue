<script>
import Footer from "./Footer.vue"; // Assurez-vous que le chemin est correct

export default {
  components: {
    Footer,
  },
};
</script>

<template>
  <section class="container">
    <nav className="navbar">
      <div className="logo">
        <span>LOGO</span>
        <span className="subtitle">A définir</span>
      </div>

      <div className="menu">
        <div class="products">
          <router-link to="/products" class="btn-login">Products</router-link>
        </div>
        <div class="cart-Login">
          <router-link to="/login" class="btn-login">Login</router-link>
        </div>
        <div class="cart-register">
          <router-link to="/register" class="btn-login">Register</router-link>
        </div>
      </div>
    </nav>
    <div class="principal">
      <div class="annonce-right slide-fade-in">
        <h1 class="text">Carte Graphique</h1>
        <router-link to="/products" class="btn-login"
          >Learn More ->
        </router-link>
        <img src="../assets/p3.jpeg" />
      </div>
      <div class="annonce-left slide-fade-in">
        <img src="../assets/p5.jpeg" />

        <h1 class="text">Processeur</h1>
        <router-link to="/products" class="btn-login"
          >Learn More ->
        </router-link>
      </div>
      <div class="annonce-right uno slide-fade-in">
        <h1 class="text">Tour Ordi</h1>
        <router-link to="/products" class="btn-login"
          >Learn More ->
        </router-link>
        <img src="../assets/p4.jpeg" />
      </div>
    </div>
    <Footer />
  </section>
</template>

<style scooped>
.container {
  background-image: url("../assets/img/background.jpg");
  padding: 0;
  margin: 0;
  width: auto;
  height: auto;
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
  font-size: 20px;
  font-weight: 900;
}
.btn-login:hover {
  border-radius: 90px;
  border: 2px solid #7388d4;
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
h1 {
  color: purple;
}
.principal {
  width: 170vh;
  height: 80vh;
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: row;

  align-items: center;
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
</style>
