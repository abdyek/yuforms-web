<template>
    <div id="yuforms-menu">
        <sui-button icon="plus" color="teal" @click="goNewFormPage"/>
        <sui-button icon="clipboard" color="blue" @click="goMyFormsPage" />
        <sui-button icon="user" @click="goMyProfilePage"/>
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
        }
    }
}
</script>
<style scoped>
#yuforms-menu {
    float:right;
}
</style>
