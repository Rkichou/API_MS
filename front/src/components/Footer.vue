<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section about">
        <h2>À propos</h2>
        <p>
          Bienvenue sur notre plateforme de e-commerce. Nous vous proposons une
          large sélection de produits de qualité pour répondre à tous vos
          besoins.
        </p>
      </div>
      <div class="footer-section links">
        <h2>Liens utiles</h2>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/products">Produits</router-link></li>
          <li><router-link to="/about">À propos</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
      <div class="footer-section social">
        <h2>Suivez-nous</h2>
        <div class="social-icons">
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2024 Ecommerce | Tous droits réservés
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  width: auto;
  background: #274c77;
  color: #ffffff;
  padding-top: 40px;

  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin: auto;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  padding: 10px;
}

.footer-section h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-section p,
.footer-section ul {
  font-size: 14px;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin: 5px 0;
}

.footer-section ul li a {
  color: #a3cef1;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #ffffff;
}

.social-icons a {
  margin: 0 10px;
  color: #a3cef1;
  font-size: 20px;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #ffffff;
}

.footer-bottom {
  background: #19324d;
  padding: 10px;
  font-size: 14px;
  color: #a3cef1;
  border-top: 1px solid #a3cef1;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-section {
    margin-bottom: 20px;
  }
}
</style>
