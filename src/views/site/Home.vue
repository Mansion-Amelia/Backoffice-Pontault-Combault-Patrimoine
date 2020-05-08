<template>
  <div class="homeContainer">
    <Header title="Accueil" isFullPage="true"></Header>
    <div class="pageContainer">
      <UsefullLinks v-vpshow="'left'"></UsefullLinks>
      <WhoAreWe v-vpshow="'right'"></WhoAreWe>
      <MobileApplication v-vpshow="'left'"></MobileApplication>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../../components/site/commons/Header'
import UsefullLinks from '../../components/site/home/UsefullLinks'
import WhoAreWe from '../../components/site/home/WhoAreWe'
import MobileApplication from '../../components/site/home/MobileApplication'
import Footer from '../../components/site/commons/Footer'
export default {
  data() {
    return {
      
    }
  },
  components: {
    Header,
    UsefullLinks,
    WhoAreWe,
    MobileApplication,
    Footer
  },
  methods: {
  }
};

</script>

<style>
  .pageContainer {
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  } 
  .lbefore-enter {
    opacity: 0;
    margin-right: -30%;
  }

  .rbefore-enter {
    opacity: 0;
    margin-right: 90%;
  }

  .enter {
    margin-right: 0;
    transition: all 2s ease;
  }
</style>