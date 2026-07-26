<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view />
    </main>
    <a
      class="whatsapp-float"
      :href="socialLinks.whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat de WhatsApp 24 horas"
    >
      <i class="fab fa-whatsapp"></i>
    </a>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import { socialLinks } from './data/contact.js'
</script>

<style>
@import '@fortawesome/fontawesome-free/css/all.min.css';

:root {
  color-scheme: light;
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(180deg, #faf7f3 0%, #f4f0eb 100%);
  overflow-x: hidden;
}

#app {
  width: 100vw;
  max-width: 100vw;
  margin: 0 auto;
  min-height: 100vh;
  overflow-x: hidden;
}

main {
  padding-top: 6px;
}

.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 999px;
  background: #25d366;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
  text-decoration: none;
}

.whatsapp-float i {
  font-size: 1.15rem;
}

.whatsapp-float span {
  display: inline-block;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .whatsapp-float {
    right: 16px;
    bottom: 16px;
    padding: 12px 16px;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .whatsapp-float {
    width: calc(17% - 32px);
    justify-content: center;
    right: 16px;
    left: 16px;
    bottom: 16px;
  }
}
</style>
