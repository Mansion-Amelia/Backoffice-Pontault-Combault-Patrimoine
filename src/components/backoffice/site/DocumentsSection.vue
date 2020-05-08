<template>
  <div class="documentsHandlerContainer">
    <b-card no-body class="mb-3">
      <div header-tag="header" class="p-1" role="tab">
        <div class="m-2 d-flex justify-content-between" block href="#" v-b-toggle="'accordion-' + type" variant="info">
          <h1>{{title}}<button @click="navigateTo('AddDocument')" class="ml-2 btn btn-primary">Ajouter</button></h1>
          <div class="d-flex flex-column justify-content-center">
            <img class="down-icon" src="../../../img/down.png" />
          </div>
        </div>
      </div>
      <b-collapse :id="'accordion-' + type" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <DocumentContainer v-for="(document, key) in sortedByDate" 
            :key="document.filename"
            :document="document"
            :documentName="key"
            :type="type"
          ></DocumentContainer>
          <div v-if="!documents">Aucun document.</div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import DocumentContainer from './DocumentContainer'
export default {
  props:['title', 'type', 'documents'],
  data() {
    return {
    };
  },
  components: {
    DocumentContainer
  },
  methods: {
    navigateTo(destination) {
      this.$router.push({ name: destination, params: { title: this.title, type: this.type } } )
    }
  },
  computed: {
    sortedByDate() {
      const datas = {
        ...this.documents
      }
      var sorted = Object.keys( datas ).sort(function( a, b ) {
        return datas[a].uploadDate < datas[b].uploadDate
      }).map(function( sortedKey ) {
          return [sortedKey, datas[ sortedKey ]];
      });
      return sorted ? Object.fromEntries(sorted) : {}
    }
  }
};
</script>

<style>

</style>