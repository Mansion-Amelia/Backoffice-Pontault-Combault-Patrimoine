<template>
  <div class="connectionFormContainer">
    <div v-if="error" class="">{{error}}</div>
    <form action="#" @submit.prevent="submit">
      <div class="">
        <label for="email" class="">Adresse mail</label>
        <div class="">
          <input
            id="email"
            type="email"
            class="form-control"
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
            class="form-control"
            name="password"
            required
            v-model="form.password"
          />
        </div>
      </div>
      <div class="standartContainer">
        <button type="submit" class="submit">Se connecter</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
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
          this.$router.replace({ name: "BackofficeSelector" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style>
  .connectionFormContainer {
    display:flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  .connectionFormContainer label {
      font-weight: bold;
      margin:15px 0px;
  }

  .connectionFormContainer input {
    border:none;
    background-color: #F1F1F1;
    width:400px;
    height:45px;
  }

  .connectionFormContainer input, .connectionFormContainer .submit{
    border-radius: 10px;
  }

  .connectionFormContainer .submit {
    border:none;
    background-color: var(--darkbluePontault);
    color:white;
    padding: 10px 30px;
    font-weight: bold;
    margin-top: 30px;
  }

  .connectionFormContainer .submit:hover {
    transform: scale(0.95);
    cursor:pointer;
  }
</style>