<template>
    <div>
        <a>
            <div class="baladeBox row">

                <div class="baladeInfo col-12 d-flex flex-column justify-content-between">
                    <div class="baladeTitle">{{question.name}}</div>
                    <div class="d-flex justify-content-between">
                        <div class="baladeDistance d-flex">
                            {{question.location}}
                        </div>
                         <div @click="setActivePageBackoffice('FormChangeQuestion'), setBackofficeQuestion(question)"  class="modif" style="cursor: pointer;"><img src="../img/pen.svg" /></div>
                        <div @click="removeQuestion(question.name)" class="delete" style="cursor: pointer;"><img src="../img/garbage-blue.svg" /></div>
                    </div>
                </div>
            </div>
        </a>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db } from '../config/db'


    export default {
        name:'Questions',
        props:['question'],
        data() {
            return {
            documents: [],
            errors: [],
            toDelete:[]
            }
        },
        methods: {
            ... mapActions([
                'deleteBackofficeQuestion',
                'setActivePageBackoffice',
                'setBackofficeQuestion'
            ]),
            removeQuestion(name) {
                this.deleteBackofficeQuestion(this.question)
                 
                db.ref('app/questions/'+name).remove();
            },


        },
        
    }
</script>