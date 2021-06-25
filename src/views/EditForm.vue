<template>
    <div>
        <FormEditor :new="false" :formSlug="this.$route.params.formSlug"/>
    </div>
</template>
<script>
import FormEditor from '@/components/form/FormEditor.vue'
export default {
    name: 'EditForm',
    components: {
        FormEditor
    }
}
</script>
