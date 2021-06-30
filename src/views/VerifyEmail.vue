<template>
    <sui-container class="yuforms-container">
        <sui-grid>
            <sui-grid-row >
                <sui-grid-column :computer="5" />
                <sui-grid-column :computer="6" :mobile="16" :tablet="16">
                    <sui-segment color="teal" :loading="loaded===false">
                        <sui-grid>
                            <sui-grid-row>
                                <sui-grid-column>
                                    <h3>Verify Email</h3>
                                    <sui-form>
                                        <sui-form-field>
                                            <label>E-mail</label>
                                            <input placeholder="E-mail" type="email" v-model="email" :disabled="verifyEmailFromSignUp" />
                                            <sui-label v-if="emailFieldError" basic color="red" pointing>Invalid email</sui-label>
                                        </sui-form-field>
                                        <sui-form-field>
                                            <label>Verification Code</label>
                                            <input placeholder="Code" type="text" v-model="verificationCode" />
                                        </sui-form-field>
                                    </sui-form>
                                </sui-grid-column>
                            </sui-grid-row>
                        </sui-grid>
                        <sui-grid>
                            <sui-grid-row>
                                <sui-grid-column>
                                    <sui-button class="float-right" content="Verify Email" color="teal" @click="verifyEmail"/>
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
import { mapState } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'VerifyEmail',
    computed: {
        ...mapState([
            'emailField',
            'verifyEmailFromSignUp',
            'passwordField'
        ]),
        email: {
            get() {
                return this.emailField
            },
            set(value) {
                this.$store.commit('setEmailField', value)
            }
        }
    },
    data() {
        return {
            loaded:true,
            emailFieldError: false,
            verificationCode:""
        }
    },
    methods: {
        verifyEmail() {
            this.loaded = false
            axios.post('/api/confirmEmail', {
                email: this.email,
                code: this.verificationCode
            }).then((response)=>{
                if(response.data.state==='success') {
                    axios.post('api/login', {
                        "email":this.email,
                        "password":this.passwordField
                    }).then((response)=>{
                        this.$store.commit('setWho', response.data.who)
                        if(response.data.who==='member') {
                            this.$store.commit('setMember', response.data.info)
                        }
                        this.$router.push({name: 'myProfile'})
                        Swal.fire({
                            icon: 'success',
                            title: 'Verified Successfully',
                            showConfirmButton: true,
                            timer: 2500
                        })
                    })
                    
                }
            }).catch((error)=>{
                if(error.response.status===401 || error.response.status===404 || error.response.status===400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Verification Code',
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
