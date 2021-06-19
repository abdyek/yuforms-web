<template>
    <div>
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="16">
                    <h4>Options</h4>
                </sui-grid-column>
            </sui-grid-row>
            <sui-grid-row>
                <sui-grid-column :width="16">
                    <sui-form>
                        <sui-form-field v-for="(opt, key) in optionsFromStore" :key="key">
                            <input placeholder="Option" v-model="opt.value" @input="changeOption" :name="key"/>
                        </sui-form-field>
                    </sui-form>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </div>
</template>
<script>
import Vuex from 'vuex'
export default {
    name:'Options',
    props: {
        questionId: {
            type:Number,
            required:true
        }
    },
    data() {
        return {
            options:[]
        }
    },
    computed: {
        ...Vuex.mapState([
            'newFormModel'
        ]),
        optionsFromStore() {
            return this.newFormModel.questions[this.questionId].options
        }
    },
    methods: {
        ...Vuex.mapActions([
            'setOptions'
        ]),
        changeOption(e) {
            this.options = [...this.optionsFromStore]
            if(this.options[this.options.length-1].value.length) {
                this.options.push({
                    value:"",
                })
                this.options.splice(1, -1)
            } else if(this.options[this.options.length-2].value.length===0) {
                this.options.pop()
                this.options.splice(1, -1)
            } else if(this.options[parseInt(e.target.name)].value.length===0) {
                for(let i=parseInt(e.target.name);i<this.options.length-1;i++) {
                    this.$set(this.options[i], 'value', this.options[i+1].value)
                }
                this.options.splice(-1, 1)
            }
            this.setOptions({'questionId': this.questionId, 'options': this.options})
        }
    }
}
</script>
