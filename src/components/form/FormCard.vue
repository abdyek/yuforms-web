<template>
    <div>
        <sui-segment raised color="teal">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="8">
                        <h2 @click="goFormPage">{{model.name}}</h2>
                    </sui-grid-column>
                    <sui-grid-column :width="8">
                        <div class="float-right">
                            <sui-button :disabled="this.model.stillShared===true" icon="edit" color="olive" @click="goEditFormPage"/>
                            <sui-button icon="trash" color="red" @click="deleteForm"/>
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="8">
                        <sui-label> <sui-icon name="calendar outline" />{{createdDateTime}}</sui-label>
                        <sui-label v-if="this.model.lastEditDateTime!==null"> <sui-icon name="edit outline" />{{lastEditDateTime}}</sui-label>
                    </sui-grid-column>
                    <sui-grid-column :width="8">
                        <div class="float-right">
                            <div v-if="this.model.stillShared===true">
                                <sui-label  color="teal" size="large"><sui-icon name="users" /> Open </sui-label>
                                <sui-label size="large"><sui-icon :name="this.userTypeIcon"/>{{this.model.share.submitCount}}</sui-label>
                            </div>
                            <sui-label v-else color="orange" size="large"><sui-icon name="x icon" />Closed</sui-label>
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16">
                        <div v-if="this.model.stillShared===false">
                            <sui-button icon="users" :loading="shareAllLoaded===false" :disabled="shareAllDisabled" content="Share All" color="teal" @click="handleShareAll"/>
                            <sui-button icon="user" :loading="shareOnlyMembersLoaded===false" :disabled="shareOnlyMembersDisabled" content="Share Only Members" color="teal" @click="handleShareOnlyMembers"/>
                        </div>
                        <div v-else>
                            <sui-button icon="x icon" :loading="stopSharingButtonLoaded===false" content="Stop Sharing" color="yellow" @click="handleStopSharing"/>
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <slot></slot>
        </sui-segment>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
    name:'FormCard',
    props: {
        model: {
            type:Object,
            required:false
        },
        index: {
            type:Number,
            default:null
        }
    },
    computed: {
        createdDateTime() {
            // it will be formated
            return this.model.createDateTime.date
        },
        lastEditDateTime() {
            if(this.model.lastEditDateTime!==null) {
                // it will be formated
                return this.model.createDateTime.date
            }
            return null
        },
        userTypeIcon() {
            return (this.model.stillShared===true && this.model.share.onlyMember===true)?'user':'users'
        }
    },
    data() {
        return {
            stopSharingButtonLoaded:true,
            shareAllLoaded:true,
            shareOnlyMembersLoaded:true,
            shareAllDisabled:false,
            shareOnlyMembersDisabled: false
        }
    },
    methods: {
        ...mapActions([
            'stopSharing',
            'startSharing',
            'removeFormFromMyFormsModels'
        ]),
        goEditFormPage() {
            this.$router.push({name:'editForm', params: {formSlug: this.model.slug}})
        },
        goFormPage() {
            if(this.$route.name!=='form') {
                this.$router.push({name:'form', params: {formSlug: this.model.slug}})
            }
        },
        handleStopSharing() {
            this.stopSharingButtonLoaded = false
            this.stopSharing({'formId': this.model.id, 'index':this.index}).then(()=>{
                this.stopSharingButtonLoaded = true
            })
        },
        handleShareAll() {
            this.shareAllLoaded = false
            this.shareOnlyMembersDisabled = true
            this.startSharing({'formId': this.model.id, 'index': this.index, 'onlyMember':false}).then(()=>{
                this.shareAllLoaded = true
                this.shareOnlyMembersDisabled = false
            })
        },
        handleShareOnlyMembers() {
            this.shareOnlyMembersLoaded = false
            this.shareAllDisabled = true
            this.startSharing({'formId': this.model.id, 'index': this.index, 'onlyMember':true}).then(()=>{
                this.shareOnlyMembersLoaded = true
                this.shareAllDisabled = false
            })
        },
        deleteForm() {
            Swal.fire({
                title: 'Are you sure?',
                text: "The form will be deleted with its answers",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete('/api/form',{
                        data: {
                            id: this.model.id
                        }
                    }).then((response)=>{
                        if(response.data.state==='success') {
                            if(this.$router.currentRoute.name==='myForms') {
                                this.removeFormFromMyFormsModels({formId:this.model.id})
                            } else if(this.$router.currentRoute.name==='form') {
                                this.$router.push({name: 'myForms'})
                            }
                            Swal.fire({
                                icon: 'success',
                                title: 'Succcessfully deleted',
                                showConfirmButton: true,
                            })
                        }
                    }).catch((error)=>{
                        if(error.response.status===404) {
                            Swal.fire({
                                icon: 'error',
                                title: '404',
                                text: 'Form not found',
                                showConfirmButton: true,
                            })
                        }
                    })
                }
            })
        }
    }
}
</script>
<style scoped>
.form-card-buttons {
    float:right;
}
h2 {
    color:#444;
    cursor:pointer;
}
h2:hover {
    color:#111;
}
</style>
