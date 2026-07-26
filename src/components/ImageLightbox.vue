<template>
  <Teleport to="body">
    <div v-if="open" class="lightbox" role="dialog" aria-modal="true" @click.self="$emit('close')">
      <button class="lightbox-close" type="button" aria-label="Cerrar imagen" @click="$emit('close')">
        <i class="fas fa-times"></i>
      </button>

      <figure
        class="lightbox-content"
        @pointerdown="handleTouchStart"
        @pointermove="handleTouchMove"
        @pointerup="handleTouchEnd"
        @pointercancel="handleTouchEnd"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @touchcancel="handleTouchEnd"
      >
        <img :src="currentSlide.image" :alt="currentSlide.alt || currentSlide.title || currentSlide.name" />
        <figcaption v-if="currentSlide.title || currentSlide.name">{{ currentSlide.title || currentSlide.name }}</figcaption>

        <button
          v-if="props.slides.length"
          type="button"
          class="lightbox-nav lightbox-nav--prev"
          @click.stop="showPrevious"
          aria-label="Anterior imagen"
        >
          ‹
        </button>

        <button
          v-if="props.slides.length"
          type="button"
          class="lightbox-nav lightbox-nav--next"
          @click.stop="showNext"
          aria-label="Siguiente imagen"
        >
          ›
        </button>

        <div v-if="props.orderEnabled" class="lightbox-order-controls">
          <button type="button" class="lightbox-order-button" @click.stop="openOrderModal">
            {{ props.orderButtonText }}
          </button>
        </div>
      </figure>

      <div v-if="isOrderModalOpen" class="order-modal-backdrop" @click.self="closeOrderModal">
        <div class="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-modal-title">
          <div class="order-modal-header">
            <h3 id="order-modal-title">¿Quieres pedir esta joya?</h3>
            <button type="button" class="order-modal-close" @click="closeOrderModal" aria-label="Cerrar">×</button>
          </div>
          <div class="order-modal-body">
            <img :src="orderTargetProduct.image" :alt="orderTargetProduct.title" class="order-modal-image" />
            <div class="order-modal-info">
              <strong>{{ orderTargetProduct.title }}</strong>
              <span v-if="props.sectionLabel" class="order-modal-section">{{ props.sectionLabel }}</span>
              <p>Confirma para abrir WhatsApp con el nombre de la joya.</p>
            </div>
          </div>
          <div class="order-modal-actions">
            <button type="button" class="order-modal-secondary" @click="closeOrderModal">Cancelar</button>
            <button type="button" class="order-modal-primary" @click="confirmOrder">Enviar a WhatsApp</button>
          </div>
        </div>
      </div>
      <div v-if="showSwipeHint" class="swipe-hint-overlay">
        <video
          class="swipe-hint-video"
          :src="swipeHintVideo"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        ></video>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { createWhatsAppProductLink } from '../data/contact.js'
import swipeHintVideo from '../assets/deslizar a la izquierda.mp4'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  slides: {
    type: Array,
    default: () => [],
  },
  currentIndex: {
    type: Number,
    default: 0,
  },
  orderEnabled: {
    type: Boolean,
    default: false,
  },
  orderButtonText: {
    type: String,
    default: 'Pedir esta joya',
  },
  sectionLabel: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close', 'update:currentIndex', 'order'])

const activeIndex = ref(props.currentIndex)

watch(
  () => props.currentIndex,
  (value) => {
    activeIndex.value = value
  },
)

const currentSlide = computed(() => {
  if (props.slides.length) {
    return props.slides[activeIndex.value] || props.slides[0]
  }

  return {
    image: props.src,
    alt: props.alt,
    title: props.title,
  }
})

const showSwipeHint = ref(false)
const isOrderModalOpen = ref(false)
let hintTimeout = null

const orderTargetProduct = computed(() => {
  const slide = currentSlide.value || {}
  return {
    image: slide.image || props.src,
    title: slide.title || slide.name || props.title || props.alt || 'esta joya',
  }
})

const hideSwipeHint = () => {
  clearTimeout(hintTimeout)
  showSwipeHint.value = false
}

const openOrderModal = () => {
  if (!props.orderEnabled) return
  isOrderModalOpen.value = true
}

const closeOrderModal = () => {
  isOrderModalOpen.value = false
}

const orderMessageName = computed(() => {
  const name = orderTargetProduct.value.title || 'esta joya'
  return props.sectionLabel ? `${name} (${props.sectionLabel})` : name
})

const confirmOrder = () => {
  isOrderModalOpen.value = false
  window.open(
    createWhatsAppProductLink(orderMessageName.value),
    '_blank',
    'noopener,noreferrer',
  )
}

const showSwipeHintWithTimer = () => {
  hideSwipeHint()
  showSwipeHint.value = true
  hintTimeout = setTimeout(() => {
    showSwipeHint.value = false
  }, 3000)
}

