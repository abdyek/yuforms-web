import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import defaultValues from '@/defaultValues'
import clone from 'just-clone'

Vue.use(Vuex)

const state = {
    who: 'guest',
    myFormsModels: [
        {
            "id": 1,
            "slug": "1t6634d99370d26a409d22",
            "name": "Yazılım Mühendisliği Dersi Proje Formu",
            "createDateTime": {
                "date": "2021-06-13 02:27:13.000000",
                "timezone_type": 3,
                "timezone": "Europe/Istanbul"
            },
            "lastEditDateTime": null,
            "stillShared": true,
            "share": {
                "id": 4,
                "startDateTime": {
                    "date": "2021-06-13 23:09:08.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Istanbul"
                },
                "onlyMember": true,
                "submitCount": 15
            }
        },
        {
            "id": 2,
            "slug": "1t6634d99370d26a409d22",
            "name": "Other Form",
            "createDateTime": {
                "date": "2021-06-13 02:27:13.000000",
                "timezone_type": 3,
                "timezone": "Europe/Istanbul"
            },
            "lastEditDateTime": {
                "date": "2021-06-13 02:30:12.000000"
            },
            "stillShared": false,
            "share": null
        },
        {
            "id": 3,
            "slug": "1t6634d99370d26a409d22",
            "name": "Other Form 2",
            "createDateTime": {
                "date": "2021-06-13 02:27:13.000000",
                "timezone_type": 3,
                "timezone": "Europe/Istanbul"
            },
            "lastEditDateTime": {
                "date": "2021-06-13 02:30:12.000000"
            },
            "stillShared": true,
            "share": {
                "id": 5,
                "startDateTime": {
                    "date": "2021-06-13 23:09:08.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Istanbul"
                },
                "onlyMember": false,
                "submitCount": 9
            }
        }
    ],

    formModel: {
        "id": 1,
        "slug": "1t6634d99370d26a409d22",
        "name": "Yazılım Mühendisliği Dersi Proje Formu",
        "createDateTime": {
            "date": "2021-06-13 02:27:13.000000",
            "timezone_type": 3,
            "timezone": "Europe/Istanbul"
        },
        "lastEditDateTime": null,
        "stillShared": true,
        "share": {
            "id": 4,
            "startDateTime": {
                "date": "2021-06-13 23:09:08.000000",
                "timezone_type": 3,
                "timezone": "Europe/Istanbul"
            },
            "onlyMember": true,
            "submitCount": 0
        }
    },
    "questionModels": [
        {
            "id": 1,
            "questionText": "Öğrenci Numarası",
            "formComponent": {
                "id": 1,
                "title": "Short Text",
                "name": "input-text",
                "hasOptions": false
            },
            "options": null
        },
        {
            "id": 2,
            "questionText": "Ad - Soyad",
            "formComponent": {
                "id": 1,
                "title": "Short Text",
                "name": "input-text",
                "hasOptions": false
            },
            "options": null
        },
        {
            "id": 3,
            "questionText": "Üye sayısı",
            "formComponent": {
                "id": 2,
                "title": "Select",
                "name": "input-radio",
                "hasOptions": true
            },
            "options": [
                {
                    "id": 1,
                    "value": "0",
                    "text": "bireysel"
                },
                {
                    "id": 2,
                    "value": "1",
                    "text": "2-5"
                },
                {
                    "id": 3,
                    "value": "2",
                    "text": "5 ve daha fazlası"
                }
            ]
        },
        {
            "id": 4,
            "questionText": "Ne projesi?",
            "formComponent": {
                "id": 3,
                "title": "Multi Select",
                "name": "input-checkboxes",
                "hasOptions": true
            },
            "options": [
                {
                    "id": 4,
                    "value": "0",
                    "text": "Mobil"
                },
                {
                    "id": 5,
                    "value": "1",
                    "text": "Web"
                },
                {
                    "id": 6,
                    "value": "2",
                    "text": "Masaüstü"
                }
            ]
        }
    ],
    newFormModel: clone(defaultValues.newFormModel)
}

const getters = {
    getNewFormModel(state) {
        return state.newFormModel
    },
    getMyFormsModels(state) {
        return state.myFormsModels
    },
    getFormModel(state) {
        return state.formModel
    }
}

