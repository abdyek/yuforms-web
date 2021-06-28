<template>
    <sui-container class="yuforms-container">
        <div v-if="loaded">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <h1>{{this.formModel.name}}</h1>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <Questions :questions="questionModels"/>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16">
                        <div class="float-right">
                            <sui-button v-if="submitted===false" content="Submit" color="green" @click="submit"/>
                            <sui-button v-else content="Edit" color="green" @click="editSubmit" />
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
</template>
<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import Loading from '@/components/Loading.vue'
import Questions from '@/components/question/Questions.vue'
import { generateEmptyAnswers, prepareToSendSubmit } from '@/tools'
import Swal from 'sweetalert2'
export default {
    name: 'Submit',
    data() {
        return {
            loaded:false
        }
    },
    mounted() {
        axios.get('/api/submit', {
            params: {
                formSlug: this.$route.params.formSlug
            }
        }).then((response)=>{
            this.$store.commit('setFormModel', response.data.form)
            this.$store.commit('setQuestionModels', {'questions':response.data.questions})
            this.$store.commit('setSubmitted', response.data.submitted)
            this.$store.commit('setAnswers', generateEmptyAnswers(response.data.questions))
            if(response.data.submitted===true) {
                this.fillAnswers(response.data.answers)
            }
            this.loaded = true
        }).catch((error)=>{
            if(typeof error.response === 'undefined') { 
                console.log(error)
            } else if(error.response.status===404 || error.reponse.status===403) {
                this.$router.push({name: 'notFound'})
            }
        })
    },
    computed: {
        ...mapState([
            'formModel',
            'questionModels',
            'submitted'
        ])
    },
    methods: {
        ...mapActions([
            'fillAnswers',
        ]),
        submit() {
            this.loaded = false;
            axios.post('/api/submit', {
                formSlug: this.$route.params.formSlug,
                answers: prepareToSendSubmit(this.$store.state.answers)
            }).then((response)=>{
                if(response.data.state==='success') {
                    this.$store.commit('setSubmitted', true)
                    Swal.fire({
                        icon: 'success',
                        title: 'Submitted Form Successfully',
                        showConfirmButton: true,
                    })
                }
            }).catch((error)=>{
                console.log(error)
                if(error.response.status===422) {
                    Swal.fire('Available Submit', 'If you want to change this submit you must edit it', 'error')
                } else if(error.reponse.status===404) {
                    Swal.fire('Form Not Found', 'There is not form submittable', 'error')
                } else if(error.reponse.status===403) {
                    Swal.fire('403', 'You are not authorized', 'error')
                }
            }).then(()=>{
                this.loaded = true
            })
        },
        editSubmit() {
            this.loaded = false
            axios.put('/api/submit', {
                formSlug: this.$route.params.formSlug,
                answers: prepareToSendSubmit(this.$store.state.answers)
            }).then((response)=>{
                if(response.data.state==='success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Edited Form Successfully',
                        showConfirmButton: true,
                    })
                }
            }).catch((error)=>{
                if(error.response.status===404) {
                    Swal.fire('Form Not Found', 'There is not form editable', 'error')
                } else if(error.response.status===403) {
                    Swal.fire('403', 'You are not authorized', 'error')
                }
            }).then(()=>{
                this.loaded = true
            })
        }
    },
    components: {
        Loading,
        Questions
    }
}
</script>
