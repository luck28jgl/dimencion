<template>
  <Teleport to="body">
    <div v-if="open" class="lightbox" role="dialog" aria-modal="true" @click.self="$emit('close')">
      <button class="lightbox-close" type="button" aria-label="Cerrar imagen" @click="$emit('close')">
        <i class="fas fa-times"></i>
      </button>

      <figure class="lightbox-content">
        <img :src="src" :alt="alt" />
        <figcaption v-if="title">{{ title }}</figcaption>
      </figure>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
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
})

defineEmits(['close'])
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
}

.lightbox-content img {
  width: 100%;
  max-height: 84vh;
  object-fit: contain;
  border-radius: 18px;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.36);
  background: #fff;
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
}

.lightbox-close:hover {
  background: var(--gold);
  color: #fff;
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
