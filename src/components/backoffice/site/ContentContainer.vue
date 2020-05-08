<template>
  <div class="contentContainer">
    <div v-if=" type === 'home'" class="link" @click="navigateTo('EditContent')">{{content.name}}</div>
    <div v-if=" type === 'reviews' && deleted === false" class="reviewEditorContainer">
      <div class="documentInfos">
        <div class="link" @click="download">{{content.fileName}}</div>
        <div>{{uploadDate}}</div>
      </div>
      <div class="delete">
        <img @click="deleteReview" src="../../../img/site/delete.png" alt="delete"> 
      </div>
    </div>
    <div v-if=" type === 'news' && deleted === false" class="reviewEditorContainer">
      <div class="documentInfos">
        <div class="link" @click="navigateTo('EditNews')">{{content.newsName}}</div>
        <div>{{uploadDate}}</div>
      </div>
      <div class="delete">
        <img @click="deleteNews" src="../../../img/site/delete.png" alt="delete"> 
      </div>
    </div>
    <div v-if=" type === 'terms'" class="link" @click="navigateTo('EditTerms')">Mentions légales</div>
  </div>
</template>

<script>
import { db, storageRef } from '../../../config/db'
export default {
  props:['content', 'type', 'subtype'],
  data() {
    return {
      deleted: false,
    };
  },
  components: {
  },
  methods: {
    navigateTo(destination) {
      this.$router.push({ name: destination, params: { content: this.content, type: this.type, subtype: this.subtype} })
    },
    download() {
      window.open(this.content.file, '_blank');
    },
    deleteReview() {
      db.ref('site/contents/' + this.type + '/' + this.subtype).remove()
      .then(() => {
        var desertRef = storageRef.child('/site/' + this.type + '/' + this.content.fileName);
        desertRef.delete().then(() => {
           this.deleted = true
        })
       
      })
    },
    deleteNews() {
      db.ref('site/contents/' + this.type + '/' + this.content.newsName).remove()
      .then(() => {
        if(this.content.filesName){
          this.content.filesName.map((fileName) => {
            var desertRef = storageRef.child('/site/' + this.type + '/' + fileName);
            desertRef.delete().then(() => {
              this.deleted = true
            })
          })
        }
        else {
          this.deleted = true
        }
      })
    }
  },
  computed: {
    uploadDate() {
      const date = new Date(this.content.uploadDate)
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const currentMonth = date.getMonth() + 1
      const month =  currentMonth < 10 ? '0' + currentMonth : currentMonth
      return day + '/' + month + '/' + date.getFullYear()
    }
  }
};
</script>

<style>
.reviewEditorContainer {
  display:flex;
}
.reviewEditorContainer .delete {
 width:10%;
}
</style>