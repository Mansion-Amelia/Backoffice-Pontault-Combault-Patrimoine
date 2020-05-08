<template>
  <tr v-if="!deleted" class="adherentContainer">
    <td class="name">
      <span @click="updateDetails" class="link">{{ adherent.lastName + ' ' + adherent.firstName }}</span>
      <div v-show="openDetails" class="adherentDetails">
        <div class="email">
          <div class="detailTitle">Email :</div>
          <div class="detailContent">
            {{adherent.email}}
          </div>
        </div>
        <div class="address">
          <div class="detailTitle">Adresse :</div>
          <div class="detailContent">
            {{adherent.address}}<br>
            {{adherent.cp}}<br>
            {{adherent.city}}
          </div>
        </div>
      </div>
    </td>
    <td class="hasAccess">
      <input type="checkbox" @change="updateAdherentAccess" v-model="hasAccess"> 
    </td>
    <td class="delete">
      <img @click="updatePopup" src="../../../img/site/delete.png" alt="delete"> 
    </td>
    <div v-if="isPopupOpen" class="deletePopupContainer">
      <div  class="deletePopUp">
        <div class="question">
          Etes vous-sûr de vouloir supprimer {{ adherent.firstName + ' ' + adherent.lastName }} ?
        </div>
        <div class="popUpOption">
          <div @click="deleteAdherent" class="validate link">Oui</div>
          <div @click="updatePopup" class="cancel link">Annuler</div>
        </div>
      </div>
    </div>
  </tr>
</template>

<script>
import { db } from '../../../config/db'
export default {
  props:['adherent', 'adherentId'],
  data() {
    return {
      openDetails: false,
      isPopupOpen: false,
      deleted: false,
      hasAccess: this.adherent.hasAccess
    };
  },
  components: {
  },
  methods: {
    updateDetails() {
      this.openDetails = !this.openDetails
    },
    updatePopup() {
      this.isPopupOpen = !this.isPopupOpen
    },
    deleteAdherent() {
      db.ref('site/users/' + this.adherentId).remove()
      .then(() => {
        this.deleted = true
        this.updatePopup()
      })
    },
    updateAdherentAccess() {
      db.ref('site/users/' + this.adherentId).update({hasAccess: this.hasAccess})
    }
  }
};
</script>

<style>
  .name {
    font-size:16px;
    text-align: center;
  }
  .detailTitle {
    font-weight: bold;
  }
  .detailContent, .detailTitle {
     font-size:14px;
  }
  .hasAccess {
    text-align: center;
  }
  .delete img {
    height:15px;
  }
  .delete {
    text-align: center;
  }
  .delete img:hover {
    transform: scale(1.20);
  }
  .deletePopupContainer {
    width: 100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background:rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .deletePopUp {
    width:80%;
    max-width: 400px;
    height: 200px;
    background: var(--darkbluePontault);
    color:white;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .question {
    width: 80%;
    text-align: center;
  }
  .popUpOption {
    display: flex;
    justify-content: center;
  }
  .popUpOption div {
    margin:20px 40px;
    margin-bottom:0px;
    padding: 5px 20px;
    color:white;
    border-radius:10px;
  }
  .popUpOption .validate {
    background-color:#e21b1b
  }
  .popUpOption .cancel {
    background-color: var(--bluePontault)
  }
</style>