<template>
    <div>
        <a>
            <div class="baladeBox row">
                <div class="thumbnailSize col-5">
                    <img class="baladeThumbnail" v-bind:src="location.photos" />
                </div>
                <div class="baladeInfo col-7 d-flex flex-column justify-content-between">
                    <div class="baladeTitle">{{location.name}}</div>
                    <div class="d-flex justify-content-between">
                        <div class="baladeDistance d-flex">
                        </div>
                        <div class="baladeDuration d-flex">
                        </div>
                         <div @click="setActivePageBackoffice('FormChangeLocation'), setBackofficeLocation(location)"  class="modif" style="cursor: pointer;"><img src="../../../img/pen.svg" /></div>
                        <div @click="removeLocationCarnet(location.name)" class="delete" style="cursor: pointer;"><img src="../../../img/garbage-blue.svg" /></div>
                    </div>
                </div>
            </div>
        </a>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db } from '../../../config/db'


    export default {
        name:'LieuCarnetBox',
        props:['location'],
        data() {
            return {
            documents: [],
            errors: [],
            toDelete:[]
            }
        },
        methods: {
            ... mapActions([
                'deleteBackofficeLocation',
                'setActivePageBackoffice',
                'setBackofficeLocation'
            ]),
            removeLocationCarnet(name) {
                this.deleteBackofficeLocation(this.location)
                 
                db.ref('app/locations/'+name).remove().then(() => {
                    let self=this
                    var query =  db.ref('app/walks/').orderByKey();
                    query.once("value").then(function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            let present=childSnapshot.val()
                            let stored = present.locations
                            let tmp=0
                            stored.forEach(function(child){
                                   
                                    if(child==self.location.name){
                                        db.ref('app/walks/'+present.name+'/locations/'+tmp).remove()
                                    }else{
                                        tmp++
                                    }
                            })
                        });
                    });                    
                })
            },
            readWalks(){
                
            },

        },
        
    }
</script>