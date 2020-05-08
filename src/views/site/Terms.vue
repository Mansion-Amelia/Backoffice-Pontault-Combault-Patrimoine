<template>
  <div class="reviewsContainer">
    <Header title="Mentions légales"></Header>
    <div class="termsContainer">
      <div class="terms" v-html="terms.content"></div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { db } from '../../config/db'
import Header from '../../components/site/commons/Header'
import Footer from '../../components/site/commons/Footer'
export default {
  data() {
    return {
      terms: {}
    }
  },
  components: {
    Header,
    Footer
  },
  methods: {
  },
  created(){
     db.ref('site/contents/terms').once('value').then((snapshot) => {
      this.terms = snapshot.val()
    });
  }
};

</script>

<style>
 .termsContainer{
   display:flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
 }

 .terms {
    width:80%;
    text-align: justify;  /* For Edge */
    text-align-last: left;
 }
  #appContainer .terms h2 {
   margin: 25px 0px 10px 0px;
 }
</style>