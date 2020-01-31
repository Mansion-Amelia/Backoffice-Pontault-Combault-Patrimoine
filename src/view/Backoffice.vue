<template>
  <div class="container containerBackoffice">
    	<component :is="this.getActivePageBackoffice"></component>  
  </div>
</template>

<script>
// RecentDocuments.vue
import { db,storageRef } from '../config/db'
import {mapActions, mapGetters} from 'vuex'

import FormDeleteLocation from '../components/FormDeleteLocation'
import FormAddLocation from '../components/FormAddLocation'
import FormChangeLocation from '../components/FormChangeLocation'
import FormChangeWalk from '../components/FormChangeWalk'
import FormAddWalk from '../components/FormAddWalk'
import FormDeleteWalk from '../components/FormDeleteWalk'
import ListeBackoffice from '../components/ListeBackoffice'

    export default {
  name: "Backoffice",
  components: {
    FormDeleteLocation,
    FormAddLocation,
    FormAddWalk,
	  FormDeleteWalk,
    ListeBackoffice,
    FormChangeLocation,
    FormChangeWalk,
  },
  data() {
    return {
      documents: [],
	  errors: [],
	  activePage: 'ListeBackoffice'
    }
  },
  firebase: {
    documents: db.ref()
  },
  methods:{
	  ... mapActions([
                'setActivePageBackoffice',
        ]),
  
  },
  computed:{
            ... mapGetters([
                'getActivePageBackoffice'
            ]),
	},
	mounted: function(){
		this.setActivePageBackoffice(this.activePage)
	}
}
</script>

<style>
    .containerBackoffice, .containerBackoffice h1,  input, #photos, option  {
        color: #44546a;
    }
    .containerBackoffice {
            margin: 2em auto;
    }
 </style>