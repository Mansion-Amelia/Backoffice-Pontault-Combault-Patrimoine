<template>
  <div v-if="!deleted" class="documentContainer">
    <div class="documentInfos">
      <div class="link" @click="download">{{ document.fileName }}</div>
      <div>{{uploadDate}}</div>
    </div>
    <div class="delete">
      <img @click="deleteDocument" src="../../../img/site/delete.png" alt="delete"> 
    </div>
  </div>
</template>

<script>
import { db, storageRef } from '../../../config/db'
export default {
  props:['document', 'documentName', 'type'],
  data() {
    return {
      deleted: false,
    };
  },
  components: {
  },
  methods: {
    download() {
      window.open(this.document.file, '_blank');
    },
    deleteDocument() {
      db.ref('site/documents/' + this.type + '/' + this.documentName).remove()
      .then(() => {
        var desertRef = storageRef.child('site/adherents/' + this.type + '/' + this.document.fileName);
        desertRef.delete().then(() => {
           this.deleted = true
        })
       
      })
    },
  },
  computed: {
    uploadDate() {
      const date = new Date(this.document.uploadDate)
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const currentMonth = date.getMonth() + 1
      const month =  currentMonth < 10 ? '0' + currentMonth : currentMonth
      return day + '/' + month + '/' + date.getFullYear()
    }
  }
};
</script>

<style>
.documentContainer {
  display:flex;
  padding: 5px;
}
.documentInfos {
  width: 90%;
  display:flex;
  justify-content: space-between;
}
.documentContainer .delete {
 width:10%;
}
</style>