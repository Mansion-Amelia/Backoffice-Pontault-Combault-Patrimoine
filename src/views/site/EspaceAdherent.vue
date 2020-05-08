<template>
  <div class="espaceAdherentContainer">
    <Header title="Espace adhérent"></Header>
    <NavBar :pseudo="userName" from="espaceAdherent"></NavBar>
    <VerifiedMailNeeded v-if="!user.isVerified"></VerifiedMailNeeded>
    <AccessNeeded v-if="user.isVerified && !user.datas.hasAccess"></AccessNeeded>
    <AdherentDocuments v-if="user.isVerified && user.datas.hasAccess"></AdherentDocuments>
    <Footer></Footer>
  </div>
</template>

<script>
import firebase from "firebase"
import Header from "../../components/site/commons/Header"
import NavBar from "../../components/commons/NavBar"
import Footer from "../../components/site/commons/Footer"
import VerifiedMailNeeded from "../../components/site/adherent_space/VerifiedMailNeeded"
import AccessNeeded from "../../components/site/adherent_space/AccessNeeded"
import AdherentDocuments from "../../components/site/adherent_space/AdherentDocuments"
import userStore from "../../store/userStore";

export default {
  data() {
    return {
    };
  },
  components: {
    Header,
    NavBar,
    Footer,
    VerifiedMailNeeded,
    AccessNeeded,
    AdherentDocuments
  },
  methods: {
    handleVerifyEmail(auth, actionCode) {
      auth.applyActionCode(actionCode).then(() => {
        this.$router.push({ name: 'espaceAdherent' }).catch(() => {})
      }).catch(() => {})
    }
  },
  computed: {
    user() {
      return userStore.getters.user
    },
    userName() {
      return userStore.getters.userName
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const actionCode = urlParams.get('oobCode');
    // const continueUrl = urlParams.get('continueUrl');
    const auth = firebase.auth()
    switch (mode) {
      case 'verifyEmail':
        this.handleVerifyEmail(auth, actionCode);
        break;
      default:
        // Error: invalid mode.
    }
  }
};
</script>

<style>
</style>