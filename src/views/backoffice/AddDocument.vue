<template>
  <div class="CRHandlerContainer">
    <div @click="returnToSelection" class="backIcon" style="cursor: pointer;"><img src="../../img/back-blue.svg" /> Retour </div>
    <div class="addDocumentContainer">
      <h2>Ajouter un {{ title }}</h2>
      <form class="column" action="#" @submit.prevent="submit">
        <div>
          <label for="documentName">Nom du document</label>
          <div>
            <input
              id="documentName"
              type="text"
              name="documentName"
              required
              autofocus
              v-model="form.documentName"
            />
          </div>
        </div>
        <div>
        <label for="file">Selection du fichier</label>
          <div>
            <input
              id="file"
              type="file"
              name="file"
              required
              autofocus
              @change="addFile($event)"
            />
          </div>
        </div>
        <div class="standartContainer column">
          <div v-if="error" class="connectionError">{{ error }}</div>
          <div v-if="upload">Upload en cours : {{ upload }} %</div>
          <button type="submit" class="submit">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db, storageRef } from '../../config/db'
export default {
  props: ['title', 'type'],
  data() {
     return {
      form: {
        documentName: "",
        file: "",
      },
      error: null,
      upload: null,
    };
  },
  components: {
  },
  methods: {
    returnToSelection() {
      this.$router.push({ name: "BackofficeSite", params: { previousTab: 'handleDocuments' }})
    },
    addFile(event) {
      this.form.file = event.target.files[0]
    },
    submit(){ 
      const path = '/site/adherents/' + this.type + '/' +this.form.file.name

      let uploadTask = storageRef.child(path).put(this.form.file, {contentType: this.form.file.type })
      
      uploadTask.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.upload = progress
      }, () => {}, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.ref('site/documents/' + this.type + '/' + this.form.documentName).set({
            fileName: this.form.file.name,
            file: downloadURL,
            uploadDate: new Date().getTime()
          }).then(() => {
            this.$router.push({ name: "BackofficeSite", params: { previousTab: 'handleDocuments' }})
          })
        })
      })
    }
  }
};
</script>

<style>
  .addDocumentContainer {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>