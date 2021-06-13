<template>
    <sui-container class="yuforms-container">
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="16" :stackable="true">
                    <h1>My Forms</h1>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        <sui-grid v-if="this.myFormsModels.length===0">
            <sui-grid-row>
                <sui-grid-column :width="16" :stackable="true">
                    <sui-message color="orange">
                        <sui-message-header>Empty</sui-message-header>
                        <p>There isn't any form created by you</p>
    </sui-message>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        <sui-grid v-for="model in this.myFormsModels" :key="model.id">
            <sui-grid-row>
                <sui-grid-column :width="16" :stackable="true">
                    <FormCard :model="model"/>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </sui-container>
</template>
<script>
import Vuex from 'vuex'
import FormCard from '@/components/form/FormCard.vue'
export default {
    name: 'MyForms',
    computed: {
        ...Vuex.mapState([
            'myFormsModels'
        ])
    },
    components:{
        FormCard,
    }
}
</script>
