<template>
  <div class="signupFormContainer">
    <div class="loginAdherentInfos">
      Cet espace est réservé à nos adhérents. Pour plus d’informations, veuillez nous contacter ou faire une demande d’accès.
    </div>
    <form class="standartContainer column" action="#" @submit.prevent="submit">
      <div>
        <label for="lastName">Nom</label>
        <div>
          <input
            id="lastName"
            type="text"
            name="lastName"
            required
            autofocus
            v-model="form.lastName"
          />
        </div>
      </div>
      <div>
        <label for="firstName">Prénom</label>
        <div>
          <input
            id="firstName"
            type="text"
            name="firstName"
            required
            v-model="form.firstName"
          />
        </div>
      </div>
      <div>
        <label for="address">Adresse</label>
        <div>
          <input
            id="address"
            type="text"
            name="address"
            required
            v-model="form.address"
          />
        </div>
      </div>
      <div>
        <label for="cp">Code Postal</label>
        <div>
          <input
            id="cp"
            type="text"
            name="cp"
            required
            v-model="form.cp"
          />
        </div>
      </div>
      <div>
        <label for="city">Ville</label>
        <div>
          <input
            id="city"
            type="text"
            name="city"
            required
            v-model="form.city"
          />
        </div>
      </div>
      <div>
        <label for="email">Adresse mail</label>
        <div>
          <input
            id="email"
            type="email"
            name="email"
            value
            required
            v-model="form.email"
          />
        </div>
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <div>
          <input
            id="password"
            type="password"
            name="password"
            required
            v-model="form.password"
          />
        </div>
      </div>
      <div class="standartContainer column">
        <div v-if="error" class="connectionError">{{error}}</div>
        <div class="lastSignupInfo">
          Pensez à contacter l’association après inscription pour bénéficier du contenu réservée
        </div>
        <button type="submit" class="submit">S'inscrire</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase"
import { db } from '../../../config/db'

export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        address: "",
        cp: "",
        city: "",
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
      if(this.form.password.length >= 6) {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((user) => {
          db.ref('site/users/' + user.user.uid).set({
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            email: this.form.email,
            address : this.form.address,
            cp: this.form.cp,
            city: this.form.city,
            hasAccess: false
          }).then(() => {
            const user = firebase.auth().currentUser;
            user.sendEmailVerification().then(() => {
              this.$router.push({ name: 'espaceAdherent' }).catch(() => {})
            })
          })
        })
        .catch(() => {
          this.error = 'Une erreur est survenue. Veuillez réessayer et nous contacter en cas de soucis';
        });
      }
      else {
         this.error = 'Le mot de passe doit contenir au moins 6 lettres ou chiffres.'
      }
    }
  }
};
</script>

<style>
  .signupFormContainer {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .lastSignupInfo {
    margin-top:30px;
  }
</style>