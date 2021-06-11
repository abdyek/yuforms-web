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
    name: 'YuformsMenu',
    methods: {
        goNewFormPage() {
            if(router.currentRoute.name!=='newForm') {
                router.push({name:'newForm'})
            }
        },
        goMyFormsPage() {
            if(router.currentRoute.name!=='myForms') {
                router.push({name:'myForms'})
            }
        },
        goMyProfilePage() {
            if(router.currentRoute.name!=='myProfile') {
                router.push({name:'myProfile'})
            }
        },
    }
}
</script>
<style scoped>
#yuforms-menu {
    float:right;
}
</style>
