<template>
    <div class="formChangeQuestionform-group">
        <div @click="setActivePageBackoffice('ListeBackoffice')" class="backIcon" style="cursor: pointer;"><img src="../../../img/back-blue.svg" /> Retour </div>
        <h1>Modifier d'une question</h1>
        <form id="changeQuestion" novalidate="true">

            <div class="alert alert-danger" v-if="errors.length">
                <b>Veuillez remplir les champs ci-dessous :</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </div>

            <div class="form-group">
                <label for="nameQuestion">Intitulé de la question</label>
                <input id="nameQuestion" v-model="nameQuestion" type="text" name="nameQuestion" class="form-control">
            </div>

             <div class="form-group">
                <label for="locations">Lieu</label>
                <select id="locationQuestion" v-model="locationQuestion" name="locationQuestion" class="form-control">
                    <option v-for="location in locations" v-bind:key="location" v-bind:value="location">
                        {{location}}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="goodAnswer">Bonne réponse</label>
                <input id="goodAnswer" v-model="goodAnswer" type="goodAnswer" name="goodAnswer" class="form-control">
            </div>

            <div class="form-group">
                <label for="wrongAnswer1">Fausse réponse</label>
                <input id="wrongAnswer1" v-model="wrongAnswer1" type="wrongAnswer1" name="wrongAnswer1" class="form-control">
            </div>

             <div class="form-group">
                <label for="wrongAnswer2">Fausse réponse</label>
                <input id="wrongAnswer2" v-model="wrongAnswer2" type="wrongAnswer2" name="wrongAnswer2" class="form-control">
            </div>

             <div class="form-group">
                <label for="wrongAnswer3">Fausse réponse</label>
                <input id="wrongAnswer3" v-model="wrongAnswer3" type="wrongAnswer3" name="wrongAnswer3" class="form-control">
            </div>

            <div class="form-group">
                <label for="justification">Justification</label>
                <RichEditorText :description="description"></RichEditorText>
            </div>

             <div class="form-group">
                <div @click="checkForm" class="form-group btn btn-primary ">Modifier la question</div>
            </div>
        </form>
    </div>
</template>

<script>
import { db,storageRef,storage, firebase } from '../../../config/db'
import RichEditorText from './RichEditorText'
import {mapActions, mapGetters} from 'vuex'


export default {
  components: {
    RichEditorText,
    
  },
    data() {
        return {
            documents: [],
            errors: [],
            question:[],
            nameQuestion: null,
            goodAnswer: null,
            wrongAnswer1: null,
            wrongAnswer2: null,
            wrongAnswer3: null,
            locations:[],
            locationQuestion:null,
            description:null
        }
    },
    mounted:function(){
      this.readLocation()
      this.question=this.getBackofficeQuestion
      this.nameQuestion=this.question.name
      this.goodAnswer=this.question.goodAnswer
      this.wrongAnswer1=this.question.wrongAnswer1
      this.wrongAnswer2=this.question.wrongAnswer2
      this.wrongAnswer3=this.question.wrongAnswer3
      this.locationQuestion=this.question.location
      this.description=this.question.description
    },
    computed:{
            ... mapGetters([
                'getBackofficeQuestion',
            ]),
        },
    methods:{
      ... mapActions([
                'setActivePageBackoffice',
        ]),
      processFile(event) {
        let self=this
        self.photos = event.target.files[0]
      },
      readLocation(){
        let self=this
        var query =  db.ref('app/locations/').orderByKey();
        query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                self.locations.push(childSnapshot.key);
            });
        });

        },
      checkForm(e){
        this.errors = [];

        if (!this.nameQuestion) {
            this.errors.push("Intitulé de la question obligatoire.");
        }
         if (!this.locationQuestion) {
            this.errors.push('Lieu lié à la question obligatoire.');
        } 
         if (!this.goodAnswer) {
            this.errors.push('Bonne réponse obligatoire.');
        } 
        if (!this.wrongAnswer1) {
            this.errors.push('Mauvaise réponse obligatoire.');
        } 
        if (!this.wrongAnswer2) {
            this.errors.push('Mauvaise réponse obligatoire.');
        } 
        if (!this.wrongAnswer3) {
            this.errors.push('Mauvaise réponse obligatoire.');
        }
        if (!this.description) {
            this.errors.push('Justification obligatoire.');
        } 
        if (!this.errors.length) {
            if(this.nameQuestion==this.question.name){
                const self = this
                var postData = {
                    name: self.nameQuestion,
                    location: self.locationQuestion,
                    goodAnswer: self.goodAnswer,
                    wrongAnswer1: self.wrongAnswer1,
                    wrongAnswer2: self.wrongAnswer2,
                    wrongAnswer3: self.wrongAnswer3,
                    description: self.description,
                };
                var updates = {};
                updates[self.nameQuestion] = postData;
                db.ref('app/questions').update(updates);
                self.setActivePageBackoffice('ListeBackoffice')
            }
            else{
                db.ref('app/questions/'+this.question.name).remove().then(() => {
                    const self = this
                    var postData = {
                        name: self.nameQuestion,
                        location: self.locationQuestion,
                        goodAnswer: self.goodAnswer,
                        wrongAnswer1: self.wrongAnswer1,
                        wrongAnswer2: self.wrongAnswer2,
                        wrongAnswer3: self.wrongAnswer3,
                        description: self.description,
                    };
                    var updates = {};
                    updates[self.nameQuestion] = postData;
                    db.ref('app/questions').update(updates);
                    self.setActivePageBackoffice('ListeBackoffice')

                })
            }
        }
    }
    }
}
</script>

<style>
    #uploader {
        width: 100%;
        height: 100%;
    }

    .btn-primary {
        background-color: #5b9bd5;
        border: none;
    }

    .btn-primary:hover, .btn-primary:active, .btn-primary:focus {
        background-color: #42719a;
        border: none;
    }

progress[value] {
    /* Reset the default appearance */
    -webkit-appearance: none;
    appearance: none;
    width: 250px;
    height: 20px;
}

    progress[value]::-webkit-progress-bar {
        background-color: #eee;
    }

    progress[value]::-webkit-progress-value {
        background-color: #5b9bd5;
    }

    .alert-blue {
        font-size: 0.7em;
        padding: 0.5em;
        margin: 0.5em 0;
        color: var(--bluePC);
        background-color: #e7f4ff;
        border-color: var(--bluePC);
    }

    .alert-blue a {
        font-weight: bold;
        color: var(--bluePC);
        text-decoration: underline;
    }
</style>