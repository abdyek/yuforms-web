<template>
    <div id="yuforms-menu">
        <div v-if="who==='member'">
            <sui-button icon="plus" color="teal" @click="goNewFormPage"/>
            <sui-button icon="clipboard" color="blue" @click="goMyFormsPage" />
            <sui-button icon="user" @click="goMyProfilePage"/>
        </div>
        <div v-else>
            <sui-button icon="sign-in" color="teal" @click="goSignInPage" />
        </div>
    </div>
</template>
<script>
import router from '@/router'

export default {
    name: 'Menu',
    methods: {
        goNewFormPage() {
            router.push({name: 'newForm'})
        },
        goMyFormsPage() {
            router.push({name: 'myForms'})
        },
        goMyProfilePage() {
            router.push({name: 'myProfile'})
        },
        goSignInPage() {
            router.push({name: 'signIn'})
        }
    },
    computed: {
        who() {
            return this.$store.state.who
        }
    }
}
</script>
<style scoped>
#yuforms-menu {
    float:right;
}
</style>
