<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid>
                <sui-grid-row >
                    <sui-grid-column :computer="5" />
                    <sui-grid-column v-if="signInInputView" :computer="6" :mobile="16">
                        <sui-segment color="teal" :loading="formLoading">
                            <sui-grid>
                                <sui-grid-row>
                                    <sui-grid-column :width="16" :stackable="true">
                                        <h3>Sign Up</h3>
                                        <sui-form>
                                            <sui-form-field :error="emailFieldError">
                                                <label>E-mail</label>
                                                <input placeholder="E-mail" type="email" @change="this.checkEmail" v-model="email" />
                                            </sui-form-field>
                                            <sui-message v-if="emailFieldError" color="red">
                                              <p>Invalid email</p>
                                            </sui-message>
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
                                            </sui-form-field>
                                            <sui-message v-if="passwordFieldError" color="red">
                                              <p>Length of password must be in 10-50 range</p>
                                            </sui-message>
                                            <sui-form-field :error="passwordAgainFieldError">
                                                <label>Password Again</label>
                                                <input placeholder="Password Again" type="password" @change="this.checkPasswordAgain" v-model="passwordAgain"/>
                                            </sui-form-field>
                                            <sui-message v-if="passwordAgainFieldError" color="red">
                                                <p>Password again is not equal password</p>
                                            </sui-message>
                                            <sui-message v-if="this.errorMessageShow" color="red">
                                                <p>{{this.errorMessage}}</p>
                                            </sui-message>
                                        </sui-form>
                                    </sui-grid-column>
                                </sui-grid-row>
                            </sui-grid>
                            <sui-grid>
                                <sui-grid-row>
                                    <sui-grid-column :width="8" :stackable="true">
                                        <sui-button content="Sign In" color="blue" @click="goSignInPage"/>
                                    </sui-grid-column>
                                    <sui-grid-column :width="8" :stackable="true" @click="sendRequest">
                                        <sui-button content="Sign Up" floated="right" color="teal"/>
                                    </sui-grid-column>
                                </sui-grid-row>
                            </sui-grid>
                        </sui-segment>
                    </sui-grid-column>
                    <sui-grid-column v-else :computer="6" :mobile="16">
                        <sui-grid>
                            <sui-grid-row>
                                <sui-grid-column :width="16">
                                    <sui-message color="blue">
                                        <sui-message-header>Succesfully Registered</sui-message-header>
                                          <p>
                                            You can login the account after verification your email
                                          </p>
                                    </sui-message>
                                </sui-grid-column>
                            </sui-grid-row>
                        </sui-grid>
                        <sui-grid>
                            <sui-grid-row>
                                <sui-grid-column :width="16">
                                    <sui-grid centered >
                                        <sui-button size="large" content="Verify Email" color="teal" @click="goVerifyEmailPage"/>
                                    </sui-grid>
                                </sui-grid-column>
                            </sui-grid-row>
                        </sui-grid>
                    </sui-grid-column>
                    <sui-grid-column :computer="5" />
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import router from '@/router'
import {validateEmail} from '@/tools'
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
        sendRequest() {
            this.formLoading = true
            // request will be here
            // this.formLoading = false
        }
    },
    data() {
        return {
            formLoading:false,
            emailFieldError:false,
            firstNameFieldError:false,
            lastNameFieldError:false,
            passwordFieldError:false,
            passwordAgainFieldError:false,
            email:"",
            firstName:"",
            lastName:"",
            password:"",
            passwordAgain:"",
            signInInputView:true,
            errorMessageShow:false,
            errorMessage: "ErrorMessage"
        }
    }
}
</script>
