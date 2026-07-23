<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
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
</style>
