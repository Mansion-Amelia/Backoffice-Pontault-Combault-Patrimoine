<template>
  <div class="container containerBackoffice">
	<h1>Lieux <button  @click="setActivePageBackoffice('FormAddLocation')" class="ml-1 btn btn-primary">Ajouter un lieu</button></h1>  
    <LocationBoxBackoffice v-for="location in getBackofficeLocation" :key="location.name" :location='location'></LocationBoxBackoffice>
	<h1>Balades <button @click="setActivePageBackoffice('FormAddWalk')" class="ml-1 btn btn-primary">Ajouter une balade</button></h1>
    <BaladeBoxBackoffice v-for="walk in getBackofficeWalk" :key="walk.name" :walk='walk'></BaladeBoxBackoffice>
  </div>
</template>

<script>
// RecentDocuments.vue
import { db,storageRef } from '../config/db'
import {mapActions, mapGetters} from 'vuex'

import LocationBoxBackoffice from '../components/LocationBoxBackoffice'
import BaladeBoxBackoffice from '../components/BaladeBoxBackoffice'


import FormDeleteLocation from '../components/FormDeleteLocation'
import FormAddLocation from '../components/FormAddLocation'
import FormAddWalk from '../components/FormAddWalk'
import FormDeleteWalk from '../components/FormDeleteWalk'
    export default {
  name: "Backoffice",
  components: {
    FormDeleteLocation,
    FormAddLocation,
    FormAddWalk,
    FormDeleteWalk,
    LocationBoxBackoffice,
    BaladeBoxBackoffice
  },
  data() {
    return {
      documents: [],
      errors: [],
      locations: [],
      walks: []
    }
  },
  firebase: {
    documents: db.ref()
  },
  methods:{
      ... mapActions([
                'setActivePageBackoffice',
                'setBackofficeLocation',
                'setBackofficeWalk'
        ]),
    readLocations(){
        let self=this
		var query =  db.ref('app/locations/').orderByKey();
		query.once("value")
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
        self.locations.push(childSnapshot.val());  
      });
      self.setBackofficeLocation(self.locations)
		});
	},
	readWalks(){
        let self=this
		var query =  db.ref('app/walks/').orderByKey();
		query.once("value")
		.then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				self.walks.push(childSnapshot.val());  
      });
            self.setBackofficeWalk(self.walks)

		});
    },
  
  },
  computed:{
            ... mapGetters([
                'getBackofficeLocation',
                'getBackofficeWalk'
            ]),
    },
	mounted: function(){
		this.readLocations()
		this.readWalks()
	}
}
</script>

<style>
 </style>