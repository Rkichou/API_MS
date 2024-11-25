<script>

</script>

<template>
  <section class="container">
   
    <div class="principal">
      <div class="annonce-right slide-fade-in">
        <h1 class="text">Carte Graphique</h1>
        <router-link to="/products" class="btn-login1"
          >Learn More ->
        </router-link>
        <img src="../assets/p3.jpeg" />
      </div>
      <div class="annonce-left slide-fade-in">
        <img src="../assets/p5.jpeg" />

        <h1 class="text">Processeur</h1>
        <router-link to="/products" class="btn-login1"
          >Learn More ->
        </router-link>
      </div>
      <div class="annonce-right uno slide-fade-in">
        <h1 class="text">Tour Ordi</h1>
        <router-link to="/products" class="btn-login1"
          >Learn More ->
        </router-link>
        <img src="../assets/p4.jpeg" />
      </div>
    </div>
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
  font-weight: 900;
  color: rgb(175, 174, 174);
  text-decoration: none;
}
.btn-login:hover {
  font-size: 28px;
  color: rgb(105, 0, 196);
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

  .principal {
    width: auto;
    position: relative;
    display: flex; /* Active Flexbox */
    flex-direction: row; /* Comportement par défaut */
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
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
  #app {
    background: #000;
  }
  .principal {
    flex-direction: column; /* Les divs seront disposées en colonne */
    align-items: center; /* Centre les éléments */
  }

  .principal div {
    width: 80%; /* Ajuste la largeur des blocs */
    margin: 20px auto; /* Centrage avec des marges automatiques */
  }

  .annonce-right,
  .annonce-left {
    width: 100%; /* S'assure que les blocs prennent toute la largeur disponible */
    height: auto; /* Ajuste la hauteur automatiquement */
  }

  .annonce-right img,
  .annonce-left img {
    width: 100%; /* Ajuste la taille des images pour remplir leur conteneur */
    height: auto;
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
  transform: translateY(-10px); /* Moves the card up slightly */
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.5); /* Highlight effect */
  cursor: pointer; /* Indicates interactivity */
}
.principal div {
  margin: 40px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
}

.annonce-right,
.annonce-left {
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth animation */
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
</style>
