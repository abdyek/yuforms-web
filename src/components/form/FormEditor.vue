<template>
    <div>
        <sui-container class="yuforms-container">
            <div v-if="loaded">
                <sui-grid>
                    <sui-grid-row>
                        <sui-grid-column :width="16" :stackable="true">
                            <FormTitle />
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
                <sui-grid>
                    <sui-grid-row>
                        <sui-grid-column :stackable="true">
                            <QuestionEditor v-for="(que, key) in newFormModel.questions" :newQuestionModel="que" :key="key" :id="key" :newQuestionLabelVisible="newQuestionLabelVisible"/>
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
                <sui-grid>
                    <sui-grid-row>
                        <sui-grid-column :width="8">
                            <sui-button icon="plus" color="teal" size="big" @click="this.addNewQuestion" />
                        </sui-grid-column>
                        <sui-grid-column :width="8">
                            <div class="float-right">
                                <sui-button color="blue" content="Create Form" size="big" @click="createForm" />
                            </div>
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
            </div>
            <sui-grid v-else>
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <sui-grid :centered="true">
                            <Loading />
                        </sui-grid>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import FormTitle from '@/components/FormTitle.vue'
import QuestionEditor from '@/components/question/QuestionEditor.vue'
import Loading from '@/components/Loading.vue'
import clone from 'just-clone'
import Swal from 'sweetalert2'
export default {
    name: 'FormEditor',
    props: {
        new:{
            type:Boolean,
            default:true
        }
    },
    data() {
        return {
            loaded: true
        }
    },
    computed: {
        ...mapState([
            'newFormModel'
        ]),
        newQuestionLabelVisible() {
            return this.new===false
        }
    },
    methods: {
        ...mapActions([
            'addNewQuestion',
            'setDefaultNewFormModel'
        ]),
        createForm() {
            this.loaded = false
            const newFormModel = clone(this.newFormModel)
            for(let i=0;i<newFormModel.questions.length;i++) {
                delete newFormModel.questions[i].forUI
                const type = newFormModel.questions[i].formComponentType
                if(type==='input-radio' || type==='input-checkboxes') {
                    newFormModel.questions[i].options.splice(-1,1)
                }
            }
            return axios.post('/api/form',
                newFormModel
            ).then((response)=>{
                this.loaded = true
                this.setDefaultNewFormModel()
                const slug = response.data.formSlug
                this.$router.push({'name': 'form', params:{'formSlug': slug}})
            }).catch((error)=>{
                if(error.response.status===403) {
                    Swal.fire('403', 'You are not authorized for it. Are you sure you are sign in?', 'error')
                } else if(error.reponse.status===400) {
                    Swal.fire('400', 'Bad request', 'error')
                }
                this.loaded = true
            })
        }
    },
    components: {
        FormTitle,
        QuestionEditor,
        Loading
    }
}
</script>
