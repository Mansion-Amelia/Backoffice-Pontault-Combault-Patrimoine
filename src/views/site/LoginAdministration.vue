<template>
  <div class="loginAdministrationContainer">
    <Header title="Administration"></Header>
    <ConnectionForm destination="BackofficeSelector"></ConnectionForm>
  </div>
</template>

<script>
import Header from "../../components/site/commons/Header"
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
    ConnectionForm
  },
  methods: {
  }
};
</script>

<style>
</style>