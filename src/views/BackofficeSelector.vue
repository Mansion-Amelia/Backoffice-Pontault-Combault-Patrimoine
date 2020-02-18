<template>
  <div class="standartContainer BOSelector">
    <NavBar></NavBar>
    <h3>Que souhaitez-vous faire ?</h3>
    <div class="optionsSelector">
      <div @click="selectOption('app')" class="option">
        Gérer l'application mobile
      </div>
      <div @click="selectOption('web')" class="option">
        Gérer le site internet
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/backoffice/commons/navBar'
export default {
  data() {
    return {
    };
  },
  components: {
    NavBar
  },
  methods: {
    selectOption(selectedOption){
      if(selectedOption === 'app') {
        this.$router.replace({ name: "BackofficeApp" })
      }
    }
  }
};
</script>

<style>
  .BOSelector {
    flex-direction: column;
    justify-content: flex-start
  }
  .optionsSelector {
    display:flex;
    width:100%;
    justify-content: space-around;
  }
  .option {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--darkbluePontault);
    width:40%;
    max-width: 600px;
    height:290px;
    color: white;
    font-weight: bold;
    font-size: 25px;
    padding:10px;
  }

  .option:hover {
    transform:scale(0.95)
  }
</style>