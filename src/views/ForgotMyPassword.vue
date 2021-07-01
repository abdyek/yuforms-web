<template>
    <sui-container class="yuforms-container">
        <sui-grid>
            <sui-grid-row >
                <sui-grid-column :computer="5" />
                <sui-grid-column :computer="6" :mobile="16">
                    <sui-segment color="teal" :loading="loaded===false">
                        <sui-grid>
                            <sui-grid-row>
                                <sui-grid-column :width="16" :stackable="true">
                                    <h3>Forgot My Password</h3>
                                    <div v-if="type==='normal'">
                                        <sui-form>
                                            <sui-form-field :error="invalidEmail">
                                                <label>E-mail</label>
                                                <input placeholder="E-mail" v-model="email" @input="checkEmail" />
                                                <sui-label v-if="invalidEmail" basic color="red" pointing>Invalid Email</sui-label>
                                            </sui-form-field>
                                            <sui-button class="float-right" @click.prevent="sendEmail" color="green">Send Recovery Email</sui-button>
                                        </sui-form>
                                    </div>
                                    <div v-else-if="type==='codeField'">
                                        <sui-form>
                                            <sui-form-field>
                                                <label>E-mail</label>
                                                <input placeholder="E-mail" v-model="email" @input="checkEmail" :disabled="true" />
                                            </sui-form-field>
                                            <sui-form-field>
                                                <label>Recovery Code</label>
                                                <input placeholder="Recovery Code" type="text" v-model="recoveryCode" />
                                            </sui-form-field>
                                            <sui-form-field :error="invalidNewPassword">
                                                <label>New Password</label>
                                                <input placeholder="New Password" type="password" v-model="newPassword" @input="checkPasswords" />
                                                <sui-label v-if="invalidNewPassword" basic color="red" pointing>Invalid Password</sui-label>
                                            </sui-form-field>
                                            <sui-form-field :error="invalidNewPasswordAgain">
                                                <label>New Password Again</label>
                                                <input placeholder="New Password Again" type="password" v-model="newPasswordAgain" @input="checkPasswords"/>
                                                <sui-label v-if="invalidNewPasswordAgain" basic color="red" pointing>Passwords are not equal</sui-label>
                                            </sui-form-field>
                                            <sui-button class="float-left" @click.prevent="sendEmail" color="teal">Resend Recovery Email</sui-button>
                                            <sui-button class="float-right" @click.prevent="resetPassword" color="green">Reset Password</sui-button>
                                        </sui-form>
                                    </div>
                                </sui-grid-column>
                            </sui-grid-row>
                        </sui-grid>
                    </sui-segment>
                </sui-grid-column>
                <sui-grid-column :computer="5" />
            </sui-grid-row>
        </sui-grid>
    </sui-container>
</template>
<script>
import { validateEmail } from '@/tools'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'forgotMyPassword',
    data() {
        return {
            type:"normal",
            invalidEmail: false,
            loaded: true,
            recoveryCode: "",
            newPassword:"",
            newPasswordAgain: "",
            invalidNewPassword: false,
            invalidNewPasswordAgain: false
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
        }
    },
    methods: {
        sendEmail() {
            if(this.invalidEmail===true || this.email.length===0)
                return
            this.loaded = false
            axios.post('/api/forgotMyPassword', {
                email: this.email
            }).then((response)=>{
                if(response.data.state==='success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Check Your Email',
                        text: 'If your mail is registered, Recovery mail should be sent',
                        showConfirmButton: true,
                    })
                    this.type="codeField"
                }
            }).then(()=>{
                this.loaded = true
            })
        },
        checkEmail(e) {
            this.invalidEmail = !validateEmail(e.target.value)
        },
        checkPasswords() {
            const len = this.newPassword.length;
            this.invalidNewPassword = (len<10 || len>50)
            this.invalidNewPasswordAgain = (this.newPassword!==this.newPasswordAgain)
        },
        resetPassword() {
            if(this.invalidEmail || this.invalidNewPassword || this.invalidNewPasswordAgain)
                return
            this.loaded = false
            axios.patch('/api/forgotMyPassword', {
                email: this.email,
                code: this.recoveryCode,
                newPassword: this.newPassword
            }).then((response)=>{
                if(response.data.state==='success') {
                    this.$router.push({name: 'signIn'})
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Password Reset Successfully',
                        showConfirmButton: true,
                    })
                }
            }).catch((error)=>{
                if(error.response.status===401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Incorrect Recovery Code',
                        showConfirmButton: true,
                    })
                }
            }).then(()=>{
                this.loaded = true
            })
        }
    }
}
</script>
