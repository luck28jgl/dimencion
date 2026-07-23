<template>
  <div class="home-view">
    <section class="hero-section">
      <div class="hero-copy">
        <span class="eyebrow">DIMENSIÓN</span>
        <h1>Joyas contemporáneas con alma de artesanía.</h1>
        <p>
          Descubre piezas únicas, acabados dorados y siluetas atemporales que realzan
          cada momento con elegancia sutil.
        </p>
        <a href="#selection" class="hero-button">Ver colección</a>
      </div>
      <HeroCarousel :slides="heroSlides" />
    </section>

    <section class="section-intro" id="selection">
      <div class="section-header">
        <span class="section-tag">Tienda</span>
        <h2>Piezas seleccionadas para tu persona.</h2>
        <p>
          Desde anillos delicados hasta collares con presencia, cada joya está pensada para
          una elegancia moderna y refinada.
        </p>
      </div>
    </section>

    <section class="featured-section">
      <div class="section-header section-header--center">
        <span class="section-tag">Vista rápida</span>
        <h2>Piezas destacadas</h2>
        <p>Esta selección muestra las primeras 4 piezas de todo el catálogo para que puedas empezar a explorar.</p>
      </div>
      <div class="product-grid">
        <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
      </div>
    </section>

    <section class="preview-section">
      <div class="section-header m-auto section-header--center">
        <span class="section-tag">Categorías</span>
        <h2>lo mas vendido</h2>
        <p>unas de nuestas piezas más populares por su calidad.</p>
      </div>

      <div class="preview-grid">
        <article class="category-card" v-for="category in previewCategories" :key="category.slug">
          <div class="category-card__header">
            <span class="section-tag">{{ category.name }}</span>
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
          </div>

          <div class="preview-products">
            <ProductCard v-for="product in category.products.slice(0, 4)" :key="product.id" :product="product" />
          </div>

          <router-link :to="`/categoria/${category.slug}`" class="view-more-button">
            Ver más {{ category.name }}
          </router-link>
        </article>
      </div>
    </section>

    <section class="category-overview-section">
      <div class="section-header section-header--center">
        <span class="section-tag">Catálogo completo</span>
        <h2>Date una vuelta que tal y te gusta algo  </h2>
        <p>
          aqui todos nuestro catalogo de joyas que manejamos todas de plata 925 100% asegurada 
        </p>
      </div>

      <div class="category-grid">
        <article class="overview-card" v-for="category in categories" :key="category.slug">
          <h3>{{ category.name }}</h3>
          <p>{{ category.description }}</p>
          <div class="overview-card__meta">{{ category.products.length }} productos</div>
          <router-link :to="`/categoria/${category.slug}`" class="overview-link">Explorar</router-link>
        </article>
      </div>
    </section>

    <footer class="site-footer">
      <div>
        <p class="brand-footer">DIMENSIÓN</p>
        <p>Joyas de autor que celebran la belleza auténtica y el diseño femenino.</p>
      </div>
      <div class="footer-links">
        <a href="https://www.instagram.com/dimension.jewelry" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.facebook.com/dimension.jewelry" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://wa.me/5211234567890" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import { categories, featuredProducts } from '../data/catalog.js'

const previewSlugs = ['anillos', 'pulseras', 'colgantes', 'arete-broquel']
const previewCategories = categories.filter((category) => previewSlugs.includes(category.slug))
const heroSlides = categories.map((category) => ({
  title: category.name,
  caption: category.description,
  image: category.products[0]?.image || '',
  count: category.products.length,
}))
</script>

<style scoped>
.home-view {
  width: 100vw;
  padding: 42px 42px 60px;
  display: grid;
  gap: 52px;
}

.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(420px, 1fr);
  align-items: stretch;
  gap: 36px;
  padding: 42px 42px 36px;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 244, 239, 0.95));
  box-shadow: var(--shadow);
}

.hero-copy {
  max-width: 560px;
  display: grid;
  gap: 28px;
}

.eyebrow {
  width: 70%;
    height: 55%;
    margin: auto;
  display: inline-flex;
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: var(--gold-soft);
  color: var(--text-muted);
  margin-bottom: 18px;
  justify-content: center;
  align-items: center;
}

.hero-section h1 {
  font-size: clamp(2.6rem, 3.6vw, 4.4rem);
  line-height: 1.02;
  margin: 0 0 18px;
}

.hero-section p {
  max-width: 540px;
  margin: 0 0 28px;
  color: var(--text-muted);
}

.hero-button {
      width: 70%;
    height: 55%;
    margin: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 28px;
  background: var(--gold);
  color: #fff;
  border-radius: 16px;
  font-weight: 700;
}

.hero-button:hover {
  background: #b3945d;
}

.section-header {
  margin-bottom: 60px;
  margin-inline: auto;
  text-align: center;
  max-width: 720px;
}

.section-header--center {
  text-align: center;
}

.section-tag {
  display: inline-flex;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid var(--gold);
  color: var(--text-muted);
  font-size: 0.84rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 2rem;
  margin: 0 0 16px;
}

.section-header p {
  margin: 0;
  color: var(--text-muted);
}

.featured-section,
.preview-section,
.category-overview-section {
  padding: 36px 36px 24px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
}
.m-auto {
  margin: 0 auto;
}
.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
}

.category-card {
  display: grid;
  gap: 24px;
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(60, 52, 52, 0.08);
  background: rgba(255, 255, 255, 0.98);
}

.category-card__header h3 {
  margin: 14px 0 10px;
  font-size: 1.5rem;
}

.category-card__header p {
  margin: 0;
  color: var(--text-muted);
}

.preview-products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.view-more-button,
.overview-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 56px;
  padding: 14px 18px;
  border-radius: 16px;
  background: var(--gold);
  color: #fff;
  font-weight: 700;
  text-align: center;
  box-sizing: border-box;
  justify-self: center;
  align-self: center;
}

.view-more-button:hover,
.overview-link:hover {
  background: #b3945d;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.overview-card {
  padding: 24px;
  border-radius: 28px;
  border: 1px solid rgba(60, 52, 52, 0.08);
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.overview-card__meta {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 32px 30px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(60, 52, 52, 0.06);
}

.brand-footer {
  margin: 0 0 10px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.site-footer p {
  margin: 0;
  max-width: 460px;
  color: var(--text-muted);
}

.footer-links {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--text);
  font-weight: 600;
}

.footer-links a:hover {
  color: var(--gold);
}

@media (max-width: 992px) {
  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-copy {
    margin: 0 auto;
  }

  .product-grid,
  .preview-grid,
  .category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .home-view {
    padding: 18px 0 44px;
    gap: 28px;
  }

  .hero-section {
    border-radius: 0;
    padding: 26px 12px;
    box-shadow: none;
  }

  .section-intro,
  .featured-section,
  .preview-section,
  .category-overview-section {
    border-radius: 0;
    padding: 28px 8px 22px;
  }

  .section-header {
    padding-inline: 10px;
    margin-bottom: 28px;
  }

  .product-grid,
  .preview-grid,
  .category-grid {
    gap: 18px;
  }

  .preview-products {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .category-card,
  .overview-card {
    border-radius: 18px;
    padding: 12px 8px;
  }

  .site-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 24px 8px;
  }

  .hero-button {
    width: 100%;
  }

  .product-grid,
  .preview-grid,
  .category-grid {
    grid-template-columns: 1fr;
  }

  .view-more-button,
  .overview-link {
    width: min(220px, 100%);
  }

  .site-footer {
    padding: 24px 20px;
  }
}
</style>
