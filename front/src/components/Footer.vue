<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h2>Liens utiles</h2>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/products">Produits</router-link></li>
          <li><router-link to="/about">À propos</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </div>
      <div class="footer-section social">
        <div class="social-icons">
          <a href="#" class="social-link">
            <img src="../assets/icons/instagram.png" alt="Instagram" class="social-icon"/>
            <span>Instagram</span>
          </a>
          <a href="#" class="social-link">
            <img src="../assets/icons/twitter.png" alt="Twitter" class="social-icon"/>
            <span>Twitter</span>
          </a>
          <a href="#" class="social-link">
            <img src="../assets/icons/linkedin.png" alt="LinkedIn" class="social-icon"/>
            <span>LinkedIn</span>
          </a>
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
  background: #274c77;
  color: #ffffff;
  padding: 2rem 0;
  width: 100%;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
}

.footer-section {
  text-align: center;
}

.footer-section h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.footer-section ul li {
  margin: 0.5rem 0;
}

.footer-section ul li a {
  color: #a3cef1;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #ffffff;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #a3cef1;
  transition: color 0.3s;
}

.social-link:hover {
  color: #ffffff;
}

.social-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 0.5rem;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid #a3cef1;
  color: #a3cef1;
}

@media (max-width: 768px) {
  .footer-content {
    gap: 1.5rem;
  }

  .social-icons {
    gap: 1.5rem;
  }
}
</style>