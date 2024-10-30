<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/quiz">Quiz</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #4CAF50; /* Couleur des liens */
}

nav a:hover {
  text-decoration: underline; /* Souligner au survol */
}
</style>