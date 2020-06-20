<template>
  <div class="CRHandlerContainer">
    <div @click="returnToSelection" class="backIcon" style="cursor: pointer;"><img src="../../img/back-blue.svg" /> Retour </div>
    <div class="addDocumentContainer">
      <h2>Ajouter une revue</h2>
      <form class="column" action="#" @submit.prevent="submit">
        <div>
          <label for="documentName">Nom de la revue *</label>
          <div>
            <input
              id="reviewName"
              type="text"
              name="reviewName"
              required
              autofocus
              v-model="form.reviewName"
            />
          </div>
        </div>
        <div>
          <label for="file">Selection du fichier (.pdf) *</label>
          <div>
            <input
              id="file"
              type="file"
              name="file"
              required
              accept='application/pdf'
              @change="addFile($event)"
            />
          </div>
        </div>
        <div>
          <label for="file">Selection de la miniature (300 x 300) *</label>
          <div>
            <input
              id="thumb"
              type="file"
              name="thumb"
              required
              accept='image/*'
              @change="addThumb($event)"
            />
          </div>
          <img v-if="form.thumb" :src="'data:image/jpeg;base64,'+form.thumb" />
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
        reviewName: "",
        file: "",
        thumb: "",
      },
      error: null,
      upload: null,
      encodedThumb: null
    };
  },
  components: {
  },
  methods: {
    returnToSelection() {
      this.$router.push({ name: "BackofficeSite", params: { previousTab: 'handleContents' }})
    },
    addFile(event) {
      this.form.file = event.target.files[0]
    },
    addThumb(event) {
      this.encodeImageFileAsURL(event.target.files[0])
    },
    encodeImageFileAsURL(imgFile) {
      var reader = new FileReader();
      reader.readAsBinaryString(imgFile);
      reader.onload = () => {
        this.form.thumb = btoa(reader.result)
      };
    },
    submit(){
      const path = '/site/' + this.type + '/' + this.form.file.name
      let uploadTask = storageRef.child(path).put(this.form.file, {contentType: this.form.file.type })
      
      uploadTask.on('state_changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.upload = progress
      }, () => {}, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          db.ref('site/contents/' + this.type + '/' + this.form.reviewName).set({
            fileName: this.form.file.name,
            thumb: this.form.thumb,
            file: downloadURL,
            uploadDate: new Date().getTime()
          }).then(() => {
            this.$router.push({ name: "BackofficeSite", params: { previousTab: 'handleContents' }})
          })
        })
      })
    }
  }
};
</script>

<style>
</style>