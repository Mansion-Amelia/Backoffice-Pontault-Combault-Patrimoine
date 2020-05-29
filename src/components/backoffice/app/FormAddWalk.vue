<template>
    <div class="formAddLocation">
        <div @click="setActivePageBackoffice('ListeBackoffice')" class="backIcon" style="cursor: pointer;"><img src="../../../img/back-blue.svg" /> Retour </div>
        <h1>Ajout d'une balade</h1>
        <form id="AddWalkLocation" @submit="checkFormAddWalk" novalidate="true">
            <p class="alert alert-danger" v-if="errors.length">
                <b>Veuillez remplir les champs si dessous :</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </p>
            <div class="form-group">
                <label for="locations">Lieux à ajouter</label>
                <div class="alert alert-blue" role="alert">Ajoutez un par un les lieux figurant sur le parcours. Les lieux apparaîtront dans l'ordre dans lequel vous les avez ajoutés.</div>
                <select v-if="locations.length" multiple id="choiceLocationAddWalk" v-model="choiceLocationAddWalk" name="choiceLocationAddWalk" class="form-control">
                    <option v-for="location in locations" v-bind:key="location">
                        {{location}}
                    </option>
                </select>
            </div>
            <div @click="checkFormAddWalk" class="form-group btn btn-primary ">Ajouter le lieu à la balade</div>
        </form>

        <form id="addWalk" @submit="checkForm" novalidate="true">
            <div>
                <div> Lieux ajoutés :</div>
                <ul >
                    <li v-for="location in (locationsWalk)" v-bind:value="location" v-bind:key="location" class="lieuAjoute">
                        {{ location }}  <span class="delete" @click="removechoice(location)"><img src="../../../img/garbage-blue.svg" /></span>
                    </li>
                </ul>
            </div>

            <div class="form-group">
                <label for="nameWalk">Nom de la balade</label>
                <input id="nameWalk" v-model="nameWalk" type="text" name="nameWalk" class="form-control">
            </div>
            <div class="form-group">
                <label for="duration">Durée de la balade</label>
                <div class="alert alert-blue" role="alert">Veuillez respecter le format suivant : 2h30</div>
                <input id="duration" v-model="duration" type="text" name="duration" class="form-control">
            </div>
            <div class="form-group">
                <label for="distance">Distance de la balade</label>
                <div class="alert alert-blue" role="alert">Veuillez respecter le format suivant : 1km</div>
                <input id="distance" v-model="distance" type="text" name="distance" class="form-control">
            </div>
            <div class="form-group">
                <label for="photos">Photo principale</label>
                <div class="alert alert-blue" role="alert">Veillez à ce que la taille des photos soit adaptée au web pour qu'elles se chargent rapidement lors de la consultation de l'application. La photo doit avoir au maximum une résolution de 1920px * 1080px et ne doit pas excéder 1MB. Vous pouvez utiliser des sites comme <a href="https://www.iloveimg.com/fr/compresser-image">iloveimg.com</a> qui permettent d'optimiser les images pour le web.</div>
                <input type="file" id="photos" name="photos" accept="image/png, image/jpeg" @change="processFile($event)">
                <div id="preview">
                    <img id="imgp"  src="" />
                </div>
            </div>
            <div class="form-group">
                <label for="addressLocation">Description</label>
                <RichEditorText :description="description"></RichEditorText>
            </div>

            <div class="form-group">
                <label>Tracé</label>
                <div class="alert alert-blue" role="alert">
                    Veuillez importer un fichier d'extension .geojson. Si vous travaillez avec un site comme calculitineraires.fr, téléchargez d'abord le tracé en GPX (format des traces GPS) et convertissez-le en .geojson sur
                    <a href="https://mygeodata.cloud/">mygeodata.cloud</a>. <b>Attention</b> ce site ne permet que 3 conversions par mois et par adresse IP.
                </div>
                <div class="form-group">
                    <input type="file" id="coord" name="coord" accept="json" @change="loadTextFromFile">
                </div>
                <myMap :newcoords="polyline.latlngs" :locations="locationsWalk"></myMap>
            </div>

            <div class="form-group">
                <div @click="checkForm" class="form-group btn btn-primary "> Ajouter la balade</div>
            </div>
            <div class="progress">
                <progress id="uploader" value="0" max="100">0%</progress>
            </div>
        </form>
    </div>
