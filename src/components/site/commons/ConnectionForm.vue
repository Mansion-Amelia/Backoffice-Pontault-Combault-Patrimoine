<template>
  <div class="connectionFormContainer">
    <div v-if="error" class="connectionError">{{error}}</div>
    <form action="#" @submit.prevent="submit">
      <div class="">
        <label for="email" class="">Adresse mail</label>
        <div class="">
          <input
            id="email"
            type="email"
            name="email"
            value
            required
            autofocus
            v-model="form.email"
          />
        </div>
      </div>
      <div class="">
        <label for="password" class="">Mot de passe</label>

        <div class="">
          <input
            id="password"
            type="password"
            name="password"
            required
            v-model="form.password"
          />
        </div>
      </div>
      <div class="standartContainer">
        <button type="submit" class="submit">Se connecter</button>
      </div>
      <div v-if="destination === 'espaceAdherent'" class="loginTools">
        <div class="forgottenPass">
          <div class="link">Mot de passe oublié ?</div>
        </div>
        <div class="signup">
          <div @click="navigateTo('inscription')" class="link">S'inscrire</div>
          <div class="signupInfo">
            * Contactez l’association après inscription pour bénéficier du contenu réservé.
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  props:['destination'],
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  components: {
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.push({ name: this.destination });
        })
        .catch(() => {
          this.error = 'Identifiant ou mot de passe incorrect.';
        });
    },
    navigateTo(destination) {
      this.$router.push({ name: destination }).catch(() => {})
    }
  }
};
</script>

<style>
  .connectionFormContainer {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loginTools {
    display:flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 30px;
  }

  .connectionError {
    color: rgb(189, 0, 0);
  }
</style>