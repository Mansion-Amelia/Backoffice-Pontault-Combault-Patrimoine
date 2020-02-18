<template>
  <div class="footerContainer">
    <div class="contactUs">
      <div class="title">
        <h2>Nous contacter</h2>
      </div>
      <div class="content">
        <div class="contactOption">
          <div class="visu">
            <img src="../../../img/site/mail.svg" alt="icon">
          </div> 
          protectionpatrimoine77340@gmail.com
        </div>
        <div class="contactOption">
          <div class="visu">
            <img src="../../../img/site/facebook.svg" alt="icon"> 
          </div>
          Pontault-Combault Patrimoine
        </div>
        <div class="contactOption">
          <div class="visu">
            <img src="../../../img/site/localisation.svg" alt="icon">
          </div>
          12 rue de Lagny 77340 Pontault-Combault
        </div>
      </div>
    </div>
    <div class="footerNavigation">
      <div class="title">
        <h2>Navigation</h2>
      </div>
      <div class="content">
        <div class="footerNavigationOption">
          Mentions légales
        </div>
        <div class="footerNavigationOption">
         Notre revue
        </div>
        <div @click="goToAdministration" class="footerNavigationOption">
          Administration
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  components: {
  },
  methods: {
    goToAdministration() {
       this.$router.replace({ name: "BackofficeSelector" })
    }
  }
};
</script>

<style>
  .footerContainer {
    height:300px;
    background-color: var(--bluePontault);
    color: white;
    display:flex;
  }

  #appContainer .footerContainer h2 {
    margin-top: 50px;
    margin-bottom: 10px;
    margin-left: 0px;
  }

  .contactUs, .footerNavigation {
    width:50%;
    padding-left: 80px;
  }

  .contactOption, .footerNavigationOption {
    margin-top: 10px;
  }
  .footerNavigationOption:hover {
    transform: scale(0.98);
    cursor:pointer;
  }

  .contactOption {
    display:flex;
    align-items: center;
  }
  .contactOption .visu {
    display:flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .contactOption img {
    height: 30px;
  }


</style>