<template>
  <div class="verifiedNeeded bold">
    Une demande de validation d'email vous a été envoyé sur l'adresse mail renseignée lors de votre inscription. <br>
    Veuillez cliquer sur le lien renseigné pour valider votre adresse mail. <br>
    <div class="resendContainer">
      <div v-if="!resend" @click="resendVerificationEmail" class="link">Cliquez ici si vous n'avez pas reçu le mail</div>
      <div v-if="resend" class="success">
        Un nouveau mail de vérification vous a été envoyé.
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      resend: false,
    };
  },
  components: {
  },
  methods: {
    resendVerificationEmail() {
      const user = firebase.auth().currentUser;
      user.sendEmailVerification().then(() => {
        this.resend = true
        this.$router.push({ name: 'espaceAdherent' }).catch(() => {})
      })
    },
    handleVerifyEmail(auth, actionCode) {
      auth.applyActionCode(actionCode).then(() => {
        this.$router.push({ name: 'espaceAdherent' }).catch(() => {})
      }).catch(() => {
      })
    }
  },
};
</script>

<style>
  .verifiedNeeded {
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .resendContainer {
    margin:20px;
  }
</style>