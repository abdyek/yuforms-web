<template>
  <div id="app">
    <YuformsHeader />
    <YuformsContent />
    <YuformsFooter />
  </div>
</template>

<script>
import YuformsHeader from './components/YuformsHeader.vue'
import YuformsContent from './components/YuformsContent.vue'
import YuformsFooter from './components/YuformsFooter.vue'

export default {
  name: 'App',
  components: {
    YuformsHeader,
    YuformsContent,
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
