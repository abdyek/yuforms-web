<template>
    <sui-form>
        <sui-form-field>
            <label>Question Type</label>
            <sui-dropdown
                placeholder="Question Type"
                selection
                :options="options"
                v-model="type"
            />
        </sui-form-field>
    </sui-form>
</template>
<script>
import Vuex from 'vuex'
export default {
    name: "QuestionSelector",
    props: {
        questionId: {
            type:Number
        }
    },
    data() {
        return {
            options: [
                {
                    text:'Short question',
                    value:'input-text'
                },
                {
                    text:'Select',
                    value:'input-radio'
                },
                {
                    text:'Multi select',
                    value:'input-checkboxes'
                },
            ]
        }
    },
    methods: {
        ...Vuex.mapActions([
            'setNewQuestionType'
        ])
    },
    computed: {
        ...Vuex.mapState([
            'newFormModel'
        ]),
        type: {
            get() {
                return this.newFormModel.questions[this.questionId].formComponentType
            },
            set(type){
                this.setNewQuestionType({'questionId': this.questionId, 'type': type})
            }
        }
    }
}
</script>
<style scoped>
label {
    float:left;
}
</style>
