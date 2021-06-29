<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="8" :stackable="true">
                        <div>
                            <h1 is="sui-header">
                                <sui-icon name="user" />
                                <sui-header-content>
                                    {{name}}
                                    <sui-header-subheader>{{this.member.email}}</sui-header-subheader>
                                </sui-header-content>
                            </h1>
                        </div>
                    </sui-grid-column>
                    <sui-grid-column :width="8">
                        <sui-button class="float-right" content="Sign Out" color="orange" icon="sign out alternate" @click="signOut"/>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'MyProfile',
    computed: {
        ...mapState([
            'member'
        ]),
        name() {
            return this.member.firstName + ' ' + this.member.lastName
        }
    },
    methods: {
        signOut() {
            axios.post('/api/logOut').then((response)=>{
                if(response.data.state==='success') {
                    this.$store.commit('setWho', 'guest')
                    this.$router.push({name: 'signIn'})
                    Swal.fire({
                        icon: 'success',
                        title: 'Signed Out Successfully',
                        showConfirmButton: true,
                    })
                }
            }).catch((error)=>{
                if(typeof error.response ==='undefined') {
                    console.log(error)
                } else if(error.response.status===403) {
                    Swal.fire('403', 'You are not authorized', 'error')
                }
            })
        }
    }
}
</script>
