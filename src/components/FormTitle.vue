<template>
    <h1 :contenteditable="true" @blur="changeTitle">
        {{formTitle}}
    </h1>
</template>
<script>
import Vuex from 'vuex'
export default {
    name:'FormTitle',
    props: {
        editable: {
            type:Boolean,
            default:false
        }
    },
    computed: {
        ...Vuex.mapState([
            'formTitle'
        ])
    },
    methods: {
        ...Vuex.mapActions([
            'setFormTitle'
        ]),
        changeTitle: function(e) {
            this.setFormTitle(e.target.innerText);
        }
    }
}
</script>
