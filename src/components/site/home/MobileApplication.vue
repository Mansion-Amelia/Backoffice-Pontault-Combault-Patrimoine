<template>
  <div class="mobileApplicationContainer">
   
    <div class="aligner">
      <div class="mobileAppContentContainer">
        <h2>{{mobileapp.title}}</h2>
        <div class="subtitle">{{mobileapp.subtitle}}</div>
        <div v-html="mobileapp.content" class="content"></div>
        <div class="standartContainer">
           <button class="submit" @click="openApp()">S'y rendre</button>
           <div class="mobileAppContentContainerInfos">
             L'application est uniquement accessible depuis un smartphone.
           </div>
        </div>
      </div>
      <div class="preview">
        <img src="../../../img/site/app.png" alt="preview">
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../../config/db'
export default {
  data() {
    return {
      mobileapp: {}
    };
  },
  components: {
  },
  methods: {
    openApp(){
      window.open('https://app.pontault-combault-patrimoine.fr/', '_blank');
    }
  },
  created() {
    db.ref('site/contents/home/mobileapp').once('value').then((snapshot) => {
      this.mobileapp = snapshot.val() ? snapshot.val() : {}
    });
  }
};
</script>

<style>
#appContainer .mobileApplicationContainer {
  margin-top: 70px;
}

.aligner {
  display:flex;
  
}

.subtitle {
  margin-top: 40px;
  margin-bottom:20px;
  font-weight: bold;
  font-style:italic;
  text-align: center;
}

.preview img {
  height:400px;
}
.mobileAppContentContainer{
  margin-right: 40px;
}

.mobileApplicationContainer .standartContainer {
  height:auto;
  flex-direction: column;
}

.mobileApplicationContainer .mobileAppContentContainerInfos{
  font-size:12px;
}


</style>