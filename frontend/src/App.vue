<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import AuthBar from './components/auth/AuthBar.vue';
  import { onMounted } from 'vue';
  import { useAuthStore } from './stores/auth';

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.getProfile();
  })
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="header-container">
      <nav>
        <RouterLink to="/">Schedule</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/disciplines">Disciplines</RouterLink>
        <RouterLink to="/rules">Rules</RouterLink>
        <RouterLink to="/registration">Registration</RouterLink>
      </nav>
      <AuthBar class="authBar"></AuthBar>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.header-container {
  display: flex;
}

nav {
  width: 80%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.authBar {
  width: 20%;
  text-align: center;
  margin-top: 2rem;
}

@media (min-width: 1024px) {

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
