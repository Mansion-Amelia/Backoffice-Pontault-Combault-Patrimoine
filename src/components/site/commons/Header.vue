<template>
  <div v-bind:class="[isFullPage ? 'headerContainer full' : 'headerContainer']">
    <div class="navigation">
      <div class="logo">
        <img src="../../../img/logo-asso-white.png" alt="logo">
      </div>
      <div class="links">
        <span @click="navigateTo('home')" class="bold">Accueil</span>
        <span class="bold">Notre revue</span>
        <span class="bold">Notre actualité</span>
        <span class="bold">Espace adhérent</span>
      </div>
    </div>
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
    navigateTo(destination) {
      this.$router.replace({ name: destination })
    }
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

  .navigation {
    width:100%;
    position:absolute;
    top: 30px;
    display:flex;
  }

  .logo {
    width: 30%;
  }

  .links {
    width: 70%;
  }

  .links span {
    margin-right: 25px;
    color:white;
  }

  .links span:hover {
    transform:scale(0.95);
    cursor:pointer;
  }

  .logo img {
    height:150px;
    margin-left:25px;
  }

  .links {
    display:flex;
    justify-content: flex-end;
    align-items: center;
  }

  .headerContainer img{
   object-fit: cover;
  }

  .headerContainer  h1{
    position:absolute;
    font-size: 50px;
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