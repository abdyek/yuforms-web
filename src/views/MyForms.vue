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
        <div v-if="loaded===true">
            <sui-grid v-for="(model, index) in this.myFormsModels" :key="model.id">
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <FormCard :model="model" :index="index"/>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>
        <div v-else>
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <sui-grid :centered="true">
                            <Loading />
                        </sui-grid>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>
        
    </sui-container>
</template>
<script>
import Vuex from 'vuex'
import FormCard from '@/components/form/FormCard.vue'
import Loading from '@/components/Loading.vue'
export default {
    name: 'MyForms',
    computed: {
        ...Vuex.mapState([
            'myFormsModels'
        ])
    },
    data() {
        return {
            loaded:false
        }
    },
    methods: {
        ...Vuex.mapActions([
            'updateMyFormsModels',
            'fetchMyForms'
        ]),
    },
    components:{
        FormCard,
        Loading
    },
    mounted() {
        this.fetchMyForms().then(()=>{
            this.loaded = true
        })
    }
}
</script>
