<template>
   <div class="CRHandlerContainer">
    <div @click="returnToSelection" class="backIcon" style="cursor: pointer;"><img src="../../img/back-blue.svg" /> Retour </div>
    <div class="addDocumentContainer">
      <h2>Edition {{content.name}}</h2>
      <form class="column" action="#" @submit.prevent="submit">
        <div>
          <label for="title">Titre</label>
          <div>
            <input
              id="title"
              type="text"
              name="title"
              required
              autofocus
              v-model="form.title"
            />
          </div>
        </div>
        <div>
          <label for="subtitle">Sous-titre</label>
          <div>
            <input
              id="subtitle"
              type="text"
              name="subtitle"
              required
              v-model="form.subtitle"
            />
          </div>
        </div>
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
        <div v-if="form.video">
          <label for="video">Url de la vidéo</label>
          <div>
            <input
              id="video"
              type="text"
              name="video"
              required
              v-model="form.video"
            />
          </div>
          <div class="urlInfos">
            <span class="bold">La vidéo doit provenir de youtube et avoir la forme suivante :</span><br>
            https://www.youtube.com/embed/xXxXxXX <br>
            Où les x représentent la suite après le v= sur un lien youtube
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
  props:['content', 'type', 'subtype'],
  data() {
    return {
      form: {
        title: this.content.title,
        subtitle: this.content.subtitle,
        content: this.content.content,
        video: this.content.video ? this.content.video : null
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
      db.ref('site/contents/' + this.type + '/' + this.subtype).update({
        title: this.form.title,
        subtitle: this.form.subtitle,
        content: this.form.content,
        video: this.form.video
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
.urlInfos {
  text-align: center;
  font-size:12px;
  margin-top: 10px;
  color: #b60000;
}
</style>