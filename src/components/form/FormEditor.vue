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
                            <draggable :list="questions" handle=".handle">
                                <QuestionEditor v-for="(que, key) in questions" :newQuestionModel="que" :key="key" :id="key" :newQuestionLabelVisible="newQuestionLabelVisible" @changeNoticeToDelete="changeNoticeToDelete"/>
                            </draggable>
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
                                <sui-button v-if="this.new===true" color="blue" content="Create Form" size="big" @click="createForm" />
                                <sui-button v-else  color="green" content="Edit Form" size="big" @click="editFormWrapper" />
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
import { newFormModelFromFormResponse, preparePutFormRequest } from '@/tools'
import draggable from 'vuedraggable'
export default {
    name: 'FormEditor',
    props: {
        new:{
            type:Boolean,
            default:true
        },
        formSlug: {
            type:String
        }
    },
    data() {
        return {
            loaded: true,
            formModel:{},
            noticeToDelete:false,
            willBeDeletedCount:0
        }
    },
    computed: {
        ...mapState([
            'newFormModel'
        ]),
        newQuestionLabelVisible() {
            return this.new===false
        },
        questions: {
            get() {
                return this.newFormModel.questions
            },
            set(value) {
                this.$store.commit('setNewFormModelQuestions', {'questions': value})
            }
        }
    },
    mounted() {
        if(this.new===false) {
            this.loaded = false
            axios.get('/api/form', {
                params: {
                    slug: this.formSlug
                }
            }).then((response)=>{
                if(response.data.form.stillShared===true) {
                    this.$router.push({'name': 'form', params:{'formSlug': this.$route.params.formSlug}})
                }
                const newForm = newFormModelFromFormResponse(response.data)
                this.setNewFormModel({'model':newForm})
            }).catch((error)=>{
                if(error.response.status===404) {
                    this.$router.push({'name': 'notFound'})
                }
            }).then(()=>{
                this.loaded = true
            })
        }
    },
    methods: {
        ...mapActions([
            'addNewQuestion',
            'setDefaultNewFormModel',
            'setNewFormModel'
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
        },
        editFormWrapper() {
            if(this.noticeToDelete===true) {
                this.editFormWithNotice()
            } else {
                this.editForm()
            }
        },
        editFormWithNotice() {
            Swal.fire({
                title: 'Do you want to change?',
                text: "You removed " + this.willBeDeletedCount + " questions. If you change the form questions will be deleted with answers",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, change it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.editForm()
                }
            })
        },
        editForm() {
            this.loaded = true
            const newFormModel = clone(this.newFormModel)
            axios.put('/api/form', 
                preparePutFormRequest(newFormModel)
            ).then(()=>{
                this.loaded = true
                this.setDefaultNewFormModel()
                this.$router.push({'name': 'form', params:{'formSlug': this.$route.params.formSlug}})
            }).catch((error)=>{
                if(error.response.status===422) {
                    Swal.fire('You cannot change open forms', 'Please stop sharing to change it')
                } else if(error.response.status===403) {
                    Swal.fire('403', 'You are not authorized for it. Are you sure you are sign in?', 'error')
                } else if(error.response.status===404) {
                    Swal.fire('404', 'Not found the form', 'error')
                }
            })
        },
        changeNoticeToDelete() {
            this.noticeToDelete = true
            this.willBeDeletedCount++
        }
    },
    components: {
        FormTitle,
        QuestionEditor,
        Loading,
        draggable
    }
}
</script>
