<template>
    <sui-form>
        <sui-form-field>
            <label>Question Type</label>
            <sui-dropdown
                placeholder="Question Type"
                selection
                :options="options"
                v-model="current"
            />
        </sui-form-field>
    </sui-form>
</template>
<script>
export default {
    name: "QuestionSelector",
    data() {
        return {
            current:0,
            options: [
                {
                    text:'Short question',
                    value:0
                },
                {
                    text:'Select',
                    value:1
                },
                {
                    text:'Multi select',
                    value:2
                },
            ]
        }
    }
}
</script>
<style scoped>
label {
    float:left;
}
</style>
