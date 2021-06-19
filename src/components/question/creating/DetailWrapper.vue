<template>
    <div>
        <div v-if="detailType==='empty'">
        </div>
        <div v-else-if="detailType==='options'">
            <QuestionDetailTypeOptions :questionId="questionId"/>
        </div>
    </div>
</template>
<script>
import {default as QuestionDetailTypeOptions} from '@/components/question/creating/Options.vue' 
export default {
    name: 'DetailWrapper',
    props: {
        detailType: {
            type: String,
            required: true
        },
        questionId: {
            type:Number,
            required:true
        }
    },
    components: {
        QuestionDetailTypeOptions,
    }
}
</script>
