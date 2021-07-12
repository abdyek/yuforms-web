<template>
    <div>
        <sui-form>
            <sui-form-fields grouped>
                <div v-if="single===true">
                    <sui-form-field v-for="(opt, index) in options" :key="index">
                        <sui-checkbox :radio="true" :name="questionId.toString()" :label="opt.text" :value="opt.id.toString()" v-model="answer" :disabled="readOnly"/>
                    </sui-form-field>
                </div>
                <div v-else>
                    <sui-form-field v-for="(opt, index) in options" :key="index">
                        <sui-checkbox :radio="false" :name="questionId.toString()" :label="opt.text" :value="opt.id.toString()" v-model="answers[questionId][opt.id]" @change="change(questionId, opt.id, answers[questionId][opt.id])" :disabled="readOnly"/>
                    </sui-form-field>
                </div>
            </sui-form-fields>
        </sui-form>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import clone from 'just-clone'
export default {
    name: 'InputSelect',
    props: {
        single: {
            type:Boolean,
            default:true
        },
        options: {
            type:Array,
            required:true
        },
        questionId: {
            type:Number
        },
        readOnly: {
            type:Boolean,
            default:false
        }
    },
    methods: {
        ...mapActions([
            'setAnswers'
        ]),
        change(questionId, optionId, value) {
            const answers = clone(this.answers)
            answers[questionId][optionId] = value
            this.setAnswers(answers)
        }
    },
    computed: {
        ...mapState([
            'answers'
        ]),
        answer: {
            get() {
                return this.answers[this.questionId]
            },
            set(value) {
                const answers = clone(this.answers)
                answers[this.questionId] = value
                this.setAnswers(answers)
            }
        }
    }
}
</script>
