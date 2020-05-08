<template>
  <div class="documentsHandlerContainer">
    <b-card no-body class="mb-3">
      <div header-tag="header" class="p-1" role="tab">
        <div class="m-2 d-flex justify-content-between" block href="#" v-b-toggle="'accordion-' + type" variant="info">
          <h1>{{title}}<button v-if="type === 'reviews' || type === 'news'" @click="navigateTo(type)" class="ml-2 btn btn-primary">Ajouter</button></h1>
          <div class="d-flex flex-column justify-content-center">
            <img class="down-icon" src="../../../img/down.png" />
          </div>
        </div>
      </div>
      <b-collapse :id="'accordion-' + type" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <ContentContainer v-for="(content, key) in sortedByDate" 
            :key="key"
            :content="content"
            :type="type"
            :subtype="key"
          ></ContentContainer>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import ContentContainer from './ContentContainer'
export default {
  props:['title', 'type', 'contents'],
  data() {
    return {
    };
  },
  components: {
    ContentContainer
  },
  methods: {
    navigateTo(destination) {
      if(destination === 'reviews') {
       this.$router.push({ name: 'AddReview', params: { title: this.title, type: this.type } } )
      }
      else {
        this.$router.push({ name: 'AddNews', params: { title: this.title, type: this.type } } )
      } 
    }
  },
  created(){
  },
  computed: {
    sortedByDate() {
      if(this.type === 'reviews') {
        const datas = {
        ...this.contents
      }
      var sorted = Object.keys( datas ).sort(function( a, b ) {
        return datas[a].uploadDate < datas[b].uploadDate
      }).map(function( sortedKey ) {
          return [sortedKey, datas[ sortedKey ]];
      });

      return sorted ? Object.fromEntries(sorted) : {}

      }
      return this.contents
    }
  }
};
</script>

<style>

</style>