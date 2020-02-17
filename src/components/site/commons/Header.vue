<template>
  <div v-bind:class="[isFullPage ? 'headerContainer full' : 'headerContainer']">
    <img src="https://upload.wikimedia.org/wikipedia/commons/5/54/20180301124354_IMG_4179And6more_Interior_3.jpg" alt="imgHeader">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  props:['title', 'isFullPage'],
  data() {
    return {
    };
  },
  methods: { 
  }
};
</script>

<style>
  .headerContainer{
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
  }

  .headerContainer img{
   object-fit: cover;
  }

  .headerContainer  h1{
    position:absolute;
    font-size: 40px;
    font-weight: bold;
    color:white;
    top: 75%;
    left:50%;
    transform: translate(-50%, -50%);
  }

  .full h1 {
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
  .full {
    height: 100vh;
  }
</style>