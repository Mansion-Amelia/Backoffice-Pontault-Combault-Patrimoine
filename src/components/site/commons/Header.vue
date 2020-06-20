<template>
  <div v-bind:class="[isFullPage ? 'headerContainer full' : 'headerContainer']">
    <div class="navigation">
      <div class="logo">
        <img src="../../../img/logo-asso-white.png" alt="logo">
      </div>
      <div class="links">
        <span @click="navigateTo('home')" class="bold">Accueil</span>
        <span @click="navigateTo('Review')" class="bold">Notre revue</span>
        <span @click="navigateTo('News')" class="bold">Notre actualité</span>
        <span @click="openApp()" class="bold">Notre application</span>
        <span @click="navigateTo('espaceAdherent')" class="bold">Espace adhérent</span>
      </div>
    </div>
    <img src="https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="imgHeader">
    <h1 class="headerTitle">{{title}}</h1>
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
      this.$router.push({ name: destination }).catch(() => {})
    },
     openApp(){
      window.open('https://app.pontault-combault-patrimoine.fr/', '_blank');
    }
  }
};
</script>

<style>
  .headerContainer{
    position: relative;
    width: 100%;
    height: 700px;
    overflow: hidden;
    margin-bottom:70px;
  }

  .navigation {
    width:100%;
    position:absolute;
    top: 30px;
    display:flex;
  }

  .navigation .links span {
    text-transform: uppercase;
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
    text-shadow:1px 1px 10px rgb(32, 32, 32);
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
    text-align: center;
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

  .headerTitle {
    text-align: center;
    text-shadow:1px 1px 10px rgb(32, 32, 32);
  }
</style>