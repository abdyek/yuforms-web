<template>
    <sui-tab  :menu="{ vertical: true, fluid: true}">
        <sui-tab-pane title="Two-Factor Authentication">
            <Manage2FA />
        </sui-tab-pane>
        <sui-tab-pane title="Change Email">
            <ChangeEmail />
        </sui-tab-pane>
        <sui-tab-pane title="Change Password">change password setting here</sui-tab-pane>
    </sui-tab>
</template>
<script>
import Manage2FA from '@/components/profile/settings/Manage2FA.vue'
import ChangeEmail from '@/components/profile/settings/ChangeEmail.vue'
export default {
    name: 'Settings',
    components : {
        Manage2FA,
        ChangeEmail
    }
}
</script>
