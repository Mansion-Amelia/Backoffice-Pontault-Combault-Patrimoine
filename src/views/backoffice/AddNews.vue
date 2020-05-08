<template>
  <div class="CRHandlerContainer">
    <div @click="returnToSelection" class="backIcon" style="cursor: pointer;"><img src="../../img/back-blue.svg" /> Retour </div>
    <div class="addDocumentContainer">
      <h2>Ajouter une actualité</h2>
      <form class="column" action="#" @submit.prevent="submit">
        <div>
          <label for="documentName">Titre de l'actualité *</label>
          <div>
            <input
              id="newsName"
              type="text"
              name="newsName"
              required
              autofocus
              v-model="form.newsName"
            />
          </div>
        </div>
        <div>
          <label for="content">Contenu *</label>
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
        <div>
          <label for="file">Selection pièce(s)-jointe(s) (.pdf)</label>
          <div>
            <input
              id="file"
              type="file"
              name="file"
              accept='application/pdf'
              @change="addFiles($event)"
              multiple
            />
          </div>
        </div>
        <div>
          <label for="file">Selection de la miniature (250 x 250) *</label>
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
        newsName: "",
        content: "",
        files: "",
        thumb: "",
      },
      files_url: [],
      files_name: [],
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
    addFiles(event) {
      this.form.files = [...event.target.files]
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
      if(this.form.files) {
        const uploads = this.form.files.map(file => {
          const path = '/site/' + this.type + '/' + file.name
          this.files_name.push(file.name)
          const uploadTask = storageRef.child(path).put(file, {contentType: file.type })
          
          uploadTask.on('state_changed', snapshot => {
            this.upload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          })

          return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.files_url.push(downloadURL)
          })
        })
        // wait for all uploadTasks to be done
        Promise.all(uploads).then(() => {
          const obj = {
            newsName: this.form.newsName,
            filesName: this.files_name,
            thumb: this.form.thumb,
            content: this.form.content,
            files: this.files_url,
            uploadDate: new Date().getTime()
          }
          db.ref('site/contents/' + this.type + '/' + this.form.newsName).set(obj).then(() => {
            this.$router.push({ name: "BackofficeSite", params: { previousTab: 'handleContents' }})
          })
        })
      }
      else {
        const obj = {
            newsName: this.form.newsName,
            thumb: this.form.thumb,
            content: this.form.content,
            uploadDate: new Date().getTime()
          }
          db.ref('site/contents/' + this.type + '/' + this.form.newsName).set(obj).then(() => {
            this.$router.push({ name: "BackofficeSite", params: { previousTab: 'handleContents' }})
          })
      }
    }
  }
};
</script>

<style>
</style>