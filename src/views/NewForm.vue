<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <FormTitle />
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <Question />
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import FormTitle from '@/components/FormTitle.vue'
import Question from '@/components/Question.vue'
export default {
    name: 'NewForm',
    components: {
        FormTitle,
        Question
    }
}
</script>
