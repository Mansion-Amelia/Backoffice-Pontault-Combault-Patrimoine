<template>
  <div class="CRHandlerContainer">
    <div @click="returnToSelection" class="backIcon" style="cursor: pointer;"><img src="../../img/back-blue.svg" /> Retour </div>
    <div class="addDocumentContainer">
      <h2>Edition du lien {{content.fileName}}</h2>
      <form class="column" action="#" @submit.prevent="submit">
        <div v-if="content.type !== 'adhesionWeb'">
          <label for="file">Selection du fichier</label>
          <div>
            <input
              id="file"
              type="file"
              name="file"
              accept='application/pdf'
              @change="addFile($event)"
            />
          </div>
        </div>
        <div v-if="content.type === 'adhesionWeb'">
          <label for="file">Lien de l'adhésion web</label>
          <div>
             <input
              id="file"
              type="text"
              name="file"
              v-model="form.file"
            />
          </div>
        </div>
        <div class="standartContainer column">
          <div v-if="error" class="connectionError">{{ error }}</div>
          <div v-if="upload">Upload en cours : {{ upload }} %</div>
          <button type="submit" class="submit">Modifier</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { db, storageRef } from '../../config/db'
export default {
  props:['content', 'type', 'subtype'],
  data() {
     return {
      form: {
        fileName: this.content.fileName,
        file: this.content.type === 'adhesionWeb' ? this.content.file : null,
        type: this.content.type,
      },
      previousFile: this.content.file,
      error: null,
      upload: null,
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
    submit(){
      if(this.form.file && this.content.type !== 'adhesionWeb') {
        const path = '/site/' + this.type + '/' + this.form.type
        let uploadTask = storageRef.child(path).put(this.form.file, {contentType: this.form.file.type })
        
        uploadTask.on('state_changed', (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.upload = progress
        }, () => {}, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            db.ref('site/contents/' + this.type + '/' + this.form.type).set({
              fileName: this.form.fileName,
              file: downloadURL,
              type: this.form.type
            }).then(() => {
              this.$router.push({ name: "BackofficeSite", params: { previousTab: 'handleContents' }})
            })
          })
          /*
          .then(()=> {
              db.ref('site/contents/' + this.type + '/' + this.form.type).remove()
            }).
          */
        })
      }
      else {
        console.log(this.form.file)
        db.ref('site/contents/' + this.type + '/' + this.form.type).set({
            fileName: this.form.fileName,
            file: this.form.file,
            type: this.form.type
          }).then(() => {
            this.$router.push({ name: "BackofficeSite", params: { previousTab: 'handleContents' }})
          })
      }
    }
  }
};
</script>

<style>
.previewPJ {
  display:flex;
}
.previewPJ img {
  margin: 0px 10px;
}
</style>