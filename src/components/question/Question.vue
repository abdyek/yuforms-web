<template>
    <sui-grid>
        <sui-grid-row>
            <sui-grid-column>
                <sui-segment raised color="teal">
                    <sui-grid>
                        <sui-grid-row>
                            <sui-grid-column>
                                <h3>{{question.questionText}}</h3>
                            </sui-grid-column>
                        </sui-grid-row>
                    </sui-grid>
                    <sui-grid>
                        <sui-grid-row>
                            <sui-grid-column>
                                <TypeWrapper :type="question.formComponent.name" :question="question"/>
                            </sui-grid-column>
                        </sui-grid-row>
                    </sui-grid>
                </sui-segment>
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
</template>
<script>
import TypeWrapper from '@/components/question/type/TypeWrapper.vue'
export default {
    name: 'Question',
    props: {
        question:{
            type:Object,
            required:true
        }
    },
    components: {
        TypeWrapper
    }
}
</script>
