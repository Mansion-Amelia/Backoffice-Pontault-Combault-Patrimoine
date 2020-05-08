<template>
  <div class="documentsHandlerContainer">
    <DocumentsSection title="Compte rendu" :documents="documents['CR']" type="CR"></DocumentsSection>
    <DocumentsSection title="Bibliothèque" :documents="documents['bibliotheque']" type="bibliotheque"></DocumentsSection>
    <DocumentsSection title="Livres en prêt" :documents="documents['livres']" type="livres"></DocumentsSection>
    <DocumentsSection title="Non adhérents" :documents="documents['administration']" type="administration"></DocumentsSection>
  </div>
</template>

<script>
import { db } from '../../../config/db'
import DocumentsSection from './DocumentsSection'
export default {
  data() {
    return {
      documents: {}
    };
  },
  components: {
    DocumentsSection
  },
  methods: {
  },
  created() {
    db.ref('site/documents/').once('value').then((snapshot) => {
      this.documents = snapshot.val() ? snapshot.val() : {}
    });

  }
};
</script>

<style>
.documentsHandlerContainer {
  width:100%;
  max-width: 800px;
}
</style>