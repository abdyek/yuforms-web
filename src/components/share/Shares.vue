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
        <Answers />
    </div>
</template>
<script>
import { mapState } from 'vuex'
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
            for(let i=0; i<this.shareModels.length;i++) {
                let model = this.shareModels[i]
                options.push({
                    text: (i===0)?'Last':model.startDateTime.date + ' - ' + model.stopDateTime.date,
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
            }
        }
    },
    components: {
        Answers
    }
}
</script>
