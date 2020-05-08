<template>
  <div class="adherentDocumentSectionContainer">
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="document in documents" :key="document.fileName">
          <td class="fileName">
            ● <a class="link" :href="document.file">{{ document.fileName }}</a>
          </td>
          <td class="date">
            {{ uploadDate(document.uploadDate) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props:['documents'],
  data() {
    return {

    };
  },
  components: {
  },
  methods: {
    uploadDate(dateToParse) {
      const date = new Date(dateToParse)
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const currentMonth = date.getMonth() + 1
      const month =  currentMonth < 10 ? '0' + currentMonth : currentMonth
      return day + '/' + month + '/' + date.getFullYear()
    }
  },

};
</script>

<style>
  .adherentDocumentSectionContainer {
    width: 100%;
    display:flex;
    justify-content: center;
    margin-top: 20px;
  }

  .adherentDocumentSectionContainer table, .adherentDocumentSectionContainer tr  {
    width:100%;
  }
  
  .adherentDocumentSectionContainer th {
    text-align: center;
    width:50%;
  }
  .adherentDocumentSectionContainer {
    text-align: center;
  }
</style>