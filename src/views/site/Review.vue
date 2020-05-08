<template>
  <div class="reviewsContainer">
    <Header title="Notre revue"></Header>
    <div class="reviews">
      <ReviewContainer v-for="(review, index) in reviews"
        :key="review[0]"
        :reviewName="review[0]"
        :review="review[1]"
        :reviewNumber="reviews.length - index"
      >
      </ReviewContainer>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { db } from '../../config/db'
import Header from '../../components/site/commons/Header'
import ReviewContainer from '../../components/site/review/ReviewContainer'
import Footer from '../../components/site/commons/Footer'
export default {
  data() {
    return {
      reviews: {}
    }
  },
  components: {
    Header,
    ReviewContainer,
    Footer
  },
  methods: {
  },
  created(){
     db.ref('site/contents/reviews').once('value').then((snapshot) => {
      const datas = {
        ...snapshot.val()
      }
      var sortedReviews = Object.keys( datas ).sort(function( a, b ) {
        return datas[a].uploadDate < datas[b].uploadDate
      }).map(function( sortedKey ) {
          return [sortedKey, datas[ sortedKey ]];
      });
      this.reviews = sortedReviews
    });
  }
};

</script>

<style>
.reviews {
  width:100%;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>