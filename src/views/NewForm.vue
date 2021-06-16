<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <FormTitle />
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :stackable="true">
                        <NewQuestion v-for="(que, key) in newFormModel.questions" :newQuestionModel="que" :key="key" :id="key" />
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="8">
                        <sui-button icon="plus" color="teal" size="big" />
                    </sui-grid-column>
                    <sui-grid-column :width="8">
                        <div class="float-right">
                            <sui-button color="blue" content="Create Form" size="big" />
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import Vuex from 'vuex'
import FormTitle from '@/components/FormTitle.vue'
import NewQuestion from '@/components/question/NewQuestion.vue'
export default {
    name: 'NewForm',
    computed: {
        ...Vuex.mapState([
            'newFormModel'
        ])
    },
    components: {
        FormTitle,
        NewQuestion
    }
}
</script>
