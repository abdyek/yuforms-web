<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <FormCard :model="formModel" v-if="loaded">
                            <sui-grid>
                                <sui-grid-row>
                                    <sui-grid-column>
                                        <sui-tab>
                                            <sui-tab-pane title="Questions">
                                                <Questions :readOnly="true" :questions="questionModels"/>
                                            </sui-tab-pane>
                                            <sui-tab-pane title="Answers" :disabled="emptyShare">
                                                <Shares />
                                            </sui-tab-pane>
                                        </sui-tab>
                                    </sui-grid-column>
                                </sui-grid-row>
                            </sui-grid>
                        </FormCard>
                        <sui-grid v-else>
                            <sui-grid-row>
                                <sui-grid-column :width="16" :stackable="true">
                                    <sui-grid :centered="true">
                                        <Loading />
                                    </sui-grid>
                                </sui-grid-column>
                            </sui-grid-row>
                        </sui-grid>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import FormCard from '@/components/form/FormCard.vue'
import Questions from '@/components/question/Questions.vue'
import Shares from '@/components/share/Shares.vue'
import Loading from '@/components/Loading.vue'
export default {
    name: 'Form',
    computed: {
        ...mapState([
            'formModel',
            'questionModels',
            'shareModels'
        ]),
        emptyShare() {
            return this.shareModels.length === 0
        }
    },
    data() {
        return {
            loaded:false
        }
    },
    components:{
        FormCard,
        Questions,
        Shares,
        Loading
    },
    methods: {
        ...mapActions([
            'fetchModel'
        ])
    },
    mounted() {
        this.fetchModel({'slug': this.$route.params.formSlug, 'handle404Func': ()=>{this.$router.push({'name': 'notFound'})}}).then(()=>{
            this.loaded = true
        })
    }
}
</script>
