<template>
  <div class="loginAdherentContainer">
    <Header title="Espace adhérent"></Header>
    <div class="standartContainer">
      <div class="loginAdherentInfos">
        Cet espace est réservé à nos adhérents. Pour plus d’informations, veuillez nous contacter ou faire une demande d’accès.
      </div>
    </div>
    <ConnectionForm destination="espaceAdherent"></ConnectionForm>   
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../../components/site/commons/Header"
import Footer from "../../components/site/commons/Footer"
import ConnectionForm from "../../components/site/commons/ConnectionForm"

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
    ConnectionForm
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