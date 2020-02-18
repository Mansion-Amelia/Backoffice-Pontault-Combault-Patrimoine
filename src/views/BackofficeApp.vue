<template>
  <div class="container containerBackoffice">
    <div v-if="this.getActivePageBackoffice === 'ListeBackoffice'" @click="returnToSelection" class="backIcon" style="cursor: pointer;"><img src="../img/back-blue.svg" /> Retour </div>
    <component :is="this.getActivePageBackoffice"></component>
  </div>
</template>

<script>
// RecentDocuments.vue
import { db,storageRef } from '../config/db'
import {mapActions, mapGetters} from 'vuex'

import FormDeleteLocation from '../components/backoffice/app/FormDeleteLocation'
import FormAddLocation from '../components/backoffice/app/FormAddLocation'
import FormChangeLocation from '../components/backoffice/app/FormChangeLocation'
import FormChangeWalk from '../components/backoffice/app/FormChangeWalk'
import FormAddWalk from '../components/backoffice/app/FormAddWalk'
import FormDeleteWalk from '../components/backoffice/app/FormDeleteWalk'
import ListeBackoffice from '../components/backoffice/app/ListeBackoffice'
import FormAddQuestion from '../components/backoffice/app/FormAddQuestion'
import FormChangeQuestion from '../components/backoffice/app/FormChangeQuestion'

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
    FormAddQuestion,
    FormChangeQuestion
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
        returnToSelection() {
          this.$router.replace({ name: "BackofficeSelector" })
        }
  
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