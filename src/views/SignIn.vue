<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid :centered="true">
                <sui-grid-row>
                    <sui-grid-column :width="6" :stackable="true">
                        <div>
                            <sui-segment color="blue">
                                <sui-grid>
                                    <sui-grid-row>
                                        <sui-grid-column :width="16" :stackable="true">
                                            <h3>Sign In</h3>
                                            <sui-form>
                                                <sui-form-field>
                                                    <label>E-mail</label>
                                                    <input placeholder="E-mail" type="email" />
                                                </sui-form-field>
                                                <sui-form-field>
                                                    <label>Password</label>
                                                    <input placeholder="Password" type="password"/>
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
                                            <sui-button content="Sign In" floated="right" color="blue"/>
                                        </sui-grid-column>
                                    </sui-grid-row>
                                </sui-grid>
                            </sui-segment>
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import router from '@/router'
export default {
    name: 'SignIn',
    methods: {
        goSignUpPage() {
            router.push({name:'signUp'})
        } 
    }
}
</script>
<style>
.sign-in-title {
    text-align:center;
}
</style>
