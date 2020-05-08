<template>
  <div class="contentHandlerContainer">
    <ContentsSection title="Page d'accueil" type="home" :contents="contents['home']"></ContentsSection>
    <ContentsSection title="Mentions légales" type="terms" :contents="contents['terms']"></ContentsSection>
    <ContentsSection title="Revue" type="reviews" :contents="contents['reviews']"></ContentsSection>
    <ContentsSection title="Actualité" type="news" :contents="contents['news']"></ContentsSection>
  </div>
</template>

<script>
import { db } from '../../../config/db'
import ContentsSection from './ContentsSection'
export default {
  data() {
    return {
      documents: {},
      contents: {}
    };
  },
  components: {
    ContentsSection
  },
  methods: {
  },
  created() {
    db.ref('site/contents/').once('value').then((snapshot) => {
      this.contents = snapshot.val() ? snapshot.val() : {}
    });
  }
};
</script>

<style>
.contentHandlerContainer {
  width:100%;
  max-width: 800px;
}
</style>