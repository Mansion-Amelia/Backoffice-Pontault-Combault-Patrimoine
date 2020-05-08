<template>
  <div class="adherentDocumentsContainer">
    <div class="bold">Documents disponibles</div>
    <div class="adherentDocuments">
      <div class="backOfficeSiteMenu">
        <div @click="updateSelectedTab('CR')" :class="selectedTab === 'CR' ? 'selectedChoice link' : 'choice link'">Compte rendu de réunion</div>
        <div @click="updateSelectedTab('bibliotheque')" :class="selectedTab === 'bibliotheque' ? 'selectedChoice link' : 'choice link'">Bibliothèque en ligne</div>
        <div @click="updateSelectedTab('livres')" :class="selectedTab === 'livres' ? 'selectedChoice link' : 'choice link'">Livres en prêt</div>
      </div>
      <div class="selectedAdherentTabContainer">
        <AdherentDocumentSection v-show="selectedTab === 'CR'" :documents="documents['CR']"></AdherentDocumentSection>
        <AdherentDocumentSection v-show="selectedTab === 'bibliotheque'" :documents="documents['bibliotheque']"></AdherentDocumentSection>
        <AdherentDocumentSection v-show="selectedTab === 'livres'" :documents="documents['livres']"></AdherentDocumentSection>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../../config/db'
import AdherentDocumentSection from './AdherentDocumentSection'
export default {

  data() {
    return {
      selectedTab: "CR",
      documents: {}
    };
  },
  components: {
    AdherentDocumentSection
  },
  methods: {
    updateSelectedTab(selectedTab) {
      this.selectedTab = selectedTab
    }
  },
  created() {
    db.ref('site/documents/').once('value').then((snapshot) => {
      this.documents = snapshot.val() ? snapshot.val() : {}
    });

  }
};
</script>

<style>
  .adherentDocumentsContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .adherentDocuments {
    width: auto;
  }
</style>