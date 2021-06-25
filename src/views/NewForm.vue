<template>
    <FormEditor />
</template>
<script>
import FormEditor from '@/components/form/FormEditor.vue'
import { mapActions } from 'vuex'
export default {
    name: 'NewForm',
    components: {
        FormEditor
    },
    methods: {
        ...mapActions([
            'setDefaultNewFormModel'
        ])
    },
    mounted() {
        this.setDefaultNewFormModel()
    }
}
</script>
