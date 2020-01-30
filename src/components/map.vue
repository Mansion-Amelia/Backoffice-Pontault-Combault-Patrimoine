<template>
  <div>
    <l-map id="vuemap" :zoom="zoom" :center="center">
                    <l-tile-layer :url="url"></l-tile-layer>
                    <l-polyline :lat-lngs="polyline.latlngs"
                                :color="polyline.color" />
                    <marker-popup :position="formated(center)"
                                  :text="'<b>Vous êtes ici</b>'"
                                  :icontest="'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fuser-location-darkblue.svg?alt=media&token=227a942e-1183-4252-99fe-9ea4cdebfa8e'" />
                    <marker-popup v-for="(marker,i) in markerList" :key="i"
                                  :position="formated(marker.coord)"
                                  :text="marker.text"
                                  :icontest="marker.category" />
                    <l-control>
                        <div @click="increaseCenter" class="localisationButton"><img src="../img/target-me.svg" /></div>
                    </l-control>
                </l-map>
  </div>
</template>


<script>
  import { db } from '../config/db'
  import {LMap, LTileLayer, LMarker, LPolyline, LControl} from 'vue2-leaflet'
  import MarkerPopup from "./MarkerPopup";
  import { latLng } from "leaflet";
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Map',
    props:["newcoords", 'locations'],
    data () {
      return {
        markerList: [],
        url: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
        //url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        zoom: 13,
        center: [48.801255, 2.607598],
        bounds: null, 
        attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        polyline: {
          latlngs: [],
          color: "green"
        },
        walk:[],
        balade:null,
        lieuxBalade: []
      };
    },
    firebase: {
      documents: db.ref()
    },
    watch:{
      newcoords:function(){
        this.polyline.latlngs=this.newcoords
      }, 
     locations:function(){

        this.walk=this.locations
        this.addMarkerLocation()
     }
      
    }, 
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LPolyline,
      LControl,
      MarkerPopup,
      
    },
    methods: {
        ... mapActions([
            'setActiveLocation',
            'setActivePage'
        ]),
        setLocations(){
             this.locations.forEach(function(childSnapshot) {
                let self=this
                this.walk.push(childSnapshot)
             })
          },
        formated(coords) {
            return latLng(coords)
        },
        increaseCenter() {
            this.center = [this.center[0] + 0.0001, this.center[1] + 0.0001]
            //console.log(this.center)
        },  
        trackPosition() {
            if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.successPosition, this.failurePosition, {enableHighAccuracy: true,
                //timeout: 15000,
                maximumAge: 0,
                })
            } 
            else {
            alert(`Browser doesn't support Geolocation`)
            }
        },
        successPosition: function(position) {
            this.center = [position.coords.latitude, position.coords.longitude]
            //console.log(this.center)
        },
        failurePosition: function(err) {
            alert('Error Code: ' + err.code + ' Error Message: ' + err.message)
        },

        formated(coords) {
            return latLng(coords)
        },
        increaseCenter() {
            this.center = [this.center[0] + 0.0001, this.center[1] + 0.0001]
            //console.log(this.center)
        },
        trackPosition() {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(this.successPosition, this.failurePosition, {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0,
                })
            }
            else {
                alert(`Browser doesn't support Geolocation`)
            }
        },
        successPosition: function (position) {
            this.center = [position.coords.latitude, position.coords.longitude]
            //console.log(this.center)
        },
        failurePosition: function (err) {
            alert('Error Code: ' + err.code + ' Error Message: ' + err.message)
        },
        addMarkerLocation() {
            let self = this
            self.markerList.splice(0,self.markerList.length)
            var query = db.ref('app/locations/').orderByKey();
            query.once("value")
                .then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var name = (childSnapshot.val());
                        let catIcon;
            let catColor;
            if (name.category == "Histoire"){
              catIcon = "https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-histoire.svg?alt=media&token=ef37c804-6ddb-4505-a3c3-c62aad80e139"
              catColor = "#741d89"
            }
            if (name.category == "Culte"){
              catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-culte.svg?alt=media&token=6f1b79fd-d690-489f-abd8-4e4b964a9155'
              catColor = "#a21414"

            }
            if (name.category == "Nature"){
              catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-nature.svg?alt=media&token=92822626-4c3b-47c8-9b3c-e1a4a9b96dcf'
              catColor = "#539312"
            }
            if (name.category == "Culture"){
              catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-culture.svg?alt=media&token=6fdea4b4-2d43-4027-ae24-7ad838a171e3'
              catColor = "#e66f13"
            }
            if (name.category == "Parc"){
              catIcon = 'https://firebasestorage.googleapis.com/v0/b/patrimoine-pontault-combault.appspot.com/o/app%2Fmarkers%2Fmarker-parc.svg?alt=media&token=d6632431-5d31-4584-9071-b129b9f710b4'
              catColor = "#d9d217"
            }
            let textContent = "<div class='popupTitle' style='color:"+catColor+";'><b>"+name.name+"</b></div>"+"<div class='text-center'><img class='popupImage' src='"+name.photos+"' alt='err'></div>"
                        
                        if (name.gps) {
                                
                                for (var i = 0; i <= self.walk.length; i++) {
                                    if (name.name == self.walk[i]) {
                                        
                                        self.markerList.push({ coord: name.gps, text: textContent, category: catIcon })
                                    }
                                }
                       console.log(self.markerList)
                            
                        }
                    });
                });
        },
        addWalk() {
            let self = this
            var query = db.ref('app/walks/').orderByKey();
            query.once("value").then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var name = (childSnapshot.val());
                    if (name.name == self.walk.name) {
                        self.polyline.latlngs.push(name.gps)
                        if (name.category == "Histoire") {
                            self.polyline.color = "#741d89"
                        }
                        else if (name.category == "Culte") {
                            self.polyline.color = "#a21414"
                        }
                        else if (name.category == "Nature") {
                            self.polyline.color = "#539312"
                        }
                        else if (name.category == "Culture") {
                            self.polyline.color = "#e66f13"
                        }
                        else if (name.category == "Parc") {
                            self.polyline.color = "#d9d217"
                        }
                        else {
                            self.polyline.color = "#000000"
                        }
                    }
                });
            });
        },
    },
    mounted: function() {
    
        this.walk=this.locations
        this.trackPosition()
     
    },
    computed:{
        ... mapGetters([
            'getActivePage',
            'getActiveWalk'
        ]),
    },
  };

</script>


<style>
    .baladeMap #vuemap {
        width: 100%;
        height: 55vh;
    }

    .baladeContainer {
        padding: 0.5em;
        height: 17vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

        .baladeContainer .placeTitle {
            margin: 0;
            height: 30%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

    .underPlaceTitle {
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .baladeDistance, .baladeDuration, .baladeDetails {
        width: 33.3%;
        text-align: center;
        color: var(--darkbluePC);
    }

    .downArrow {
        height: 0.9em;
    }

    .det {
        line-height: 1em;
        color: var(--darkbluePC);
    }

    .lieuxList {
        margin: 2em;
        color: var(--darkbluePC);
    }

        .lieuxList a {
            color: var(--bluePC);
            display: block;
        }

    .marginFooter {
        margin-bottom: 7em;
    }

    .leaflet-popup-tip, .leaflet-popup-content-wrapper {
      background-color: #fff; /* à varier selon la couleur du marker */
    }


</style>
