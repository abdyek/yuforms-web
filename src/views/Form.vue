<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <FormCard :model="formModel.form">
                            <sui-grid>
                                <sui-grid-row>
                                    <sui-grid-column>
                                        <sui-tab>
                                            <sui-tab-pane title="Questions">
                                                <Questions :readOnly="true" :questions="formModel.questions"/>
                                            </sui-tab-pane>
                                            <sui-tab-pane title="Answers">
                                                Answers will be here
                                            </sui-tab-pane>
                                        </sui-tab>
                                    </sui-grid-column>
                                </sui-grid-row>
                            </sui-grid>
                        </FormCard>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import Vuex from 'vuex'
import FormCard from '@/components/form/FormCard.vue'
import Questions from '@/components/question/Questions.vue'
export default {
    name: 'Form',
    computed: {
        ...Vuex.mapState([
            'formModel'
        ])
    },
    components:{
        FormCard,
        Questions
    }
}
</script>
