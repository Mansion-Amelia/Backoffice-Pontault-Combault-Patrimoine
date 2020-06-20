<template>
  <div @click="openReview" class="reviewContainer link">
    <div class="reviewInfos">
      <!--<div class="reviewNumber">
        {{reviewNumber}}
      </div>
      <div class="reviewTitle">
        Le saviez-vous ?
      </div>-->
      <div class="reviewSubtitle">
       {{reviewName}}
      </div>
    </div>
    <div class="reviewThumb">
       <img :src="'data:image/jpeg;base64,'+review.thumb" alt="reviewThumb"/>
    </div>
  </div>
</template>

<script>
export default {
  props:['review', 'reviewName', 'reviewNumber'],
  data() {
    return {
      reviews: {}
    }
  },
  components: {
  },
  methods: {
    openReview() {
      window.open(this.review.file, '_blank');
    }
  },
};

</script>

<style>
  .reviewContainer {
      margin-bottom: 50px;
      margin-left: 50px;
      margin-right: 50px;
  }
  .reviewInfos{
    height: 100px;
    width: 300px;;
    background-color: var(--darkbluePontault);
    position:relative;
    color:white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .reviewNumber {
    position: absolute;
    top: 10px;
    left: 10px;
    color: var(--darkbluePontault);
    background-color:white;
    width: 30px;
    height: 30px;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
  }
  .reviewTitle, .reviewSubtitle {
    margin: 0px 30px;
  } 
  .reviewSubtitle {
    font-weight: normal;
  }
  .reviewThumb img {
    height: 300px;
    width: 300px;
  }

</style>