<template>
    <sui-form>
        <sui-form-field>
            <label>Password</label>
            <input placeholder="Password" type="password" v-model="password"/>
        </sui-form-field>
        <sui-form-field :error="invalidEmail">
            <label>New Email</label>
            <input placeholder="New Email" type="email" @input="checkEmail" v-model="newEmail" />
            <sui-label v-if="invalidEmail" basic color="red" pointing>Invalid Email</sui-label>
        </sui-form-field>
        <sui-button class="float-right" @click.prevent="changeEmail" color="green">Change Email</sui-button>
    </sui-form>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { validateEmail } from '@/tools'
export default {
    name: 'ChangeEmail',
    data() {
        return {
            password: "",
            newEmail: "",
            invalidEmail: false
        }
    },
    methods: {
        changeEmail() {
            if(this.invalidEmail===true)
                return
            axios.patch('/api/changeMyEmail', {
                password: this.password,
                newEmail: this.newEmail
            }).then((response)=>{
                if(response.data.state==='success') {
                    this.$store.commit('setWho', 'guest')
                    this.$store.commit('setMember', {})
                    this.$store.commit('setVerifyEmailFromSignUp', true)
                    this.$store.commit('setEmailField', this.newEmail)
                    this.$router.push({name: 'verifyEmail'})
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Email Was Changed Successfully',
                        text: 'You have to verify your email to sign in',
                        showConfirmButton: true,
                    })
                }
            }).catch((error)=>{
                if(typeof error.response === 'undefined') {
                    console.log(error)
                } else if(error.response.status===401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Incorrect Password',
                        showConfirmButton: true,
                    })
                } else if(error.response.status===422) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Already Registered Email',
                        showConfirmButton: true,
                    })
                }
            })
        },
        checkEmail(e) {
            this.invalidEmail = (validateEmail(e.target.value)===false)
        }
    }
}
</script>
