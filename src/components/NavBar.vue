<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="brand">
        <router-link to="/" class="logo-link">
          <img :src="logo" alt="Logotipo DIMENSIÓN" class="logo-image" />
        </router-link>
      </div>

      <nav class="catalog-nav" aria-label="NavegaciÃ³n del catÃ¡logo">
        <div class="nav-links">
          <router-link to="/">Inicio</router-link>
          <router-link v-for="item in catalogItems" :key="item.path" :to="item.path">
            {{ item.label }}
          </router-link>
        </div>

        <div class="catalog-dropdown">
          <button
            class="catalog-trigger"
            type="button"
            :aria-expanded="isMenuOpen"
            aria-haspopup="listbox"
            @click="isMenuOpen = !isMenuOpen"
          >
            <span>{{ selectedLabel }}</span>
            <i class="fas fa-chevron-down" :class="{ 'is-open': isMenuOpen }"></i>
          </button>

          <div v-if="isMenuOpen" class="catalog-options" role="listbox">
            <button
              v-for="item in menuItems"
              :key="item.path"
              class="catalog-option"
              type="button"
              :class="{ active: item.path === selectedPath }"
              role="option"
              :aria-selected="item.path === selectedPath"
              @click="goToCatalog(item.path)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </nav>

      <div class="social-icons">
        <a
          href="https://www.instagram.com/dimension.jewelry"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram DIMENSIÓN"
        >
          <i class="fab fa-instagram"></i>
        </a>
        <a
          href="https://www.facebook.com/dimension.jewelry"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook DIMENSIÓN"
        >
          <i class="fab fa-facebook-f"></i>
        </a>
        <a
          href="https://wa.me/5211234567890"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp DIMENSIÓN"
        >
          <i class="fab fa-whatsapp"></i>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logo from '../assets/logo.png'
import { categories } from '../data/catalog.js'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)

const shortLabels = {
  'duo-aretes-colgantes': 'Duo aretes',
  'arete-broquel': 'Broquel',
  'arete-huggies-arracadas': 'Huggies',
}

const catalogItems = computed(() =>
  categories.map((category) => ({
    path: `/categoria/${category.slug}`,
    label: shortLabels[category.slug] || category.name,
  })),
)

const menuItems = computed(() => [{ path: '/', label: 'Inicio' }, ...catalogItems.value])

const selectedPath = computed(() => route.path)
const selectedLabel = computed(() => menuItems.value.find((item) => item.path === selectedPath.value)?.label || 'CatÃ¡logo')

const goToCatalog = (path) => {
  isMenuOpen.value = false
  router.push(path)
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100vw;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(60, 52, 52, 0.08);
  box-shadow: 0 10px 30px rgba(47, 41, 40, 0.05);
}

.navbar-inner {
  max-width: var(--max-width);
  width: min(1200px, 100%);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 32px;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  color: var(--text);
}

.logo-image {
    width: 127px;
        height: auto;
    border-radius: 15px;  height: auto;
  object-fit: contain;
}


.catalog-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-links a {
  color: var(--text);
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.nav-links a:hover {
  color: var(--gold);
}

.catalog-dropdown {
  display: none;
  position: relative;
  width: min(420px, 100%);
}

.catalog-trigger {
  width: 100%;
  min-height: 50px;
  padding: 0 16px;
  border: 1px solid rgba(60, 52, 52, 0.12);
  border-radius: 16px;
  background: linear-gradient(180deg, #fff 0%, #fbf7f0 100%);
  color: var(--text);
  font: inherit;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(47, 41, 40, 0.06);
}

.catalog-trigger i {
  color: var(--gold);
  transition: transform 0.25s ease;
}

.catalog-trigger i.is-open {
  transform: rotate(180deg);
}

.catalog-options {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  z-index: 30;
  padding: 8px;
  border: 1px solid rgba(201, 169, 110, 0.48);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 24px 54px rgba(47, 41, 40, 0.18);
  display: grid;
  gap: 4px;
}

.catalog-option {
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
}

.catalog-option:hover,
.catalog-option.active {
  border-color: rgba(201, 169, 110, 0.38);
  background: var(--gold-soft);
}

.social-icons {
  display: flex;
  gap: 14px;
  flex-shrink: 0;
}

.social-icons a {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(60, 52, 52, 0.08);
  color: var(--text);
  background: #fff;
}

.social-icons a:hover {
  color: var(--gold);
  border-color: var(--gold);
}

.social-icons i {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .navbar-inner {
    flex-wrap: wrap;
    gap: 14px;
    padding: 14px 12px;
  }

  .catalog-nav {
    order: 3;
    width: 100%;
    flex: 0 0 100%;
  }

  .nav-links {
    display: none;
  }

  .catalog-dropdown {
    display: block;
    width: 100%;
  }

  .social-icons {
    margin-left: auto;
  }
}

@media (max-width: 480px) {
  .logo-image {
    width: 108px;
  }

  .social-icons a {
    width: 38px;
    height: 38px;
  }
}
</style>
