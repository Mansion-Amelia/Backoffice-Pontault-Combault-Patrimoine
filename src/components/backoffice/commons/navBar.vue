<template>
  <div class="navBar">
    <div class="connectedAsContainer" v-if="pseudo">
      <div class="connectedAs">Connecté en tant que <span class="bold">{{ pseudo }}</span></div>
    </div>
    <div v-bind:class="[pseudo ? 'navigationOptions' : 'navigationOptions alone']">
        <div class="editProfile bold" @click="editProfile">Editer mon profil</div>
        <div class="logout bold" @click="logout">Déconnexion</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props:['pseudo'],
  data() {
    return {
    };
  },
  methods: {
    logout() {
       firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "loginAdministration" })
        });
    },
    editProfile(){

    }
  }
};
</script>

<style>
  .navBar {
    width:100%;
    display:flex;
  }
  .connectedAsContainer, .navigationOptions  {
    width:50%;
    display:flex;
    margin: 80px 0px;
  }

  .alone {
    width:100%;
  }
  .connectedAsContainer {
    margin-left: 50px;
  }
  .navigationOptions {
    margin-right: 50px;
  }

  .connectedAsContainer {
    justify-content: flex
  }

  .navigationOptions {
    justify-content: flex-end
  }

  .editProfile, .logout {
    margin: 0px 20px;
  }
</style>