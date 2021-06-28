<template>
    <div>
        <sui-form>
            <sui-form-field>
                <input type="text" :placeholder="this.placeholder" v-model="answer"/>
            </sui-form-field>
        </sui-form>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import clone from 'just-clone'
export default {
    name: 'InputText',
    props: {
        placeholder: {
            type:String,
            default:""
        },
        questionId: {
            type: Number
        }
    },
    methods: {
        ...mapActions([
            'setAnswers'
        ])
    },
    computed: {
        ...mapState([
            'answers'
        ]),
        answer: {
            get() {
                return (typeof this.answers[this.questionId]==='undefined')?'':this.answers[this.questionId]
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
