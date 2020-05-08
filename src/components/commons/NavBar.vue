<template>
  <div class="navBar">
    <div class="connectedAsContainer" v-if="pseudo">
      <div class="connectedAs">Connecté en tant que <span class="bold">{{ pseudo }}</span></div>
    </div>
    <div v-bind:class="[pseudo ? 'navigationOptions' : 'navigationOptions alone']">
        <div v-if="mode !== 'editProfile'" class="editProfile link" @click="editProfile">Editer mon profil</div>
        <div v-if="mode === 'editProfile'" class="editProfile link" @click="back">Quitter mon profil</div>
        <div class="logout link" @click="logout">Déconnexion</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import userStore from "../../store/userStore";
export default {
  props:['pseudo', 'from', 'mode'],
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
          userStore.dispatch("fetchUser", null);
          this.$router.push({ name: this.from === 'BackOfficeSelector' ?  "loginAdministration" :  "loginAdherent"})
        });
    },
    editProfile(){
      this.$router.push({ name: "editProfile", params: {from: this.from } } )
    },
    back() {
      this.$router.push({ name: this.from ? this.from : 'espaceAdherent' })
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
    margin-bottom:50px;
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

  .navigationOptions div:hover {
    transform:scale(0.95);
    cursor:pointer;
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