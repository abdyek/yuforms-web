export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const newFormModelFromFormResponse = (model) => {
    const questions = []
    for(let i=0;i<model.questions.length;i++) {
        let que = model.questions[i]
        let options = null
        if(que.options!==null) {
            options = []
            for(let j=0; j<que.options.length;j++) {
                let opt = que.options[j]
                options.push({
                    id:opt.id,
                    value: opt.text
                })
            }
            options.push({
                value:""
            })
        }
        questions.push({
            id:que.id,
            questionText: model.questions[i].questionText,
            formComponentType: model.questions[i].formComponent.name,
            options: options,
            forUI: {
                new:false
            }
        })
    }
    return {
        id: model.form.id,
        formTitle: model.form.name,
        questions: questions
    }
}

export const preparePutFormRequest = (model) =>{
    for(let i=0;i<model.questions.length;i++) {
        delete model.questions[i].forUI
        if(typeof model.questions[i].id!=='undefined') {
            delete model.questions[i].formComponentType
        } else {
            model.questions[i].new = true
        }
        if(model.questions[i].options!==null) {
            model.questions[i].options.splice(-1, 1)
        }
    }
    return model
}

export const generateEmptyAnswers = (questions) => {
    const answers = {}
    for(let i=0;i<questions.length;i++) {
        let que = questions[i]
        if(que.formComponent.name==='input-checkboxes') {
            // ^ here is not healthy and dynamic, multiResponse info must return in question model by API
            let obj = {}
            for(let j=0; j<que.options.length;j++) {
                obj[que.options[j].id] = false
            }
            answers[que.id] = obj
        } else {
            answers[que.id] = ""
        }
    }
    return answers
}

export const prepareToSendSubmit = (answers) => {
    const questionIds = Object.keys(answers)
    const arr = []
    for(let i=0; i<questionIds.length; i++) {
        if(typeof answers[questionIds[i]]==='object') {
            let value = '';
            let optionIds = Object.keys(answers[questionIds[i]])
            for(let j=0; j<optionIds.length; j++) {
                if(answers[questionIds[i]][optionIds[j]]===true) {
                    value += optionIds[j] + '-'
                }
            }
            value = (value.substr(-1)==='-')?value.substr(0, value.length-1):value
            arr.push({
                'questionId':questionIds[i],
                'answer':value
            })
        } else {
            arr.push({
                'questionId':questionIds[i],
                'answer':answers[questionIds[i]]
            })
        }
    }
    return arr;
}
