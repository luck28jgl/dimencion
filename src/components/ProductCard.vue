<template>
  <article class="product-card">
    <button class="image-frame" type="button" :aria-label="`Ver imagen grande de ${product.name}`" @click="isLightboxOpen = true">
      <img :src="product.image" :alt="product.name" />
      <span v-if="product.featured" class="badge">Destacado</span>
    </button>

    <div class="card-body">
      <span class="category-label">{{ product.category }}</span>
      <h3>{{ product.name }}</h3>
      <p class="description">{{ product.description }}</p>

      <div class="actions">
        <a
          :href="whatsappUrl"
          class="quote-button"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hacer pedido por WhatsApp"
        >
          Hacer pedido
        </a>

        <div class="social-links">
          <a
            :href="instagramLink"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram DIMENSIÓN"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            :href="facebookLink"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook DIMENSIÓN"
          >
            <i class="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
    </div>

    <ImageLightbox
      :open="isLightboxOpen"
      :src="product.image"
      :alt="product.name"
      :title="product.name"
      @close="isLightboxOpen = false"
    />
  </article>
</template>

<script setup>
import { ref } from 'vue'
import ImageLightbox from './ImageLightbox.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const isLightboxOpen = ref(false)
const whatsAppNumber = '5211234567890' // Cambia este número por tu número de WhatsApp real
const whatsappText = `Hola, quisiera hacer pedido de este producto: ${props.product.name} a mi domicilio`
const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(whatsappText)}`
const instagramLink = 'https://www.instagram.com/dimension.jewelry'
const facebookLink = 'https://www.facebook.com/dimension.jewelry'
</script>

<style scoped>
.product-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(60, 52, 52, 0.08);
  border-radius: 24px;
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 32px 60px rgba(47, 41, 40, 0.12);
}

.image-frame {
  position: relative;
  overflow: hidden;
  display: block;
  width: 100%;
  min-height: 280px;
  padding: 0;
  border: none;
  background: linear-gradient(180deg, rgba(201, 169, 110, 0.1), transparent);
  cursor: zoom-in;
}

.image-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .image-frame img {
  transform: scale(1.08);
}

.badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(201, 169, 110, 0.15);
  color: var(--text);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 999px;
  backdrop-filter: blur(10px);
}

.card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.category-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(201, 169, 110, 0.1);
  color: var(--text-muted);
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}

h3 {
  margin: 0;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
}

.description {
  margin: 0;
  color: var(--text-muted);
  min-height: 3em;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.quote-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  background: var(--gold);
  color: #fff;
  padding: 14px 20px;
  border-radius: 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 10px 24px rgba(201, 169, 110, 0.22);
}

.quote-button:hover {
  background: #b2945e;
}

.social-links {
  display: flex;
  gap: 14px;
}

.social-links a {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(60, 52, 52, 0.08);
  color: var(--text);
  background: rgba(255, 255, 255, 0.85);
}

.social-links a:hover {
  transform: translateY(-2px);
  border-color: var(--gold);
  color: var(--gold);
}

.social-links i {
  font-size: 0.95rem;
}
</style>
