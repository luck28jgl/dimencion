<template>
  <article class="product-card">
    <button class="image-frame" type="button" :aria-label="`Ver imagen grande de ${product.name}`" @click="openLightbox">
      <img :src="product.image" :alt="product.name" />
      <span v-if="product.featured" class="badge">Destacado</span>
    </button>

    <div class="card-body">
      <!-- <span class="category-label">{{ product.category }}</span> -->
      <h3>{{ product.name }}</h3>
      <p class="description">{{ product.description }}</p>

      <div class="actions">
        <button
          type="button"
          class="quote-button"
          @click="openWhatsAppModal"
          aria-label="Confirmar pedido por WhatsApp"
        >
          Hacer pedido
        </button>

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
      :slides="lightboxSlides"
      :currentIndex="lightboxIndex"
      :src="product.image"
      :alt="product.name"
      :title="product.name"
      order-enabled
      :section-label="props.sectionLabel"
      @close="isLightboxOpen = false"
      @update:currentIndex="(index) => lightboxIndex.value = index"
    />

    <div class="modal-backdrop" v-if="isConfirmOpen" @click.self="closeWhatsAppModal">
      <div class="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h3 id="modal-title">¿Deseas enviar este pedido por WhatsApp?</h3>
          <button type="button" class="modal-close" @click="closeWhatsAppModal" aria-label="Cerrar modal">×</button>
        </div>

        <div class="modal-body">
          <img :src="orderTargetProduct.value?.image || product.image" :alt="orderTargetProduct.value?.name || product.name" class="modal-preview-image" />
          <div class="modal-product-info">
            <strong>{{ orderTargetProduct.value?.name || product.name }}</strong>
            <span v-if="props.sectionLabel" class="modal-section-label">{{ props.sectionLabel }}</span>
            <p class="modal-preview-text">Se enviará un mensaje de pedido con el nombre de esta joya.</p>
          </div>
        </div>

        <div class="modal-actions">
          <button type="button" class="modal-secondary" @click="closeWhatsAppModal">Cancelar</button>
          <button type="button" class="modal-primary" @click="confirmWhatsApp">Enviar a WhatsApp</button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import ImageLightbox from './ImageLightbox.vue'
import { createWhatsAppProductLink, socialLinks } from '../data/contact.js'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  slides: {
    type: Array,
    default: () => [],
  },
  startIndex: {
    type: Number,
    default: 0,
  },
  sectionLabel: {
    type: String,
    default: '',
  },
})

const isLightboxOpen = ref(false)
const isConfirmOpen = ref(false)
const lightboxIndex = ref(props.startIndex)

watch(
  () => props.startIndex,
  (value) => {
    lightboxIndex.value = value
  },
)

const lightboxSlides = computed(() => {
  return props.slides.length ? props.slides : [props.product]
})

const orderTargetProduct = ref(props.product)
const instagramLink = socialLinks.instagram
const facebookLink = socialLinks.facebook

const openLightbox = () => {
  if (props.slides.length) {
    const productIndex = props.slides.findIndex((item) => item.id === props.product.id)
    lightboxIndex.value = productIndex >= 0 ? productIndex : props.startIndex
  } else {
    lightboxIndex.value = 0
  }
  isLightboxOpen.value = true
}

const openWhatsAppModal = () => {
  orderTargetProduct.value = props.product
  isConfirmOpen.value = true
}

const confirmWhatsApp = () => {
  isConfirmOpen.value = false
  const targetProduct = orderTargetProduct.value || props.product
  const name = props.sectionLabel
    ? `${targetProduct.name} (${props.sectionLabel})`
    : targetProduct.name
  window.open(createWhatsAppProductLink(name), '_blank', 'noopener,noreferrer')
}

const closeWhatsAppModal = () => {
  isConfirmOpen.value = false
}
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
  min-height: 230px;
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
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 0px;
    align-items: center;
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
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    align-items: center;
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

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 12, 10, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}

.confirm-modal {
  width: min(480px, 100%);
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 32px 80px rgba(15, 12, 10, 0.18);
  padding: 28px;
  color: var(--text);
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.4;
}

.modal-close {
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.modal-body {
    display: grid;
    /* grid-template-columns: auto 1fr; */
    gap: 18px;
    align-items: center;
    margin-bottom: 24px;
    justify-content: center;
}

.modal-preview-image {
    width: 185px;
    height: 136px;
  object-fit: cover;
  border-radius: 22px;
  border: 1px solid rgba(60, 52, 52, 0.08);
}

.modal-product-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-preview-text {
  margin: 0;
  color: var(--text-muted);
}

.modal-section-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--gold);
}

.modal-actions {
    display: flex;
    justify-content: space-between;
  gap: 12px;
}

.modal-secondary,
.modal-primary {
  min-width: 120px;
  padding: 12px 18px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-weight: 700;
}

.modal-secondary {
  background: #f3f1ed;
  color: var(--text);
}

.modal-primary {
  background: var(--gold);
  color: #fff;
}

.modal-secondary:hover {
  background: #e7e3df;
}

.modal-primary:hover {
  background: #b2945e;
}
</style>
