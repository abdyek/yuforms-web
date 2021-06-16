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
import {default as QuestionDetailTypeOptions} from '@/components/question/creating/Options.vue' 
export default {
    name: 'DetailWrapper',
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