</template>

<script>
import { db,storageRef,storage, firebase  } from '../../../config/db'
import RichEditorText from './RichEditorText'
import myMap from './map'
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    RichEditorText,
    myMap
  },
  data() {
    return {
      documents: [],
      errors: [],
      nameWalk: null,
      address: null,
      categoryWalk: null,
      description: null,
      duration:null,
      distance:null,
      categories: [],
      locations: [],
      photos:null,
      choiceLocationAddWalk: [],
      locationsWalk: [],
      coord: null,
      polyline: {
          latlngs: []
      },
      maxID:0,
       url: null,
    }
  },
  mounted:function(){
      this.readLocation(),
      this.readCategory(),
      this.readID()
  },
  methods:{
    ... mapActions([
                'setActivePageBackoffice'
        ]),
        loadTextFromFile(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();
        let self = this
        reader.onload = function(e) { 
            const datas = e.target.result
            let json = JSON.parse(datas);
            self.polyline.latlngs = [];
            for (let i = 0; i < json.features.length; i++) {
                self.polyline.latlngs.push(
                    [json.features[i].geometry.coordinates[1],json.features[i].geometry.coordinates[0]]
                )
            }
            self.polyline.latlngs.push(
                [json.features[0].geometry.coordinates[1],json.features[0].geometry.coordinates[0]]

            )
        };
        reader.readAsText(file);
        },
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
        removechoice(choice){
            this.locationsWalk =this.locationsWalk.filter(function(value, index, arr){
                return value!=choice
            });
        },
        readLocation(){
            let self=this
            var query =  db.ref('app/locations/').orderByKey();
            query.once("value").then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        self.locations.push(childSnapshot.key);
                });
            });
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
        checkFormAddWalk(){
            const present = this.locationsWalk.filter((item) => item == this.choiceLocationAddWalk[0])
            if(present.length===0){
                this.locationsWalk.push(this.choiceLocationAddWalk[0])
            } 
        },
        readID(){
            let self=this
            var query =  db.ref('app/walks/').orderByKey();
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

            if (!this.nameWalk) {
                this.errors.push("Nom de la balade obligatoire.");
            }
            if (!this.description) {
                this.errors.push('Description obligatoire.');
            } 
            if (this.locationsWalk.length==0) {
                this.errors.push('Lieux obligatoires.');
            } 
            if (this.polyline.latlngs.length==0) {
                this.errors.push('Tracé obligatoire.');
            } 
            if (!this.photos) {
                this.errors.push('Image obligatoire.');
            } 
            if (!this.duration) {
                this.errors.push('Durée obligatoire.');
            } 
            if (!this.distance) {
                this.errors.push('Distance obligatoire.');
            } 
            if (!this.errors.length) {
                const self = this
                let date=new Date().toLocaleString()
                var postData = {
                    name: self.nameWalk,
                    description: self.description,
                    locations:self.locationsWalk,
                    gps: self.polyline.latlngs,
                    photos:self.photos,
                    duration:self.duration,
                    distance:self.distance,
                    lastUpdates:date,
                    id:self.maxID
                };
                var updates = {};
                updates[self.nameWalk] = postData;
                db.ref('app/walks').update(updates);
                var data={
                    walks : date
                }
                db.ref('app/lastUpdates').update(data);
                self.setActivePageBackoffice('ListeBackoffice')    
            }
            e.preventDefault();
        }
    }
}
</script>

<style >
    .backIcon {
        height:3em;
        width: fit-content;
    }

    .backIcon img {
        height:100%;
    }

</style>
