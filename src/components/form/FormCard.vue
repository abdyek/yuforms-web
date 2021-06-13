<template>
    <div>
        <sui-segment raised color="teal">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="8">
                        <h2><router-link to="form">{{model.name}}</router-link></h2>
                    </sui-grid-column>
                    <sui-grid-column :width="8">
                        <div class="float-right">
                            <sui-button icon="edit" color="olive" @click="goEditFormPage"/>
                            <sui-button icon="trash" color="orange"/>
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
        </sui-segment>
    </div>
</template>
<script>
import router from '@/router'
export default {
    name:'FormCard',
    props: {
        model: {
            type:Object,
            required:true
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
    methods: {
        goEditFormPage() {
            router.push({name:'editForm', params: {formSlug: this.model.slug}})
        }
    }
}
</script>
<style scoped>
.form-card-buttons {
    float:right;
}
a {
    color:#444;
}
a:hover {
    color:#333;
}
</style>
