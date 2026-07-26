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
      <HeroCarousel :slides="heroSlides" section-label="del carrusel de inicio" />
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
      <div class="product-grid desktop-featured-grid">
        <ProductCard
          v-for="(product, index) in featuredProducts"
          :key="product.id"
          :product="product"
          :slides="featuredProducts"
          :start-index="index"
          section-label="de la sección de piezas destacadas"
        />
      </div>
      <div class="featured-carousel">
        <HeroCarousel v-if="featuredSlides.length" :slides="featuredSlides" :has-overlay="false" section-label="de la sección de piezas destacadas" />
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
            <div class="chips"> 
              <h3>{{ category.name }}</h3>
              <span style="margin-left: 20px;" class="section-tag">{{ category.name }}</span>
            </div>
            <p>{{ category.description }}</p>
          </div>

          <div
            class="preview-slide"
            @pointerdown="handlePreviewTouchStart(category, $event)"
            @pointermove="handlePreviewTouchMove($event)"
            @pointerup="handlePreviewTouchEnd(category)"
            @pointercancel="handlePreviewTouchEnd(category)"
            @touchstart="handlePreviewTouchStart(category, $event)"
            @touchmove="handlePreviewTouchMove($event)"
            @touchend="handlePreviewTouchEnd(category)"
            @touchcancel="handlePreviewTouchEnd(category)"
          >
            <div class="preview-product-shell">
              <ProductCard
                :key="currentPreviewProduct(category).id"
                :product="currentPreviewProduct(category)"
                :slides="category.products"
                :start-index="previewIndexes[category.slug]"
                :section-label="`de lo más vendido — ${category.name}`"
              />
            </div>

            <div class="preview-controls">
              <button
                class="preview-nav"
                type="button"
                @click="showPrevious(category)"
                :aria-label="`Anterior producto en ${category.name}`"
              >
                ‹
              </button>

              <span class="preview-counter">
                {{ previewIndexes[category.slug] + 1 }} / {{ category.products.length }}
              </span>

              <button
                class="preview-nav"
                type="button"
                @click="showNext(category)"
                :aria-label="`Siguiente producto en ${category.name}`"
              >
                ›
              </button>
            </div>
          </div>

          <router-link :to="`/categoria/${category.slug}`" class="view-more-button">
            Ver más {{ category.name }}
          </router-link>
        </article>
      </div>
    </section>
    <section class="bot-service-section">
      <div class="bot-service-card">
        <div>
          <span class="section-tag">Chat 24/7</span>
          <h2>Responde instantáneamente por WhatsApp</h2>
          <p>
            Nuestro asistente virtual está listo para recibir tu mensaje a cualquier hora.
            Haz tu consulta, pide recomendaciones o confirma disponibilidad en minutos.
          </p>
        </div>
        <a
          class="bot-action"
          :href="socialLinks.whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir WhatsApp
        </a>
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
        <a :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a :href="socialLinks.facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a :href="socialLinks.whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'
import HeroCarousel from '../components/HeroCarousel.vue'
import { reactive, ref } from 'vue'
import { categories, featuredProducts } from '../data/catalog.js'
import { socialLinks } from '../data/contact.js'

const previewSlugs = ['anillos', 'pulseras', 'colgantes', 'arete-broquel']
const previewCategories = categories.filter((category) => previewSlugs.includes(category.slug))
const heroSlides = categories.map((category) => ({
  title: category.name,
  caption: category.description,
  image: category.products[0]?.image || '',
  count: category.products.length,
}))

const featuredSlides = featuredProducts.slice(0, 4).map((product) => ({
  title: product.name,
  caption: product.description,
  image: product.image,
  count: featuredProducts.length,
}))

const previewIndexes = reactive(
  Object.fromEntries(previewCategories.map((category) => [category.slug, 0])),
)

