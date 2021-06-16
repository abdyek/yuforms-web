<template>
    <sui-segment raised color="teal">
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="8" :stackable="true">
                    <h3 contenteditable @blur="saveQuestion">{{newQuestionModel.questionText}}</h3>
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
                    <DetailWrapper :detailType="detailType"/>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="8">
                    <div class="float-left">
                        <QuestionSelector :questionId="id"/>
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
import QuestionSelector from '@/components/question/QuestionSelector.vue'
import DetailWrapper from '@/components/question/creating/DetailWrapper.vue'
export default {
    name: "NewQuestion",
    props: {
        id: {
            type:Number
        },
        newQuestionModel: {
            type:Object
        }
    },
    computed: {
        detailType() {
            const componentType = this.newQuestionModel.formComponentType
            return (componentType==='input-radio' || componentType==='input-checkboxes')?'options':'empty'
        }
    },
    methods: {
        saveQuestion() {
            console.log("kayıt işlemi")
        }
    },
    components: {
        QuestionSelector,
        DetailWrapper
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
