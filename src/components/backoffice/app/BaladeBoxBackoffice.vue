<template>
    <div>
        <a>
            <div class="baladeBox row">
                <div class="thumbnailSize col-5">
                    <img class="baladeThumbnail" v-bind:src="walk.photos" />
                </div>
                <div class="baladeInfo col-7 d-flex flex-column justify-content-between">
                    <div class="baladeTitle">{{ walk.name }}</div>
                    <div class="d-flex justify-content-between">
                        <div class="baladeDistance d-flex">
                            <div><img src="../../../img/distance-blue.svg" /></div>
                            <div class="align-self-end km">{{ walk.distance }}</div>
                        </div>
                        <div class="baladeDuration d-flex">
                            <div><img src="../../../img/chronometer-blue.svg" /></div>
                            <div class="align-self-end duration">{{ walk.duration}}</div>
                        </div>
                        <div class="modif" style="cursor: pointer;" @click="setActivePageBackoffice('FormChangeWalk'), setBackofficeWalk(walk)"><img src="../../../img/pen.svg" /></div>
                        <div class="delete" style="cursor: pointer;" @click="removeWalkCarnet(walk.name)" ><img src="../../../img/garbage-blue.svg" /></div>
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
        name:'BaladeCarnetBox',
        props:['walk'],
         data: function () {
            return {
               
            }
        },
        methods: {
            ... mapActions([
                'deleteBackofficeWalk',
                'setActivePageBackoffice',
                'setBackofficeWalk'
            ]),
            removeWalkCarnet(name) {
                this.deleteBackofficeWalk(this.walk)
                db.ref('app/walks/'+name).remove().then(() => {
            
            })
            },

        },
        mounted:function(){
        },
        computed:{
            ... mapGetters([
                'getLocalStoreWalk',
                
            ]),
        },
    }
</script>

<style>

.baladeBox {
    margin: 1em;
}

.thumbnailSize {
    width: 9em;
    height: 7em;
    padding: 0;
}

.baladeThumbnail {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.baladeInfo {
    color: var(--darkbluePC);
}

.baladeDistance .km, .baladeDuration .duration {
    padding-left: 0.3em;
    padding-right: 0.3em;
}

.baladeDistance img, .baladeDuration img, .delete img, .modif img {
    height: 1.5em;
}

.duration, .km {
    line-height: 1em;
}
</style>