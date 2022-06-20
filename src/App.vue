<template>
  <div id="app">
    <!-- componente Navbar com re-rendering -->
    <Navbar :key="$route.fullPath" />
      <div class="container">
        <router-view/>
      </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
    name: 'app',
    components: {
        Navbar
    }
}

</script>