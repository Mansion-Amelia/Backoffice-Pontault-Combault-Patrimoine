<template>
    <div class="formAddLocation form-group">
        <div @click="setActivePageBackoffice('ListeBackoffice')" class="backIcon" style="cursor: pointer;"><img src="../../../img/back-blue.svg" /> Retour </div>
        <h1>Ajout d'un lieu</h1>
        <form id="addLocation" novalidate="true">

            <div class="alert alert-danger" v-if="errors.length">
                <b>Veuillez remplir les champs ci-dessous :</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </div>

            <div class="form-group">
                <label for="nameLocation">Nom du lieu</label>
                <input id="nameLocation" v-model="nameLocation" type="text" name="nameLocation" class="form-control">
            </div>

            <div class="form-group">
                <label for="addressLocation">Adresse du lieu</label>
                <input id="addressLocation" v-model="addressLocation" type="addressLocation" name="addressLocation" class="form-control">
            </div>

            <div class="form-group">
                <label for="categories">Catégorie du lieu</label>
                <select id="categoryLocation" v-model="categoryLocation" name="categoryLocation" class="form-control">
                    <option v-for="category in categories" v-bind:key="category" v-bind:value="category">
                        {{category}}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <RichEditorText :description="description"></RichEditorText>
            </div>


            <div class="form-group row">
                <div class="col">
                    <label for="latitudeLocation">Latitude</label>
                    <div class="alert alert-blue" role="alert">Veillez à respecter ce format : 48.8006127</div>
                    <input type="text" v-model="latitudeLocation" id="latitudeLocation" name="latitudeLocation" class="form-control">
                </div>
                <div class="col">
                    <label for="longitudeLocation">Longitude</label>
                    <div class="alert alert-blue" role="alert">Veillez à respecter ce format : 2.6054929</div>
                    <input type="text" v-model="longitudeLocation" id="longitudeLocation" name="longitudeLocation" class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label for="photos">Photo</label>
                <div class="alert alert-blue" role="alert">Veillez à ce que la taille des photos soit adaptée au web pour qu'elles se chargent rapidement lors de la consultation de l'application. Vous pouvez utiliser des sites comme <a href="https://www.iloveimg.com/fr/compresser-image">iloveimg.com</a> qui permettent d'optimiser les images pour le web.</div>
                <input type="file" id="photos" name="photos" accept="image/png, image/jpeg" @change="processFile($event)">
                <div id="preview">
                    <img id="imgp"  src="" />
                </div>
            </div>

            <div @click="checkForm" class="btn btn-primary form-group">Ajouter le lieu</div>
            <div class="progress">
                <progress id="uploader" value="0" max="100">0%</progress>
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
          nameLocation: null,
          addressLocation: null,
          categoryLocation: null,
          description: null,
          photos:{},
          categories: [],
          url: null,
          latitudeLocation: null,
          longitudeLocation: null,
          maxID:0
        }
    },
    mounted:function(){
      this.readCategory()
      this.readID()
    },
    methods:{
      ... mapActions([
                'setActivePageBackoffice',
        ]),
        processFile(event) {
            var files   = event.target.files[0];
            if (files) {
                if ( /\.(jpe?g|png|gif)$/i.test(files.name) && files.size < 1024 * 1024 ) {
                    var reader = new FileReader();
                    var image = document.getElementById('imgp');
                    var preview = document.getElementById('preview');
                    let self= this;
                    var promise = new Promise(function(resolve, reject) {
                        reader.addEventListener("load", function(){
                            var test = new Image();
                            test.src = this.result;
                            test.onload = function () {
                                var height = this.height;
                                var width = this.width;
                                if (height > 1080 || width > 1920) {
                                    alert("La taille de l'image ne doit pas éxcéder 1920px x 1080px");
                                }
                                else{
                                    image.setAttribute("src", test.src);
                                    resolve(test.src);
                                }

                            };
                            
                        }, true);
                        reader.readAsDataURL(files);
                    });
                    promise.then(function(event) {
                        self.photos=event;
                    })  
                }
                else{
                     alert("Mauvais format ou la taille du fichier est supérieur à 1 MB")
                 }
            }
            
        }, 
        readCategory(){
            let self=this
            var query =  db.ref('app/categories/').orderByKey();
            query.once("value").then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    self.categories.push(childSnapshot.val());
                });
            });
        },
        readID(){
            let self=this
            var query =  db.ref('app/locations/').orderByKey();
            query.once("value").then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    childSnapshot.forEach(function(child) {
                        if(child.key=="id" && child.val()>self.maxID){
                            self.maxID=child.val()+1
                        }
                    });
                });
            });

        },
        checkForm(e){
            this.errors = [];
            if (!this.nameLocation) {
                this.errors.push("Nom du lieu obligatoire.");
            }
            if (!this.description) {
                this.errors.push('Description obligatoire.');
            } 
            if (!this.categoryLocation) {
                this.errors.push('Catégorie obligatoire.');
            } 
            if (!this.addressLocation) {
                this.errors.push('Adresse obligatoire.');
            } 
            if (!this.photos) {
                this.errors.push('Photo obligatoire.');
            } 
            if (!this.latitudeLocation) {
                this.errors.push('Latitude obligatoire.');
            } 

            if (!this.longitudeLocation) {
                this.errors.push('Longitude obligatoire.');
            } 
            if (!this.errors.length) {
                const self = this
                let date=new Date().toLocaleString()
                var postData = {
                    name: self.nameLocation,
                    category: self.categoryLocation,
                    address: self.addressLocation,
                    description: self.description,
                    gps:{
                        0: self.latitudeLocation, 
                        1: self.longitudeLocation
                    },
                    photos:self.photos,
                    lastUpdates:date,
                    id:self.maxID
                };
                var updates = {};
                updates[self.nameLocation] = postData;
                db.ref('app/locations').update(updates);
                var data={
                    locations : date
                }
                db.ref('app/lastUpdates').update(data);
                self.setActivePageBackoffice('ListeBackoffice')
            }
            e.preventDefault();
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