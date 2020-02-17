<template>
    <div>
        <a>
            <div class="baladeBox row">
                <div class="thumbnailSize col-5">
                    <img class="baladeThumbnail" v-bind:src="photo" />
                </div>
                <div class="baladeInfo col-7 d-flex flex-column justify-content-between">
                    <div class="baladeTitle">{{question.name}}</div>
                     <div class="baladeTitle">{{question.location}}</div>
                    <div class="d-flex justify-content-between">
                        <div class="baladeDistance d-flex">
                        </div>
                        <div class="baladeDuration d-flex">
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
            toDelete:[],
            photo:null,
            location:[]
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
            readLocations() {
                let self=this
                var query =  db.ref('app/locations/').orderByKey();
                query.once("value")
                .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        if(childSnapshot.key==self.question.location){
                            self.location=(childSnapshot.val());
                            self.photo=self.location.photos
                        }
                    });
                });
            },
        },
        mounted:function(){
            this.readLocations()
        }
        
    }
</script>