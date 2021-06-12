<template>
    <sui-container class="yuforms-container">
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="8">
                    <h1>Yuforms</h1>
                </sui-grid-column>
                <sui-grid-column :width="8">
                    <Menu />
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </sui-container>
</template>
<script>
import Menu from './Menu.vue'
export default {
    name: 'Header',
    components: { Menu }
}
</script>
<style>
h1 {
    float:left;
}
</style>
