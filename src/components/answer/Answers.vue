<template>
    <sui-grid>
        <sui-grid-row>
            <sui-grid-column>
                answers will be here
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'Answers',
    computed: {
        ...mapState([
            'currentlyViewedShare'
        ])
    },
    mounted() {
        this.loadShare()
    },
    methods: {
        loadShare() {
            console.log("will be loaded")
        }
    }
}
</script>
