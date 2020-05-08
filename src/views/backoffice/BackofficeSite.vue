<template>
  <div class="backofficeSiteContainer">
    <div @click="returnToSelection" class="backIcon" style="cursor: pointer;"><img src="../../img/back-blue.svg" /> Retour </div>
    <div class="backOfficeSiteMenu">
      <div @click="updateSelectedTab('handleAdherents')" :class="selectedTab === 'handleAdherents' ? 'selectedChoice link' : 'choice link'">Gérer les adhérents</div>
      <div @click="updateSelectedTab('handleContents')" :class="selectedTab === 'handleContents' ? 'selectedChoice link' : 'choice link'">Gérer les contenus</div>
      <div @click="updateSelectedTab('handleDocuments')" :class="selectedTab === 'handleDocuments' ? 'selectedChoice link' : 'choice link'">Gérer les documents</div>
    </div>
    <div class="selectedTabContainer">
      <AdherentsHandler v-show="selectedTab === 'handleAdherents'"></AdherentsHandler>
      <ContentsHandler v-show="selectedTab === 'handleContents'"></ContentsHandler>
      <DocumentsHandler v-show="selectedTab === 'handleDocuments'"></DocumentsHandler>
    </div>
  </div>
</template>

<script>
import AdherentsHandler from '../../components/backoffice/site/AdherentsHandler'
import DocumentsHandler from '../../components/backoffice/site/DocumentsHandler'
import ContentsHandler from '../../components/backoffice/site/ContentsHandler'
export default {
  props:['previousTab'],
  data() {
    return {
      selectedTab: this.previousTab ? this.previousTab : "handleAdherents"
    };
  },
  components: {
    AdherentsHandler,
    DocumentsHandler,
    ContentsHandler
  },
  methods: {
    returnToSelection() {
      this.$router.push({ name: "BackofficeSelector" })
    },
    updateSelectedTab(selectedTab) {
      this.selectedTab = selectedTab
    }
  }
};
</script>

<style>
  .backofficeSiteContainer, .CRHandlerContainer {
    margin: 2em 50px;
  }
  .backOfficeSiteMenu {
    display:flex;
    justify-content: center;
    text-align: center;
  }
  .backOfficeSiteMenu .choice, .backOfficeSiteMenu .selectedChoice {
    color:white;
    padding:15px;
    font-weight: bold;
    margin: 5px;
  }

  .backOfficeSiteMenu .choice {
    background-color: #D8DEE3;
  }

  .backOfficeSiteMenu .selectedChoice {
    background-color: var(--darkbluePontault);
  }
  .selectedTabContainer {
    width:100%;
    display:flex;
    justify-content: center;
  }
</style>