<template>
    <sui-tab  :menu="{ vertical: true, fluid: true}">
        <sui-tab-pane title="Two-Factor Authentication">
            <Manage2FA />
        </sui-tab-pane>
        <sui-tab-pane title="Change Email">Change email setting here</sui-tab-pane>
        <sui-tab-pane title="Change Password">change password setting here</sui-tab-pane>
    </sui-tab>
</template>
<script>
import Manage2FA from '@/components/profile/settings/Manage2FA.vue'
export default {
    name: 'Settings',
    components : {
        Manage2FA
    }
}
</script>
