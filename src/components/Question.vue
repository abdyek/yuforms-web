<template>
    <sui-segment raised color="teal">
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="8" :stackable="true">
                    <h3 contenteditable @blur="saveQuestion">{{question}}</h3>
                </sui-grid-column>
                <sui-grid-column :width="8" :stackable="true">
                    <div class="float-right">
                        <sui-button icon="edit" color="olive" />
                        <sui-button icon="trash" color="orange" />
                    </div>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="16">
                    <QuestionCreatingDetailWrapper detailType="options"/>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="8">
                    <div class="float-left">
                        <QuestionSelector />
                    </div>
                </sui-grid-column>
                <sui-grid-column :width="8">
                    <div class="float-right">
                        <div class="right-bottom">
                            <sui-button color="green" content="Add" />
                        </div>
                    </div>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </sui-segment>
</template>
<script>
import QuestionSelector from '@/components/QuestionSelector.vue'
import QuestionCreatingDetailWrapper from '@/components/QuestionCreatingDetailWrapper.vue'
export default {
    name: "Question",
    methods: {
        saveQuestion() {
            console.log("kayıt işlemi")
        }
    },
    data: function() {
        return {
            question:'New Question'
        }
    },
    components: {
        QuestionSelector,
        QuestionCreatingDetailWrapper
    }
}
</script>
<style scoped>
h3 {
    text-align:left;
}
.right-bottom {
    position: absolute;
    bottom:0;
    right:0;
    margin-right:1rem;
}
</style>
