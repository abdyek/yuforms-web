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
export default {
    name: 'SignIn',
    data() {
        return {
            formLoading:false,
            errorMessageShow:false,
            errorMessage:"error message",
            email:"",
            password:""
        }
    },
    methods: {
        goSignUpPage() {
            router.push({name:'signUp'})
        },
        sendRequest() {
            this.formLoading=true
            // request will be here
        }
    }
}
</script>
<style>
.sign-in-title {
    text-align:center;
}
</style>
