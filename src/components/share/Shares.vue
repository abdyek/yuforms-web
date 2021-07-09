<template>
    <div>
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :computer="5" :mobile="16" :stackable="true">
                    <sui-form>
                        <sui-form-field>
                          <label>Share</label>
                          <sui-dropdown
                            placeholder="Share"
                            selection
                            :options="options"
                            v-model="current"
                          />
                        </sui-form-field>
                    </sui-form>
                </sui-grid-column>
                <sui-grid-column :computer="7" :mobile="null" :stackable="true" />
            </sui-grid-row>
        </sui-grid>
        <Statistics />
        <Answers />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import Statistics from '@/components/answer/Statistics.vue'
import Answers from '@/components/answer/Answers.vue'
export default {
    name: 'Shares',
    computed: {
        ...mapState([
            'shareModels',
            'currentlyViewedShare'
        ]),
        options() {
            const options = []
            let last;
            for(let i=0; i<this.shareModels.length;i++) {
                let model = this.shareModels[i]
                if(i===0) {
                    last = (model.stopDateTime===null)?'Current':'Last'
                }
                options.push({
                    text: (i===0)?last:model.startDateTime.date + ' - ' + model.stopDateTime.date,
                    value: model.id
                })
            }
            return options
        },
        current: {
            get() {
                return this.currentlyViewedShare
            },
            set(value) {
                this.$store.commit('setCurrentlyViewedShare', value)
                axios.get('/api/share', {
                    params: {
                        id:value
                    }
                }).then((response)=>{
                    this.$store.commit('setAnswerModels', response.data.answers)
                })
            }
        }
    },
    components: {
        Answers,
        Statistics
    }
}
</script>
