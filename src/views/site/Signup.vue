<template>
  <div class="signupAdherentContainer">
    <Header title="Inscription"></Header>
    <SignupForm></SignupForm>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../../components/site/commons/Header"
import Footer from "../../components/site/commons/Footer"
import SignupForm from "../../components/site/commons/SignupForm"

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
    Header,
    Footer,
    SignupForm
  },
  methods: {
  }
};
</script>

<style>
  .loginAdherentInfos {
    width:80%;
    text-align: center;
    font-weight: bold;
    margin-bottom:20px;
  }
</style>