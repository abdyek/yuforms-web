<template>
    <div id="app">
        <Welcome v-if="loaded===false"/>
        <div v-else>
            <Header />
            <router-view/>
        </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Welcome from '@/components/Welcome.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'App',
    data() {
        return {
            loaded:false
        }
    },
    components: {
        Header,
        Welcome
    },
    mounted() {
        axios.get('/api/me').then((response)=>{
            this.$store.commit('setWho', response.data.who)
            if(response.data.who==='member') {
                this.$store.commit('setMember', response.data.info)
            }
            this.loaded = true
        }).catch((error)=>{
            console.log(error)
            Swal.fire('Oops...', 'Something went wrong!', 'error')
        })
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
