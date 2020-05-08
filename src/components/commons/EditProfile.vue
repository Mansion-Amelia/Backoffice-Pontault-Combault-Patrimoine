<template>
  <div class="updateProfileContainer">
    <Header v-if="from !== 'BackOfficeSelector'" title="Editer mon profil"></Header>
    <NavBar :from="from" mode="editProfile"></NavBar>
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
        <label for="currentPassword">Mot de passe actuel</label>
        <div>
          <input
            id="currentPassword"
            type="password"
            name="currentPassword"
            required
            v-model="form.currentPassword"
          />
        </div>
      </div>
      <div @click="() => { isPasswordEditorOpen = !isPasswordEditorOpen }" class="link passwordEditor">Modifier votre mot de passe</div>
      <div v-if="isPasswordEditorOpen" class="changePasswordContainer">
        <div>
          <label for="newPassword">Nouveau mot de passe</label>
          <div>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              v-model="form.newPassword"
            />
          </div>
        </div>
        <div>
          <label for="confirmPassword">Confirmation du mot de passe</label>
          <div>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              v-model="form.confirmPassword"
            />
          </div>
        </div>
      </div>
      <div class="standartContainer column">
        <div v-if="error" class="connectionError">{{error}}</div>
        <button type="submit" class="submit">Modifier</button>
      </div>
    </form>
    <Footer v-if="from !== 'BackOfficeSelector'"></Footer>
  </div>
</template>

<script>
import firebase from "firebase"
import userStore from "../../store/userStore";
import { db } from '../../config/db'
import NavBar from './NavBar'
import Header from '../site/commons/Header'
import Footer from '../site/commons/Footer'

export default {
  props:['from'],
  data() {
    return {
      isPasswordEditorOpen: false,
      form: {
        firstName: "",
        lastName: "",
        address: "",
        cp: "",
        city: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      error: null
    };
  },
  components: {
    Header,
    NavBar,
    Footer
  },
  methods: {
    submit() {
      const newDatas = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        address : this.form.address,
        cp: this.form.cp,
        city: this.form.city,
      }

      if(this.form.newPassword) {
        if(this.form.newPassword !== this.form.confirmPassword) {
          this.error = 'Les mots de passe ne sont pas identiques.'
        }
        else if(this.form.newPassword.length < 6){
          this.error = 'Le nouveau mot de passe doit contenir au moins 6 lettres ou chiffres.'
        }
        else {
          this.changeInfos(newDatas)
        }
      }
      else {
        this.changeInfos(newDatas)
      }
    },
    changeInfos(newDatas) {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email, 
        this.form.currentPassword
      );

      user.reauthenticateWithCredential(credential)
      .then(() => {
        user.updateEmail(this.form.email)
        .then(() => {
          if(this.form.newPassword) {
            user.updatePassword(this.form.newPassword)
          }
        }).then(() => {
          db.ref('site/users/' + user.uid).update(newDatas).then(() => {
            db.ref('site/users/' + user.uid).once('value').then((snapshot) => {
              userStore.dispatch("fetchUser", snapshot.val());
              this.$router.push({ name: this.from ? this.from : 'espaceAdherent' }).catch(() => {})
            });
          })
        })          
      })
      .catch((error) => {
        if(error === 'Error: Too many unsuccessful login attempts. Please try again later.')
          this.error = 'Trop de tentatives. Veuillez réessayer plus tard.';
        else
          this.error = 'Mot de passe actuel incorrect.'
      })
    },
  },
  created() {
    const user = userStore.getters.user
    this.form = { 
      ...user.datas, 
      currentPassword: "", 
      newPassword: "", 
      confirmPassword: ""
    }
  }
};
</script>

<style>
  .passwordEditor {
    margin-top:20px;
  }
</style>