watch(
  () => props.open,
  (open) => {
    if (open) {
      showSwipeHintWithTimer()
    } else {
      hideSwipeHint()
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  hideSwipeHint()
})

const getClientX = (event) => {
  if (event.touches && event.touches.length === 1) {
    return event.touches[0].clientX
  }
  if (event.clientX !== undefined) {
    return event.clientX
  }
  return null
}

const handleTouchStart = (event) => {
  if (isDragging.value) return
  const clientX = getClientX(event)
  if (clientX === null) return
  touchStartX.value = clientX
  touchCurrentX.value = clientX
  isDragging.value = true
}

const handleTouchMove = (event) => {
  if (!isDragging.value) return
  const clientX = getClientX(event)
  if (clientX === null) return
  touchCurrentX.value = clientX
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  const delta = touchCurrentX.value - touchStartX.value
  isDragging.value = false
  if (Math.abs(delta) > dragThreshold) {
    if (delta < 0) {
      showNext()
    } else {
      showPrevious()
    }
  }
}

const touchStartX = ref(0)
const touchCurrentX = ref(0)
const isDragging = ref(false)
const dragThreshold = 60

const showNext = () => {
  if (!props.slides.length) return
  hideSwipeHint()
  const nextIndex = (activeIndex.value + 1) % props.slides.length
  activeIndex.value = nextIndex
  emit('update:currentIndex', nextIndex)
}

const showPrevious = () => {
  if (!props.slides.length) return
  hideSwipeHint()
  const previousIndex = (activeIndex.value - 1 + props.slides.length) % props.slides.length
  activeIndex.value = previousIndex
  emit('update:currentIndex', previousIndex)
}
</script>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background: rgba(12, 10, 9, 0.86);
  backdrop-filter: blur(10px);
}

.lightbox-content {
  width: min(92vw, 980px);
  max-height: 92vh;
  margin: 0;
  display: grid;
  gap: 14px;
  position: relative;
  touch-action: pan-y;
  z-index: 1;
}

.lightbox-content img {
  width: 100%;
  max-height: 74vh;
  object-fit: contain;
  border-radius: 18px;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.36);
  background: #fff;
  touch-action: pan-y;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: #101010;
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  z-index: 3;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 1);
}

.lightbox-order-controls {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  z-index: 4;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 0 14px;
}

.lightbox-order-button {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 999px;
  background: var(--gold);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.16);
}

.lightbox-order-button:hover {
  background: #b2945e;
}

.order-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(12, 10, 9, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  z-index: 1100;
}

.order-modal {
  width: min(520px, 100%);
  background: #ffffff;
  border-radius: 28px;
  box-shadow: 0 32px 80px rgba(15, 12, 10, 0.18);
  color: var(--text);
  overflow: hidden;
}

.order-modal-header {
  padding: 22px 24px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.order-modal-header h3 {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.4;
}

.order-modal-close {
  border: none;
  background: transparent;
  color: var(--text);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.order-modal-body {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 18px;
  align-items: center;
  padding: 0 24px 22px;
}

.order-modal-image {
  width: 108px;
  height: 108px;
  object-fit: cover;
  border-radius: 22px;
  border: 1px solid rgba(60, 52, 52, 0.08);
}

.order-modal-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-modal-info strong {
  font-size: 1rem;
}

.order-modal-section {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--gold);
}

.order-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  padding: 0 24px 24px;
}

.order-modal-secondary,
.order-modal-primary {
  min-width: 120px;
  padding: 12px 18px;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-weight: 700;
}

.order-modal-secondary {
  background: #f3f1ed;
  color: var(--text);
}

.order-modal-primary {
  background: var(--gold);
  color: #fff;
}

.order-modal-secondary:hover {
  background: #e7e3df;
}

.order-modal-primary:hover {
  background: #b2945e;
}

.lightbox-nav--prev {
  left: 12px;
}

.lightbox-nav--next {
  right: 12px;
}

.lightbox-content figcaption {
  color: #fff;
  font-size: 1.05rem;
  font-weight: 700;
  text-align: center;
}

.lightbox-close {
  position: fixed;
  top: 22px;
  right: 22px;
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.94);
  color: var(--text);
  cursor: pointer;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
  z-index: 4;
}

.lightbox-close:hover {
  background: var(--gold);
  color: #fff;
}

.swipe-hint-overlay {
  position: absolute;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 2;
}

.swipe-hint-video {
  width: min(280px, 80vw);
  max-height: 60vh;
  border-radius: 22px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
  opacity: 0.95;
}

@media (max-width: 900px) {
  .swipe-hint-overlay {
    display: flex;
  }

  .swipe-hint-video {
    width: min(220px, 70vw);
    max-height: 50vh;
  }
}

@media (max-width: 900px) {
  .swipe-hint-video {
    width: min(220px, 70vw);
    max-height: 50vh;
  }
}

@media (max-width: 640px) {
  .lightbox {
    padding: 16px;
  }

  .lightbox-close {
    top: 14px;
    right: 14px;
  }

  .lightbox-content img {
    max-height: 66vh;
    border-radius: 14px;
  }
}
</style>
