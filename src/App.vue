<template>
    <div id="app">
        <Header />
        <router-view/>
        <Footer />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'App',
    components: {
        Header,
        Footer
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.yuforms-container {
    padding:1.1rem;
}
.float-left {
    float:left;
}
.float-right {
    float:right;
}
.text-align-left {
    text-align:left;
}
.text-align-center {
    text-align:center !important;
}
</style>
