<template>
    <sui-grid>
        <sui-grid-row>
            <sui-grid-column>
                <div v-if="twoFAType==='normal'">
                    <sui-grid>
                        <sui-grid-row>
                            <sui-grid-column>
                                <div v-if="this.member.haveTo2fa===true">
                                    <sui-message color="blue">
                                        <p>Your two factor authentication is open</p>
                                    </sui-message>
                                </div>
                                <div v-else>
                                    <sui-message color="orange">
                                        <p>Your two factor authentication is closed</p>
                                    </sui-message>
                                </div>
                            </sui-grid-column>
                        </sui-grid-row>
                    </sui-grid>
                    <sui-grid>
                        <sui-grid-row>
                            <sui-grid-column>
                                <div>
                                    <sui-button class="yuforms-centered" :color="twoFAopenCloseButtonColor" :size="twoFAopenCloseButtonSize" @click="openSendButton">{{twoFAopenCloseButtonText}}</sui-button>
                                </div>
                            </sui-grid-column>
                        </sui-grid-row>
                    </sui-grid>
                </div>
                <div v-else-if="twoFAType==='sendButton'">
                    <sui-form>
                        <sui-form-field :loading="twoFASendMailFormLoaded===false">
                            <label>Password</label>
                            <sui-input placeholder="Password" type="password" v-model="password" />
                        </sui-form-field>
                        <sui-form-field>
                            <sui-button class="float-right" color="green" @click.prevent="sendAuthenticationMailTo2FA">Send Authentication Code</sui-button>
                        </sui-form-field>
                    </sui-form>
                </div>
                <div v-else-if="twoFAType==='inputAuthenticationCode'">
                    <sui-form>
                        <sui-form-field :loading="twoFASendAuthenticationCodeLoaded===false">
                            <label>Authentication Code</label>
                            <sui-input placeholder="Code" type="text" v-model="authenticationCode" />
                        </sui-form-field>
                        <sui-form-field>
                            <sui-button class="float-right" :color="twoFAopenCloseButtonColor" @click.prevent="sendAuthenticationCodeTo2FA">{{twoFAopenCloseButtonText}}</sui-button>
                        </sui-form-field>
                    </sui-form>
                </div>
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'
import clone from 'just-clone'
export default {
    name: 'Manage2FA',
    data() {
        return {
            twoFAType:"normal",
            twoFASendMailFormLoaded:true,
            twoFASendAuthenticationCodeLoaded: true,
            password: "",
            authenticationCode:"",
        }
    },
    computed: {
        ...mapState([
            'member'
        ]),
        twoFAopenCloseButtonColor() {
            return (this.member.haveTo2fa===false)?"green":"red"
        },
        twoFAopenCloseButtonText() {
            return (this.member.haveTo2fa===false)?'Open 2FA':'Close 2FA'
        },
        twoFAopenCloseButtonSize() {
            return (this.member.haveTo2fa===false)?'huge':'medium'
        }
    },
    methods: {
        resetField() {
            this.password = ""
            this.authenticationCode = ""
        },
        openSendButton() {
            this.resetField();
            this.twoFAType = 'sendButton'
        },
        sendAuthenticationMailTo2FA() {
            this.twoFASendMailFormLoaded = false
            axios.patch('/api/manage2FA', {
                password: this.password
            }).then((response)=>{
                if(response.data.state==='success') {
                    this.twoFAType = 'inputAuthenticationCode'
                    Swal.fire({
                        icon: 'success',
                        title: 'Sent Authentication Email Successfully',
                        showConfirmButton: true,
                    })
                }
            }).catch((error)=>{
                if(error.response.status===401 || error.response.status===400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Incorrect Password',
                        showConfirmButton: true,
                    })
                }
            }).then(()=>{
                this.twoFASendMailFormLoaded = true
            })
        },
        sendAuthenticationCodeTo2FA() {
            axios.post('/api/manage2FA', {
                open: (!this.member.haveTo2fa),
                authenticationCode: this.authenticationCode
            }).then((response)=>{
                if(response.data.state==='success') {
                    const member = clone(this.member)
                    member.haveTo2fa = !member.haveTo2fa
                    this.$store.commit('setMember', member)
                    this.twoFAType = 'normal'
                    Swal.fire({
                        icon: 'success',
                        title: 'Changed Two-Factor Authentication Setting Successfully',
                        showConfirmButton: true,
                    })
                }
            }).catch((error)=>{
                if(typeof error.response === 'undefined') {
                    console.log(error)
                } else if(error.response.status===401) {
                    const data = error.response.data
                    if(data.state==='fail' && data.reason==='timeout') {
                        this.resetField()
                        this.twoFAType = 'sendButton'
                        this.resetField()
                        Swal.fire({
                            icon: 'error',
                            title: 'Timeout',
                            text: 'Timeout to send request. Please resend email to manage two-factor authentication',
                            showConfirmButton: true,
                        })
                    } else if (data.state==='fail' && data.reason==='code') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Incorrect Authentication Code',
                            showConfirmButton: true,
                        })
                    } else if(data.state==='fail' && data.reason==='trial') {
                        this.resetField()
                        this.twoFAType = 'sendButton'
                        Swal.fire({
                            icon: 'error',
                            title: 'Your Trial Count Is Over',
                            text: 'Please resend email to manage two-factor authentication',
                            showConfirmButton: true,
                        })
                    }
                }
            })
        }
    }
}
</script>
