<template>
    <sui-grid>
        <sui-grid-row :size="1">
            <sui-grid-column>
                <Question v-for="question in questions" :question="question" :key="question.id" :readOnly="readOnly" />
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
</template>
<script>
import Question from '@/components/question/Question.vue'
import { generateEmptyAnswers } from '@/tools'
export default {
    name: 'Questions',
    props: {
        readOnly: {
            type:Boolean,
            default:false
        },
        questions: {
            type:Array,
            required:true
        },
        layout:{
            type:Boolean,
            default:false
        }
    },
    mounted() {
        if(this.layout===true) {
            this.$store.commit('setAnswers', generateEmptyAnswers(this.questions))
        }
    },
    components: {
        Question
    },
}
</script>
