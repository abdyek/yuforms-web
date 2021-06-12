<template>
    <div>
        <div v-if="detailType==='empty'">
        </div>
        <div v-else-if="detailType==='options'">
            <QuestionDetailTypeOptions />
        </div>
    </div>
</template>
<script>
import {default as QuestionDetailTypeOptions} from '@/components/questionDetailTypes/Options.vue' 
export default {
    name: 'QuestionCreatingDetailWrapper',
    props: {
        detailType: {
            type: String,
            required: true
        }
    },
    components: {
        QuestionDetailTypeOptions,
    }
}
</script>
