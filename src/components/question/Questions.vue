<template>
    <sui-grid>
        <sui-grid-row :size="1">
            <sui-grid-column>
                <Question v-for="question in questions" :question="question" :key="question.id" />
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
</template>
<script>
import Question from '@/components/question/Question.vue'
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
        }
    },
    components: {
        Question
    },
}
</script>
