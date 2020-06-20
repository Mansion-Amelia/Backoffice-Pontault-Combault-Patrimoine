<template>
  <div class="newsGlobalContainer">
    <div class="newsContainer">
      <div class="newsThumb">
        <img :src="'data:image/jpeg;base64,'+news.thumb" alt="newsThumb"/>
      </div>
      <div class="newsDetails">
        <div class="newsTitle">{{news.newsName}}</div>
        <div class="newsDate">
          {{uploadDate}}
        </div>
        <div class="newsContent">{{news.content}}</div>
        <div class="newsLinks">
          <div class="newsLink" v-for="(file, index) in news.files"
            :key="file"
          >
            <img src="../../../img/site/link.png" alt="linkIcon">        
            <div class="link" @click="download(file)">{{ news.filesName[index] }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isLast" class="separation"></div>
  </div>
</template>

<script>
export default {
  props:['news', 'isLast'],
  data() {
    return {

    }
  },
  components: {
  },
  methods: {
    download(url) {
      window.open(url, '_blank');
    },
  },
  computed: {
    uploadDate() {
      const date = new Date(this.news.uploadDate)
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const monthsArray = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
      return day + ' ' + monthsArray[date.getMonth()] + ' ' + date.getFullYear()
    }
  }
};

</script>

<style>
.newsGlobalContainer {
  width:80%;
  display:flex;
  flex-direction: column;
  align-items: center;
}

.newsContainer {
  display:flex;
  width:100%
}
.newsDate {
  margin-bottom: 15px;
  font-size:13px;
}
.newsThumb {
  margin: 0px 30px;
}
.newsThumb img {
  height:250px;
  width:250px;
}
.newsDetails {
}

.newsTitle {
  font-weight: bold;
  color: var(--bluePontault);
  
}
.newsContent {
  margin-bottom: 25px;
  text-align: justify;  /* For Edge */
  text-align-last: left;
}

.newsLink {
  display:flex;
  align-items: center;
}
.newsLink img {
  margin-right:10px;
  width:15px;
}
.separation {
  height:1px;
  background-color: #C9C9C9;
  width:60%;
  margin: 40px 0px;
}
</style>