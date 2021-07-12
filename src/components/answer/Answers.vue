<template>
    <sui-grid v-if="answerModels.length===0">
        <sui-grid-row>
            <sui-grid-column>
                <sui-message color="blue">
                    <p>No answer yet for this sharing</p>
                </sui-message>
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
    <sui-grid v-else>
        <sui-grid-row>
            <sui-grid-column :width="5">
                <Selector />
            </sui-grid-column>
            <sui-grid-column :width="11">
                <AnswerViewer />
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
</template>
<script>
import { mapState } from 'vuex'
import Selector from '@/components/answer/Selector.vue'
import AnswerViewer from '@/components/answer/AnswerViewer.vue'
export default {
    name: 'Answers',
    computed: {
        ...mapState([
            'currentlyViewedShare',
            'answerModels'
        ])
    },
    components: {
        Selector,
        AnswerViewer
    }
}
</script>
