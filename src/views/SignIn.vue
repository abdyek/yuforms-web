<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :computer="5" />
                    <sui-grid-column :computer="6" :mobile="16">
                        <sui-segment color="blue" :loading="formLoading">
                            <sui-grid>
                                <sui-grid-row>
                                    <sui-grid-column :width="16" :stackable="true">
                                        <h3>Sign In</h3>
                                        <sui-form>
                                            <sui-form-field>
                                                <label>E-mail</label>
                                                <input placeholder="E-mail" type="email" v-model="email" />
                                            </sui-form-field>
                                            <sui-form-field>
                                                <label>Password</label>
                                                <input placeholder="Password" type="password" v-model="password"/>
                                            </sui-form-field>
                                        </sui-form>
                                    </sui-grid-column>
                                </sui-grid-row>
                            </sui-grid>
                            <sui-grid>
                                <sui-grid-row>
                                    <sui-grid-column :width="8" :stackable="true">
                                        <sui-button content="Sign Up" color="teal" @click="goSignUpPage"/>
                                    </sui-grid-column>
                                    <sui-grid-column :width="8" :stackable="true">
                                        <sui-button content="Sign In" floated="right" color="blue" @click="sendRequest"/>
                                    </sui-grid-column>
                                </sui-grid-row>
                            </sui-grid>
                        </sui-segment>
                    </sui-grid-column>
                    <sui-grid-column :computer="5" />
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import router from '@/router'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'SignIn',
    data() {
        return {
            formLoading:false,
            errorMessageShow:false,
            errorMessage:"error message"
        }
    },
    computed: {
        email: {
            get() {
                return this.$store.state.emailField
            },
            set(value) {
                this.$store.commit('setEmailField', value)
            }
        },
        password: {
            get() {
                return this.$store.state.passwordField
            },
            set(value) {
                this.$store.commit('setPasswordField', value)
            }
        }
    },
    methods: {
        goSignUpPage() {
            router.push({name:'signUp'})
        },
        sendRequest() {
            this.formLoading=true
            axios.post('api/login', {
                "email":this.email,
                "password":this.password
            }).then((response)=>{
                if(response.data.state==='success') {
                    this.$store.commit('setWho', response.data.who)
                    if(response.data.who==='member') {
                        this.$store.commit('setMember', response.data.info)
                    }
                    router.push({name: 'myForms'})
                } else if(response.data.state==='fail') {
                    this.$store.commit('setVerifyEmailFromSignUp', true)
                    router.push({'name': 'verifyEmail'})
                    Swal.fire({
                        icon: 'error',
                        title: 'Not Email Verified',
                        text: 'You have to verify your email to sign in',
                        showConfirmButton: true,
                    })
                }
            }).catch((error)=>{
                if(typeof error.response ==='undefined') {
                    console.log(error)
                    return
                }
                const code = error.response.status
                if(code===401 || code===400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Incorrect Email or Password',
                        showConfirmButton: true,
                    })
                } else if(code===403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Already Signed Id',
                        showConfirmButton: true,
                    })
                } 
            }).then(()=>{
                this.formLoading = false
            })
        }
    }
}
</script>
<style>
.sign-in-title {
    text-align:center;
}
</style>
