<script>
</script>

<template>
  <section class="container">
    <div class="principal">
      <div class="annonce-right slide-fade-in">
        <h1 class="text">Graphics Cards</h1>
        <router-link to="/category/graphic-card" class="btn-login1">Learn More -></router-link>
        <div class="image-container">
          <img src="../assets/p3.jpeg" alt="Graphics card"/>
        </div>
      </div>
      <div class="annonce-left slide-fade-in">
        <div class="image-container">
          <img src="../assets/p5.jpeg" alt="Processor"/>
        </div>
        <h1 class="text">Processors</h1>
        <router-link to="/category/processor" class="btn-login1">Learn More -></router-link>
      </div>
      <div class="annonce-right uno slide-fade-in">
        <h1 class="text">Pre-built PCs</h1>
        <router-link to="/category/prebuild" class="btn-login1">Learn More -></router-link>
        <div class="image-container">
          <img src="../assets/p4.jpeg" alt="Pre-built PC"/>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  background-image: url("../assets/img/background.jpg");
  padding: 0;
  margin: 0;
  width: auto;
  height: auto;
}

.text {
  color: white;
  font-size: 1.5rem;
  margin: 1rem 0;
}

.principal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.annonce-right,
.annonce-left {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.annonce-right {
  background: radial-gradient(circle at 30% 30%, #d3e9ff, #adbfff, #7388d4, #2b2b47);
}

.annonce-left {
  background: radial-gradient(circle at 30% 30%, #d3fff1, #adebff, #73c1d4, #2b4747);
}

.uno {
  background: radial-gradient(circle at 30% 30%, #e9d3ff, #c5adff, #9a73d4, #472b47);
}

.image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 10px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 1rem;
}

.btn-login1 {
  font-weight: 600;
  font-size: 1rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  transition: background 0.3s;
}

.btn-login1:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes slideFadeIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-fade-in {
  animation: slideFadeIn 0.8s ease-out forwards;
}

@media (min-width: 768px) {
  .principal {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  .annonce-right,
  .annonce-left {
    margin: 1rem;
  }
}

@media (max-width: 480px) {
  .principal {
    padding: 1rem;
  }

  .annonce-right,
  .annonce-left {
    padding: 1.5rem;
  }

  .text {
    font-size: 1.25rem;
  }

  .image-container {
    height: 200px;
  }

  .image-container img {
    padding: 0.5rem;
  }
}
</style>