import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    formTitle: 'New Form Title',
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
        "form": {
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
        "questions": [
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
        ]
    },
    newFormModel: {
        "formTitle":"New Form Title",
        "questions": [
            {
                "formComponentType":"input-text",
                "questionText":"Öğrenci Numarası",
                "options":[
                    {
                        "value":""
                    }
                ],
                "forUI": {
                    "new":false
                }
            },
            {
                "formComponentType":"input-text",
                "questionText":"Ad - Soyad",
                "options":[
                    {
                        "value":""
                    }
                ],
                "forUI": {
                    "new":false
                }
            },
            {
                "formComponentType":"input-radio",
                "questionText":"Üye sayısı",
                "options":[
                    {
                        "value":"bireysel"
                    },
                    {
                        "value":"2-5"
                    },
                    {
                        "value":"5 ve daha fazlası"
                    },
                    {
                        "value": ""
                    }
                ],
                "forUI": {
                    "new":false
                }
            },
            {
                "formComponentType":"input-checkboxes",
                "questionText":"Ne projesi?",
                "options":[
                    {
                        "value":"Mobil"
                    },
                    {
                        "value":"Web"
                    },
                    {
                        "value":"Masaüstü"
                    },
                    {
                        "value": ""
                    }
                ],
                "forUI": {
                    "new":false
                }
            }
        ]
    } 
}

const getters = {
    getNewFormModel(state) {
        return state.newFormModel
    }
}

const mutations = {
    setFormTitle(state, title) {
        state.newFormModel.formTitle = title
    },
    updateMyFormsModels(state) {
        const models = []
        // ^ will come from api
        Vue.set(state, 'myFormsModels', models)
        console.log(models)
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
    }
}

const actions = {
    setFormTitle({commit}, title) {
        commit('setFormTitle', title)
    },
    setMyFormsModels({commit}, models) {
        commit('setMyFormsModels', models)
    },
    fetchModel({commit}, formId) {
        console.log(formId)
        const formModel = {};
        // ^ it will come from api
        commit('setFormModel', formModel)
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
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