const mutations = {
    setFormTitle(state, title) {
        state.newFormModel.formTitle = title
    },
    setMyFormsModels(state, args) {
        Vue.set(state, 'myFormsModels', args.models)
    },
    setFormModel(state, model) {
        Vue.set(state, 'formModel', model)
    },
    setNewQuestionType(state, arg) {
        Vue.set(state.newFormModel.questions[arg['questionId']], 'formComponentType', arg['type'])
    },
    addNewQuestion(state) {
        const questions = state.newFormModel.questions;
        questions.push({
            "formComponentType":"input-text",
            "questionText":"New Question",
            'options':[
                {
                    "value":""
                }
            ],
            "forUI": {
                "new":true
            }
        })
        Vue.set(state.newFormModel, 'questions', questions)
    },
    setOptions(state, args) {
        Vue.set(state.newFormModel.questions[args.questionId], 'options', args.options)
    },
    setNewFormModelQuestions(state, args) {
        Vue.set(state.newFormModel, 'questions', args['questions'])
    },
    setNewFormModel(state, args) {
        Vue.set(state, 'newFormModel', args.model)
    },
    setQuestionModels(state, args) {
        Vue.set(state, 'questionModels', args['questions'])
    },
    setWho(state, who) {
        state.who = who
    }
}

const actions = {
    setFormTitle({commit}, title) {
        commit('setFormTitle', title)
    },
    /*
    setMyFormsModels({commit}, models) {
        commit('setMyFormsModels', models)
    },*/
    fetchModel({commit}, args) {
        return axios.get('/api/form', {
            params: {
                slug: args.slug
            }
        }).then((response)=>{
            commit('setFormModel', response.data.form)
            commit('setQuestionModels', {'questions':response.data.questions})
        }).catch((error)=>{
            if(error.response.status===404) {
                args.handle404Func()
            }
        })
    },
    setNewQuestionType({commit}, arg) {
        commit('setNewQuestionType', arg)
    },
    addNewQuestion({commit}) {
        commit('addNewQuestion')
    },
    setOptions({commit}, args) {
        commit('setOptions', args)
    },
    removeNewQuestion({commit, getters}, args) {
        const questions = [...getters.getNewFormModel.questions]
        questions.splice(args['questionId'], 1)
        commit('setNewFormModelQuestions', {'questions': questions})
    },
    setQuestionText({commit, getters}, args) {
        const newFormModel = getters.getNewFormModel
        newFormModel.questions[args['questionId']].questionText = args['questionText']
        commit('setNewFormModelQuestions', {'questions':newFormModel.questions})
    },
    fetchMyForms({commit}) {
        return axios.get('/api/listMyForms').then((response)=>{
            commit('setMyFormsModels', {'models': response.data.myForms})
        }).catch((error)=>{
            console.log(error);
        })
    },
    stopSharing({commit, getters}, args) {
        return axios.delete('/api/share', {
            data: {
                formId: args.formId
            }
        }).then((response)=>{
            if(args.index===null) {
                // ^ from Form view
                const formModel = getters.getFormModel
                formModel.stillShared = response.data.stillShared
                formModel.share = null //response.data.share
                commit('setFormModel', formModel)
            } else {
                // ^ from MyForms view
                const models = getters.getMyFormsModels
                models[args.index].stillShared = response.data.stillShared
                models[args.index].share = response.data.share
                commit('setMyFormsModels', {'models': models})
            }
        }).catch((error)=>{
            console.log(error)
        })
    },
    startSharing({commit, getters}, args) {
        const index = args['index']
        delete args.index
        return axios.post('/api/share',
            args
        ).then((response)=>{
            if(index===null) {
                // ^ from Form view
                const formModel = getters.getFormModel
                formModel.stillShared = response.data.stillShared
                formModel.share = response.data.share
                commit('setFormModel', formModel)
            } else {
                // ^ from MyForms view
                const models = getters.getMyFormsModels
                models[index].stillShared = response.data.stillShared
                models[index].share = response.data.share
                commit('setMyFormsModels', {'models': models})
            }
        }).catch((error)=>{
            console.log(error)
        })
    },
    setDefaultNewFormModel({commit}) {
        commit('setNewFormModel', {'model': clone(defaultValues.newFormModel)})
    },
    setNewFormModel({commit}, args) {
        commit('setNewFormModel', {'model': args.model})
    },
    removeFormFromMyFormsModels({commit, getters}, args) {
        let myFormsModels = clone(getters.getMyFormsModels)
        myFormsModels = myFormsModels.filter((model)=>model.id!==args.formId)
        commit('setMyFormsModels', {models: myFormsModels})
    }

}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
