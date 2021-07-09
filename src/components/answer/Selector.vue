<template>
    <div>
        <div v-for="(user, index) in answerModels" :key="index">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column>
                         <h3 is="sui-header" class="selector" :color="(selected===index)?'teal':'black'" @click="changeUser(index)">
                            {{ user.info.firstName + ' ' + user.info.lastName }}
                            <sui-header-subheader>
                                {{user.info.email}}
                            </sui-header-subheader>
                          </h3>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Selector',
    data() {
        return {
            selected: 0,
        }
    },
    computed: {
        ...mapState([
            'answerModels'
        ]),
    },
    methods: {
        ...mapActions([
            'fillAnswers'
        ]),
        changeUser(index) {
            this.selected = index
            this.fillAnswers(this.answerModels[index].answers)
        }
    }
}
</script>
<style scoped>
.selector {
    cursor:pointer;
}
</style>
