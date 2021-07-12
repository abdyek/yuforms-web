<template>
    <div>
        <InputText v-if="this.type==='input-text'" :placeholder="question.questionText" :questionId="question.id" :readOnly="readOnly"/>
        <InputSelect v-else-if="this.type==='input-radio'" :options="question.options" :questionId="question.id" :readOnly="readOnly"/>
        <InputSelect v-else-if="this.type==='input-checkboxes'" :single="false" :options="question.options" :questionId="question.id" :readOnly="readOnly"/>
    </div>
</template>
<script>
import InputText from '@/components/question/type/InputText.vue'
import InputSelect from '@/components/question/type/InputSelect.vue'
export default {
    name: 'TypeWrapper',
    props: {
        type: {
            type:String,
            required:true
        },
        question: {
            type:Object
        },
        readOnly: {
            type:Boolean,
            default:false
        }
    },
    components: {
        InputText,
        InputSelect
    }
}
</script>
