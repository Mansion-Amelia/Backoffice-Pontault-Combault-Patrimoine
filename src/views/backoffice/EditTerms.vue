<template>
   <div class="CRHandlerContainer">
    <div @click="returnToSelection" class="backIcon" style="cursor: pointer;"><img src="../../img/back-blue.svg" /> Retour </div>
    <div class="addDocumentContainer">
      <h2>Edition des mentions légales</h2>
      <form class="column" action="#" @submit.prevent="submit">
        <div>
          <label for="content">Contenu</label>
          <div>
            <textarea
              id="content"
              type="text"
              name="content"
              required
              autofocus
              v-model="form.content"
            />
          </div>
        </div>
        <div class="standartContainer column">
          <button type="submit" class="submit">Modifier</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '../../config/db'
export default {
  props:['content'],
  data() {
    return {
      form: {
        content: this.content,
      }
    };
  },
  components: {
  },
  methods: {
    returnToSelection() {
      this.$router.push({ name: "BackofficeSite", params: { previousTab: 'handleContents' }})
    },
    submit(){
      db.ref('site/contents/terms').update({
        content: this.form.content,
      }).then(() => {
        this.$router.push({ name: "BackofficeSite", params: { previousTab: 'handleContents' }})
      })
    }
  },
  computed: {
  }
};
</script>

<style>

</style>