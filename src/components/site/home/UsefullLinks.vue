<template>
  <div class="usefullLinksContainer">
    <div class="usefullLinkContainer link">
      <div class="linkVisual">
        <img src="../../../img/site/mail.png" alt="contact">
      </div>
      <div class="linkInfo">
        Nous contacter
      </div>
    </div>
    <div class="usefullLinkContainer link">
      <div class="linkVisual">
        <img src="../../../img/site/adherer.png" alt="contact">
      </div>
      <div class="linkInfo">
        Dons et adhésions
      </div>
    </div>
    <div class="usefullLinkContainer link">
      <div class="linkVisual">
        <img src="../../../img/site/statuts.png" alt="contact">
      </div>
      <div class="linkInfo">
        Nos statuts
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
  }
};
</script>

<style>
  .usefullLinksContainer {
    width:80%;
    max-width:800px;
    margin-bottom:70px;
    display:flex;
    align-items: flex-end;
    justify-content: space-around
  }
  .usefullLinkContainer {
    display:flex;
    flex-direction: column;
    align-items: center;
  }

  .linkInfo {
    margin-top: 5px;
  }
</style>