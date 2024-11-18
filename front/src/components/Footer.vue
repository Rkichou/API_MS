<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section links">
        <h2>Liens utiles</h2>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/products">Produits</router-link></li>
          <li><router-link to="#">À propos</router-link></li>
          <li><router-link to="#">Contact</router-link></li>
        </ul>
      </div>
      <div class="footer-section social">
        <h2>Suivez-nous</h2>
        <div class="social-icons">
          <img
            src="../assets/icons/instagram.png"
            widht="30"
            height="30"
            alt="instagram"
          />
          <p>INSTAGRAM</p>
          <img src="../assets/icons/twitter.png" widht="30" height="30" />
          <img src="../assets/icons/linkedin.png" widht="30" height="30" />
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
  display: flex;
  flex-direction: column; /* Change en colonne */
  align-items: center; /* Centre les éléments si besoin */
}

.footer-section li {
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
.social-icons {
  display: flex;
  justify-content: space-evenly;
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
