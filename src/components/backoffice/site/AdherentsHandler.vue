<template>
  <div class="adherentHandlerContainer">
    <table>
      <thead>
        <tr>
          <th>Nom de l'adhérent</th>
          <th>Accès aux documents</th>
          <th>Suppression</th>
        </tr>
      </thead>
      <tbody>
        <AdherentContainer v-for="(adherent, id) in sortedByLastName"
          :adherent="adherent"
          :adherentId="id"
          :key="id"
        ></AdherentContainer>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from '../../../config/db'
import AdherentContainer from './AdherentContainer'
export default {
  data() {
    return {
      adherents: null
    };
  },
  components: {
    AdherentContainer
  },
  methods: {
  },
  created() {
    db.ref('site/users').once('value').then((snapshot) => {
      let adherents = snapshot.val()
      delete adherents['zVbbZ96fqYauhxLUDjsEhdqEhSM2']; 
      this.adherents = adherents
    })
  },
  computed: {
    sortedByLastName() {
      const datas = {
        ...this.adherents
      }
      var sorted = Object.keys( datas ).sort(function( a, b ) {
        return datas[a].lastName.localeCompare(datas[b].lastName)
      }).map(function( sortedKey ) {
          return [sortedKey, datas[ sortedKey ]];
      });
      return sorted ? Object.fromEntries(sorted) : {}
    }
  }
};
</script>

<style>
  .adherentHandlerContainer {
    display:flex;
    flex-direction: column;
    width:80%;
  }
  .adherentHandlerContainer table, .adherentHandlerContainer tr  {
    width:100%;
  }
  
  .adherentHandlerContainer th {
    width:33%;
    text-align: center;
  }
</style>