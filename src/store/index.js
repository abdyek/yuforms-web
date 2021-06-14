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
    ]
}

const getters = {
    
}

const mutations = {
    setFormTitle(state, title) {
        state.formTitle = title
    },
    updateMyFormsModels(state) {
        const models = []
        // ^ will come from api
        Vue.set(state, 'myFormsModels', models)
        console.log(models)
    }
}

const actions = {
    setFormTitle({commit}, title) {
        commit('setFormTitle', title)
    },
    setMyFormsModels({commit}, models) {
        commit('setMyFormsModels', models)
    }
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
