<template>
    <sui-segment raised color="teal">
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="8" :stackable="true">
                    <div v-if="this.newQuestionLabelVisible && newQuestionModel.forUI.new" class="new-question-label">
                        <a is="sui-label" color="blue" ribbon>
                            New
                        </a>
                    </div>
                    <contenteditable tag="h4" :contenteditable="true" v-model="questionText" :noNL="true" :noHTML="true" />
                </sui-grid-column>
                <sui-grid-column :width="8" :stackable="true">
                    <div class="float-right">
                        <sui-button v-if="newQuestionModel.forUI.new===false" icon="trash" color="red" @click="deleteQuestion" />
                        <sui-button v-else icon="x icon" color="yellow" @click="cancelQuestion"/>
                    </div>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="16">
                    <DetailWrapper :detailType="detailType" :questionId="id"/>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="8">
                    <div class="float-left">
                        <QuestionSelector :questionId="id" :disabled="this.newQuestionModel.forUI.new===false" />
                    </div>
                </sui-grid-column>
                <sui-grid-column :width="8">
                    <div class="float-right">
                        <div class="right-bottom">
                            <sui-icon name="arrows alternate" color="teal" size="large"/>
                        </div>
                    </div>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </sui-segment>
</template>
<script>
import Vuex from 'vuex'
import QuestionSelector from '@/components/question/QuestionSelector.vue'
import DetailWrapper from '@/components/question/creating/DetailWrapper.vue'
export default {
    name: "QuestionEditor",
    props: {
        id: {
            type:Number
        },
        newQuestionModel: {
            type:Object
        },
        newQuestionLabelVisible: {
            type:Boolean,
            default:false
        }
    },
    computed: {
        detailType() {
            const componentType = this.newQuestionModel.formComponentType
            return (componentType==='input-radio' || componentType==='input-checkboxes')?'options':'empty'
        },
        questionText: {
            get() {
                return this.newQuestionModel.questionText
            },
            set(value) {
                this.setQuestionText({'questionId': this.id, 'questionText': value})
            }
        }
    },
    methods: {
        ...Vuex.mapActions([
            'removeNewQuestion',
            'setQuestionText'
        ]),
        saveQuestion() {
            console.log("kayıt işlemi")
        },
        deleteQuestion() {
            this.$emit('changeNoticeToDelete')
            this.removeNewQuestion({'questionId': this.id})
        },
        cancelQuestion() {
            this.removeNewQuestion({'questionId': this.id})
        }
    },
    components: {
        QuestionSelector,
        DetailWrapper
    }
}
</script>
<style scoped>
h4 {
    margin-top:0;
    text-align:left;
    float:left;
}
.right-bottom {
    position: absolute;
    bottom:0;
    right:0;
    margin-right:1rem;
}
.new-question-label {
    float:left;
}
</style>
