<template>
    <div>
        <sui-form>
            <sui-form-field>
                <input type="text" :placeholder="this.placeholder" />
            </sui-form-field>
        </sui-form>
    </div>
</template>
<script>
export default {
    name: 'InputText',
    props: {
        placeholder: {
            type:String,
            default:""
        }
    }
}
</script>
