<template>
  <div class="category-view">
    <section class="category-hero">
      <div>
        <span class="section-tag">{{ category && category.name ? category.name : 'Categoría' }}</span>
        <h1>{{ category && category.name ? category.name : 'Categoría no encontrada' }}</h1>
        <p>{{ category && category.description ? category.description : 'Lo sentimos, no encontramos esta categoría en el catálogo.' }}</p>
      </div>
      <router-link to="/" class="back-button">← Volver al catálogo</router-link>
    </section>

    <section class="category-products" v-if="category">
      <div class="section-header section-header--center">
        <span class="section-tag">Todo en {{ category.name }}</span>
        <h2>{{ category.name }}</h2>
        <p>Explora todos los diseños disponibles en la categoría {{ category.name.toLowerCase() }}.</p>
      </div>

      <div v-if="category.products.length" class="product-grid">
        <ProductCard v-for="product in category.products" :key="product.id" :product="product" />
      </div>
      <div v-else class="empty-state">
        <p>No hay productos cargados todavía en esta categoría. Cuando agregues imágenes a la carpeta <strong>{{ category.folder }}</strong>, se mostrarán automáticamente aquí.</p>
      </div>
    </section>

    <section class="back-home">
      <router-link to="/" class="view-all-button">Regresar al inicio</router-link>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { categoryBySlug } from '../data/catalog.js'

const route = useRoute()

const category = computed(() => categoryBySlug[route.params.slug] || null)
</script>

<style scoped>
.category-view {
  width: 100vw;
  padding: 42px 42px 60px;
  display: grid;
  gap: 42px;
}

.category-hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
  padding: 32px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow);
}

.category-hero h1 {
  margin: 0 0 18px;
  font-size: clamp(2.2rem, 3vw, 3rem);
}

.category-hero p {
  margin: 0;
  color: var(--text-muted);
  max-width: 620px;
}

.back-button,
.view-all-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 22px;
  border-radius: 16px;
  background: var(--gold);
  color: #fff;
  font-weight: 700;
}

.back-button:hover,
.view-all-button:hover {
  background: #b3945d;
}

.section-header {
  text-align: center;
  padding: 0 0 16px;
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
  margin: 0 0 14px;
  font-size: 2rem;
}

.section-header p {
  margin: 0;
  color: var(--text-muted);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
}

.empty-state {
  padding: 26px;
  border-radius: 22px;
  background: rgba(248, 244, 239, 0.95);
  border: 1px dashed rgba(60, 52, 52, 0.12);
  color: var(--text-muted);
}

.back-home {
  text-align: center;
}

@media (max-width: 992px) {
  .category-hero {
    flex-direction: column;
    text-align: center;
  }

  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .category-view {
    padding: 18px 0 44px;
    gap: 28px;
  }

  .category-hero {
    border-radius: 0;
    padding: 24px 12px;
    box-shadow: none;
  }

  .category-products {
    padding: 0 8px;
  }

  .section-header {
    padding: 0 8px 16px;
  }

  .product-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}
</style>
