<template>
    <div>
        <sui-form>
            <sui-form-fields grouped>
                <sui-form-field v-for="opt in options" :key="opt.value">
                    <sui-checkbox :radio="single===true" :name="opt.value" :label="opt.text" value="opt.value" />
                </sui-form-field>
            </sui-form-fields>
        </sui-form>
    </div>
</template>
<script>
export default {
    name: 'InputSelect',
    props: {
        single: {
            type:Boolean,
            default:true
        },
        options: {
            type:Array,
            required:true
        }
    }
}
</script>
