<template>
  <div class="reviewsContainer">
    <Header title="Actualité"></Header>
    <div class="news">
      <NewsContainer v-for="(actu, index) in news"
        :key="actu[0]"
        :news="actu[1]"
        :isLast="index + 1 === news.length" 
      >
      </NewsContainer>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { db } from '../../config/db'
import Header from '../../components/site/commons/Header'
import NewsContainer from '../../components/site/news/NewsContainer'
import Footer from '../../components/site/commons/Footer'
export default {
  data() {
    return {
      news: {}
    }
  },
  components: {
    Header,
    NewsContainer,
    Footer
  },
  methods: {
  },
  created(){
     db.ref('site/contents/news').once('value').then((snapshot) => {
      const datas = {
        ...snapshot.val()
      }
      var sortedReviews = Object.keys( datas ).sort(function( a, b ) {
        return datas[a].uploadDate < datas[b].uploadDate
      }).map(function( sortedKey ) {
          return [sortedKey, datas[ sortedKey ]];
      });
      this.news = sortedReviews
    });
  }
};

</script>

<style>
.news {
  width:100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>