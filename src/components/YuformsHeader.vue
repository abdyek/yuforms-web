<template>
    <sui-container id="yuforms-header-container">
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="8">
                    <h1>Yuforms</h1>
                </sui-grid-column>
                <sui-grid-column :width="8">
                    <YuformsMenu />
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </sui-container>
</template>
<script>
import YuformsMenu from './YuformsMenu.vue'
export default {
    name: 'YuformsHeader',
    components: { YuformsMenu }
}
</script>
<style>
h1 {
    float:left;
}
#yuforms-header-container {
    padding:1.1rem;
}
</style>
