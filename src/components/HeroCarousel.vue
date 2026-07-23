<template>
  <section class="hero-carousel" v-if="slides.length">
    <button class="carousel-image" type="button" :aria-label="`Ver imagen grande de ${currentSlide.title}`" @click="isLightboxOpen = true">
        <img :src="currentSlide.image || heroFallback" :alt="currentSlide.title" />
      <div class="carousel-overlay">
        <div>
          <span class="carousel-category">{{ currentSlide.title }}</span>
          <p class="carousel-copy">{{ currentSlide.caption }}</p>
        </div>
      </div>
    </button>

    <div class="carousel-footer">
      <div class="carousel-meta">
        <strong>{{ currentSlide.title }}</strong>
        <span>{{ currentSlide.count }} piezas</span>
      </div>
      <div class="carousel-controls">
        <button @click="prevSlide" aria-label="Anterior slide">‹</button>
        <span>{{ currentIndex + 1 }} / {{ slides.length }}</span>
        <button @click="nextSlide" aria-label="Siguiente slide">›</button>
      </div>
    </div>
    <div class="carousel-indicators">
      <button
        v-for="(slide, index) in slides"
        :key="slide.title"
        :class="{ active: index === currentIndex }"
        @click="currentIndex = index"
        :aria-label="`Ver slide ${index + 1}`"
      ></button>
    </div>

    <ImageLightbox
      :open="isLightboxOpen"
      :src="currentSlide.image || heroFallback"
      :alt="currentSlide.title"
      :title="currentSlide.title"
      @close="isLightboxOpen = false"
    />
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ImageLightbox from './ImageLightbox.vue'
import heroFallback from '../assets/pulseras/pulsera(1).jpeg'

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
})

const currentIndex = ref(0)
const isLightboxOpen = ref(false)
const currentSlide = computed(() => props.slides[currentIndex.value] || props.slides[0])
let timer = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

onMounted(() => {
  timer = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.hero-carousel {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  min-height: 300px;
  max-width: 100%;
}

.carousel-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 70%;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  max-height: 340px;
  min-height: 240px;
  border-radius: 28px;
  overflow: hidden;
  background: linear-gradient(180deg, #f9f6f0 0%, #f3ede5 100%);
  border: 1px solid rgba(201, 169, 110, 0.15);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16);
  cursor: zoom-in;
}

.carousel-image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carousel-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 24px;
  background: linear-gradient(180deg, transparent 0%, rgba(15, 15, 15, 0.26) 55%, rgba(15, 15, 15, 0.52) 100%);
  color: #fff;
  display: flex;
  align-items: flex-end;
}

.carousel-category {
  display: inline-flex;
  padding: 12px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  font-size: 0.86rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.carousel-copy {
  margin: 0;
  max-width: 86%;
  font-size: 1rem;
  line-height: 1.65;
}

.carousel-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.carousel-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.carousel-meta strong {
  font-size: 1.1rem;
}

.carousel-meta span {
  color: var(--text-muted);
}

.carousel-controls {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 999px;
  padding: 10px 14px;
  box-shadow: var(--shadow);
}

.carousel-controls button {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: var(--gold);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}

.carousel-controls span {
  min-width: 56px;
  text-align: center;
  font-weight: 600;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 4px;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.carousel-indicators button.active {
  background: rgba(255, 255, 255, 0.95);
  transform: scale(1.2);
}

@media (max-width: 860px) {
  .hero-carousel {
    min-height: auto;
  }

  .carousel-image {
    min-height: 320px;
  }
}
</style>
