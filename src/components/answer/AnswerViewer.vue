<template>
    <sui-grid>
        <sui-grid-row>
            <sui-grid-column>
                <Questions :readOnly="true" :questions="questionModels"/>
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
</template>
<script>
import { mapState } from 'vuex'
import Questions from '@/components/question/Questions.vue'
export default {
    name: 'AnswerViewer',
    computed: {
        ...mapState([
            'questionModels'
        ])
    },
    components: {
        Questions
    }
}
</script>
