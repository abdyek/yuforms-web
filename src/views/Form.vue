<template>
    <div>
        <sui-container class="yuforms-container">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="16" :stackable="true">
                        <FormCard :model="model.form">
                            <sui-grid>
                                <sui-grid-row>
                                    <sui-grid-column :width="16">
                                        <h2>Questions</h2>
                                    </sui-grid-column>
                                </sui-grid-row>
                            </sui-grid>
                            <Questions :readOnly="true" :questions="model.questions"/>
                        </FormCard>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>
<script>
import FormCard from '@/components/form/FormCard.vue'
import Questions from '@/components/question/Questions.vue'
export default {
    name: 'Form',
    data() {
        return {
            model: {
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
            }
        }
    },
    components:{
        FormCard,
        Questions
    }
}
</script>
