<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Events } from '@wailsio/runtime';

Events.On('time', () => {}); // Dummy event to keep the runtime alive
</script>
<template>
  <div class="app-layout">
    <header >
      <h1>PDM Notes</h1>
      <nav>
        <RouterLink to="/wails-tests">Wails 3</RouterLink>
        <RouterLink to="/database">Database</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-width: 800px; /* Minimum width for the entire app */
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

header {
  width: 200px; /* Fixed width for sidebar */
  min-width: 200px; /* Prevent sidebar from shrinking */
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-top: 8rem;
  border-right: 1px solid var(--color-border);
  background-color: var(--color-background-trans);
  --wails-draggable: drag;
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}

.content {
  flex: 1;
  overflow-y: auto; /* Allow content to scroll if needed */
  min-width: 600px; /* Minimum width for content area */
  height: 100%;
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

nav a {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  white-space: nowrap; /* Prevent text wrapping in navigation */
}

nav a:hover {
  background-color: var(--color-background-soft);
}

nav a.router-link-exact-active {
  color: var(--color-text);
  background-color: var(--color-background-mute);
}

</style>
