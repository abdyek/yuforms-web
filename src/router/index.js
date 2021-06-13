import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import VerifyEmail from '@/views/VerifyEmail.vue'
import MyProfile from '@/views/MyProfile.vue'
import MyForms from '@/views/MyForms.vue'
import Form from '@/views/Form.vue'
import NewForm from '@/views/NewForm.vue'
import EditForm from '@/views/EditForm.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sign-in',
        name: 'signIn',
        component: SignIn
    },
    {
        path: '/sign-up',
        name: 'signUp',
        component: SignUp
    },
    {
        path: '/verify-email',
        name: 'verifyEmail',
        component: VerifyEmail
    },
    {
        path: '/my-profile',
        name: 'myProfile',
        component: MyProfile
    },
    {
        path: '/my-forms',
        name: 'myForms',
        component: MyForms
    },
    {
        path: '/form',
        name: 'form',
        component: Form
    },
    {
        path: '/new-form',
        name: 'newForm',
        component: NewForm
    },
    {
        path: '/edit-form/:formSlug',
        name: 'editForm',
        component: EditForm
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
