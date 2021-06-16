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
                        <sui-form-field v-for="opt in options" :key="opt.value">
                            <input placeholder="Option" v-model="opt.content" @input="changeOption" :name="opt.value"/>
                        </sui-form-field>
                    </sui-form>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </div>
</template>
<script>
export default {
    name:'Options',
    data() {
        return {
            options: [
                {
                    content: "",
                    value: 0
                }
            ]
        }
    },
    methods: {
        changeOption(/*e*/) {
            if(this.options[this.options.length-1].content.length) {
                this.options.push({
                    content:"",
                    value:this.options.length+1
                })
                this.options.splice(1, -1)
            } else if(this.options.length>1 && this.options[this.options.length-2].content.length===0) {
                this.options.pop()
                this.options.splice(1, -1)
            } /*else if(e.target.value.length===0 && this.options[e.target.name]) {
                
            }*/
        }
    }
}
</script>
