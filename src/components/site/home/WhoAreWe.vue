<template>
  <div class="whoAreWeContainer">
    <h2>{{whoarewe.title}}</h2>
    <div class="videoContainer">
      <iframe 
        v-if="whoarewe.video"
        width="560" 
        height="315" 
        :src="whoarewe.video" 
        frameborder="0" 
        allowfullscreen>
      </iframe>
      <img class="imgWhoAreWe" v-if="!whoarewe.video" src="../../../img/site/whoarewe.jpg" alt="imgWhoAreWe">
    </div>
    <div class="contentContainer">
      <h3>{{whoarewe.subtitle}}</h3>
      <div v-html="whoarewe.content" class="content">
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../../config/db'
export default {
  data() {
    return {
      whoarewe: {}
    };
  },
  components: {
  },
  methods: {
  },
  created() {
    db.ref('site/contents/home/whoarewe').once('value').then((snapshot) => {
      this.whoarewe = snapshot.val() ? snapshot.val() : {}
    });
  }
};
</script>

<style>

.videoContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
}
.content {
  text-align: justify;
  text-align-last: left;
}
.imgWhoAreWe {
  width:700px;
}
</style>