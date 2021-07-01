<template>
    <sui-form>
        <sui-form-field>
            <label>Password</label>
            <input placeholder="Password" type="password" v-model="password"/>
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
        <sui-button class="float-right" @click.prevent="changePassword" color="green">Change Password</sui-button>
    </sui-form>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'ChangePassword',
    data() {
        return {
            password: "",
            newPassword: "",
            newPasswordAgain: "",
            invalidNewPassword: false,
            invalidNewPasswordAgain: false
        }
    },
    methods: {
        checkPasswords() {
            const len = this.newPassword.length;
            this.invalidNewPassword = (len<10 || len>50)
            this.invalidNewPasswordAgain = (this.newPassword!==this.newPasswordAgain)
        },
        changePassword() {
            if(this.nvalidNewPassword || this.invalidNewPasswordAgain)
                return
            axios.patch('/api/changeMyPassword', {
                password: this.password,
                newPassword: this.newPassword
            }).then((response)=>{
                if(response.data.state==='success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Password Was Changed Successfully',
                        showConfirmButton: true,
                    })
                }
            }).catch((error)=>{
                if(error.response.status===401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Incorrect Password',
                        showConfirmButton: true,
                    })
                } else if(error.response.status===403) {
                    Swal.fire({
                        icon: 'error',
                        title: 'You are not authorized ',
                        showConfirmButton: true,
                    })
                }
            })
        }
    }
}
</script>
