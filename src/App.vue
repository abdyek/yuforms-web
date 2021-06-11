<template>
    <div id="app">
        <YuformsHeader />
        <router-view/>
        <YuformsFooter />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
  </div>
</template>

<script>
import YuformsHeader from './components/YuformsHeader.vue'
import YuformsFooter from './components/YuformsFooter.vue'

export default {
    name: 'App',
    components: {
        YuformsHeader,
        YuformsFooter
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 9000px;
}
</style>
