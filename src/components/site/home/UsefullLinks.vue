<template>
  <div class="usefullLinksContainer">
    <!--<div class="usefullLinkContainer link">
      <div class="linkVisual">
        <img class="imgUsefullLink" src="../../../img/site/mail.png" alt="contact">
      </div>
      <div class="linkInfo">
        Nous contacter
      </div>
    </div>-->
    <div class="usefullLinkContainer link" @click="openFile('adhesion')">
      <div class="linkVisual">
        <img class="imgUsefullLink" src="../../../img/site/adherer.png" alt="adhesion">
      </div>
      <div class="linkInfo">
        Dons et adhésions papier
      </div>
    </div>
      <div class="usefullLinkContainer link" @click="openFile('adhesionWeb')">
      <div class="linkVisual">
        <img class="imgUsefullLink" src="../../../img/site/computer.png" alt="adhesion">
      </div>
      <div class="linkInfo">
        Dons et adhésions en ligne
      </div>
    </div>
    <div class="usefullLinkContainer link" @click="openFile('status')">
      <div class="linkVisual">
        <img class="imgUsefullLink" src="../../../img/site/statuts.png" alt="statuts">
      </div>
      <div class="linkInfo">
        Nos statuts
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../../config/db'
export default {
  data() {
    return {
      statusFile: null,
      adhesionFile: null,
      adhesionWebFile: null,
    };
  },
  components: {
  },
  methods: {
    openFile(type) {
      switch(type){
        case 'adhesion':
          window.open(this.adhesionFile, '_blank');
        break;
        case 'status':
          window.open(this.statusFile, '_blank');
        break;
        case 'adhesionWeb':
           window.open(this.adhesionWebFile, '_blank');
      }
      
    }
  },
  created() {
    db.ref('/site/contents/links/status').once('value').then((snapshot) => {
      this.statusFile = snapshot.val() ? snapshot.val().file : null
    });
     db.ref('/site/contents/links/adhesion').once('value').then((snapshot) => {
      this.adhesionFile = snapshot.val() ? snapshot.val().file : null
    });
    db.ref('/site/contents/links/adhesionWeb').once('value').then((snapshot) => {
      this.adhesionWebFile = snapshot.val() ? snapshot.val().file : null
    });
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

  .imgUsefullLink {
   width:80px;
  }
</style>