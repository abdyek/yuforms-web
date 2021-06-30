<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid>
                <sui-grid-row >
                    <sui-grid-column :computer="5" />
                    <sui-grid-column :computer="6" :mobile="16">
                        <sui-segment color="teal" :loading="loaded===false">
                            <sui-grid>
                                <sui-grid-row>
                                    <sui-grid-column :width="16" :stackable="true">
                                        <h3>Sign Up</h3>
                                        <sui-form>
                                            <sui-form-field :error="emailFieldError">
                                                <label>E-mail</label>
                                                <input placeholder="E-mail" type="email" @change="this.checkEmail" v-model="email" />
                                                <sui-label v-if="emailFieldError" basic color="red" pointing>Invalid email</sui-label>
                                            </sui-form-field>
                                            <sui-form-field :error="firstNameFieldError">
                                                <label>First Name</label>
                                                <input placeholder="First Name" type="text" v-model="firstName"/>
                                            </sui-form-field>
                                            <sui-form-field :error="lastNameFieldError">
                                                <label>Last Name</label>
                                                <input placeholder="Last Name" type="text" v-model="lastName"/>
                                            </sui-form-field>
                                            <sui-form-field :error="passwordFieldError">
                                                <label>Password</label>
                                                <input placeholder="Password" type="password" @change="this.checkPassword" v-model="password"/>
                                                <sui-label v-if="passwordFieldError" basic color="red" pointing>Length of password must be in 10-50 range</sui-label>
                                            </sui-form-field>
                                            <sui-form-field :error="passwordAgainFieldError">
                                                <label>Password Again</label>
                                                <input placeholder="Password Again" type="password" @change="this.checkPasswordAgain" v-model="passwordAgain"/>
                                                <sui-label v-if="passwordAgainFieldError" basic color="red" pointing>Password again is not equal password</sui-label>
                                            </sui-form-field>
                                        </sui-form>
                                    </sui-grid-column>
                                </sui-grid-row>
                            </sui-grid>
                            <sui-grid>
                                <sui-grid-row>
                                    <sui-grid-column :width="8" :stackable="true">
                                        <sui-button content="Sign In" color="blue" @click="goSignInPage"/>
                                    </sui-grid-column>
                                    <sui-grid-column :width="8" :stackable="true" @click="signUp">
                                        <sui-button content="Sign Up" floated="right" color="teal"/>
                                    </sui-grid-column>
                                </sui-grid-row>
                            </sui-grid>
                        </sui-segment>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import router from '@/router'
import {validateEmail} from '@/tools'
import { mapState } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'SignUp',
    methods: {
        goSignInPage() {
            router.push({name:'signIn'})
        },
        goVerifyEmailPage() {
            router.push({name:'verifyEmail'})
        },
        checkEmail() {
            this.emailFieldError = !(validateEmail(this.email))
        },
        checkPassword() {
            const len = this.password.length;
            this.passwordFieldError = (len<10 || len>50)
        },
        checkPasswordAgain() {
            this.passwordAgainFieldError = (this.password!==this.passwordAgain)
        },
        signUp() {
            if(this.emailFieldError===false &&
            this.firstNameFieldError===false &&
            this.lastNameFieldError===false &&
            this.passwordFieldError===false &&
            this.passwordAgainFieldError===false) {
                this.loaded = false
                axios.post('/api/signUp', {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    password: this.password
                }).then((response)=>{
                    if(response.data.state==='success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'You are registered successfully',
                            text: 'You have to verify your email to sign in',
                            showConfirmButton: true,
                        })
                        this.$store.commit('setVerifyEmailFromSignUp', true)
                        router.push({'name': 'verifyEmail'})
                    }
                }).catch((error)=>{
                    if(typeof error.response === 'undefined') {
                        console.log(error)
                    } else if(error.response.status===422) {
                        Swal.fire('Already Registered Email', 'This email registered already. If you forget your password reset password', 'error')
                    }
                }).then(()=>{
                    this.loaded = true
                })
            }
        }
    },
    computed: {
        ...mapState([
            'emailField',
            'passwordField'
        ]),
        email: {
            get() {
                return this.emailField
            },
            set(value) {
                this.$store.commit('setEmailField', value)
            }
        },
        password: {
            get() {
                return this.passwordField
            },
            set(value) {
                this.$store.commit('setPasswordField', value)
            }
        }
    },
    data() {
        return {
            loaded:true,
            emailFieldError:false,
            firstNameFieldError:false,
            lastNameFieldError:false,
            passwordFieldError:false,
            passwordAgainFieldError:false,
            firstName:"",
            lastName:"",
            passwordAgain:""
        }
    }
}
</script>
