<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :computer="5" />
                    <sui-grid-column :computer="6" :mobile="16">
                        <sui-segment color="blue" :loading="formLoading">
                            <div v-if="type==='normal'">
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
                                <sui-grid>
                                    <sui-grid-row>
                                        <router-link class="yuforms-centered" to="/forgot-my-password">Forgot My Password</router-link>
                                    </sui-grid-row>
                                </sui-grid>
                            </div>
                            <div v-else-if="type==='2fa'">
                                <sui-grid>
                                    <sui-grid-row>
                                        <sui-grid-column :width="16" :stackable="true">
                                            <h3>Two-Factor Authentication</h3>
                                            <sui-form>
                                                <sui-form-field>
                                                    <label>E-mail</label>
                                                    <input placeholder="E-mail" type="email" v-model="email" :disabled="true" />
                                                </sui-form-field>
                                                <sui-form-field>
                                                    <label>Authentication Code</label>
                                                    <input placeholder="Authentication Code" v-model="authenticationCode"/>
                                                </sui-form-field>
                                                <sui-form-field>
                                                    <sui-button content="Sign In" floated="right" color="blue" @click.prevent="signInWith2FA" />
                                                </sui-form-field>
                                            </sui-form>
                                        </sui-grid-column>
                                    </sui-grid-row>
                                </sui-grid>
                            </div>
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
            errorMessage:"error message",
            type:"normal",
            authenticationCode: "",
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
                } else if(response.data.state==='2fa') {
                    this.type='2fa'
                    Swal.fire({
                        icon: 'info',
                        title: 'Two-Factor Authentication is Open',
                        text: 'Check your mail to authentication code',
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
        },
        signInWith2FA() {
            axios.patch('/api/login', {
                email:this.email,
                authenticationCode: this.authenticationCode
            }).then((response)=>{
                if(response.data.state==='success') {
                    this.$store.commit('setWho', response.data.who)
                    if(response.data.who==='member') {
                        this.$store.commit('setMember', response.data.info)
                    }
                    router.push({name: 'myForms'})
                }
            }).catch((error)=>{
                if(error.response.status===401) {
                    const reason = error.response.data.reason
                    if(reason === 'timeout'){
                        this.type="normal"
                        Swal.fire({
                            icon: 'error',
                            title: 'Timeout To Send Authentication',
                            text: 'You must sign in again',
                            showConfirmButton: true,
                        })
                    } else if(reason === 'code') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Incorrect Authentication Code',
                            showConfirmButton: true,
                        })
                    } else if(reason === 'trial') {
                        this.type="normal"
                        Swal.fire({
                            icon: 'error',
                            title: 'Your Trial Count Is Over',
                            text: 'You must sign in again',
                            showConfirmButton: true,
                        })
                    }
                }
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
