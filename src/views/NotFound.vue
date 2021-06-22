<template>
<div>
    <sui-container class="yuforms-container">
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :stackable="true">
                    <h1>404</h1>
                    <h3>Not Found</h3>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </sui-container>
</div>
</template>
<script>
export default {
    name: 'NotFound'
}
</script>
<style scoped>
h1, h3 {
    float:none;
    text-align:center !important;
}
h1 {
    font-size:10rem;
}
</style>
