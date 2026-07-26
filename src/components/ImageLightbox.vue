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
        <img :src="currentSlide.image" :alt="currentSlide.alt" />
        <figcaption v-if="currentSlide.title">{{ currentSlide.title }}</figcaption>

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
      </figure>
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
})

const emit = defineEmits(['close', 'update:currentIndex'])

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
let hintTimeout = null

const hideSwipeHint = () => {
  clearTimeout(hintTimeout)
  showSwipeHint.value = false
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
  max-height: 84vh;
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
    max-height: 78vh;
    border-radius: 14px;
  }
}
</style>