const previewSwipeState = reactive({
  startX: 0,
  currentX: 0,
  activeSlug: null,
  isDragging: false,
})

const currentPreviewProduct = (category) => category.products[previewIndexes[category.slug]]

const showPrevious = (category) => {
  const currentIndex = previewIndexes[category.slug]
  previewIndexes[category.slug] = (currentIndex - 1 + category.products.length) % category.products.length
}

const showNext = (category) => {
  const currentIndex = previewIndexes[category.slug]
  previewIndexes[category.slug] = (currentIndex + 1) % category.products.length
}

const getPreviewClientX = (event) => {
  if (event.touches && event.touches.length === 1) {
    return event.touches[0].clientX
  }
  if (event.clientX !== undefined) {
    return event.clientX
  }
  return null
}

const handlePreviewTouchStart = (category, event) => {
  if (previewSwipeState.isDragging) return
  const clientX = getPreviewClientX(event)
  if (clientX === null) return
  previewSwipeState.activeSlug = category.slug
  previewSwipeState.startX = clientX
  previewSwipeState.currentX = clientX
  previewSwipeState.isDragging = true
}

const handlePreviewTouchMove = (event) => {
  if (!previewSwipeState.isDragging) return
  const clientX = getPreviewClientX(event)
  if (clientX === null) return
  previewSwipeState.currentX = clientX
}

const handlePreviewTouchEnd = (category) => {
  if (!previewSwipeState.isDragging || previewSwipeState.activeSlug !== category.slug) return
  const delta = previewSwipeState.currentX - previewSwipeState.startX
  previewSwipeState.isDragging = false
  if (Math.abs(delta) > 56) {
    if (delta < 0) {
      showNext(category)
    } else {
      showPrevious(category)
    }
  }
  previewSwipeState.activeSlug = null
}
</script>

<style scoped>
.chips{
      display: flex;
    justify-content: space-between;
}
.home-view {
  width: 100vw;
  padding: 42px 42px 60px;
  display: grid;
  gap: 5px;
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

.bot-service-section {
  padding: 28px 36px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: var(--shadow);
}

.bot-service-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.bot-service-card h2 {
  margin: 0 0 12px;
  font-size: clamp(1.8rem, 2vw, 2.4rem);
}

.bot-service-card p {
  margin: 0;
  color: var(--text-muted);
  max-width: 720px;
}

.bot-action {
  min-width: 240px;
  padding: 16px 24px;
  border-radius: 18px;
  background: var(--gold);
  color: #fff;
  font-weight: 700;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.bot-action:hover {
  background: #b3945d;
}

.preview-slide {
  display: flex;
  flex-direction: column;
  gap: 16px;
  touch-action: pan-y;
}

.preview-product-shell {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 433px;
}

.preview-product-shell :deep(.product-card) {
  height: 100%;
}

.preview-controls {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 999px;
  padding: 10px 14px;
  box-shadow: var(--shadow);
}

.preview-nav {
  width: 55px;
  height: 55px;
  border: none;
  border-radius: 50%;
  background: var(--gold);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.preview-nav:hover {
  transform: translateY(-2px);
  background: #b3945d;
}

.preview-counter {
  min-width: 56px;
  text-align: center;
  font-weight: 600;
}

.preview-pager {
  margin-top: 18px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.95rem;
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
.featured-carousel {
  display: none;
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
  gap: 5px;
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
    grid-template-columns: 1fr;
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

  .hero-copy,
  .section-intro {
    display: none;
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

  .desktop-featured-grid {
    display: none;
  }

  .featured-carousel {
    display: block;
  }

  .preview-products {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .preview-product-shell :deep(.product-card) {
    margin-top: 85px;
  }
  .preview-slide {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 16px;
  }

  .preview-product-shell {
    flex: 0 0 100%;
    width: 100%;
    order: 1;
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
    margin-top: 20px;
  }

  .site-footer {
    padding: 24px 20px;
  }
}
</style>
