<template>
    <div class="container containerBackoffice" role="tablist">
        <b-card no-body class="mb-1">
            <div header-tag="header" class="p-1" role="tab">
                <div class="m-2 d-flex justify-content-between" block href="#" v-b-toggle.accordion-1 variant="info">
                    <h1>
                        Lieux <button @click="setActivePageBackoffice('FormAddLocation')" class="ml-1 btn btn-primary">Ajouter un lieu</button>
                    </h1>
                    <div class="d-flex flex-column justify-content-center">
                        <img class="down-icon" src="../../../img/down.png" />
                    </div>
                </div>
            </div>
            <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <LocationBoxBackoffice v-for="location in getLocalStoreLocations" :key="location.name" :location='location'></LocationBoxBackoffice>
                </b-card-body>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <div header-tag="header" class="p-1" role="tab">
                <div class="m-2 d-flex justify-content-between" block href="#" v-b-toggle.accordion-2 variant="info">
                    <h1>Balades <button @click="setActivePageBackoffice('FormAddWalk')" class="ml-1 btn btn-primary">Ajouter une balade</button></h1>
                    <div class="d-flex flex-column justify-content-center">
                        <img class="down-icon" src="../../../img/down.png" />
                    </div>
                </div>
            </div>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <BaladeBoxBackoffice v-for="walk in getLocalStoreWalks" :key="walk.name" :walk='walk'></BaladeBoxBackoffice>
                </b-card-body>
            </b-collapse>
        </b-card>

        <b-card no-body class="mb-1">
            <div header-tag="header" class="p-1" role="tab">
                <div class="m-2 d-flex justify-content-between" block href="#" v-b-toggle.accordion-3 variant="info">
                    <h1>
                        Questions <button @click="setActivePageBackoffice('FormAddQuestion')" class="ml-1 btn btn-primary">Ajouter une question</button>
                    </h1>
                    <div class="d-flex flex-column justify-content-center">
                        <img class="down-icon" src="../../../img/down.png" />
                    </div>
                </div>
            </div>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <QuestionBoxBackoffice v-for="question in getLocalStoreQuestions" :key="question.name" :question='question'></QuestionBoxBackoffice>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    // RecentDocuments.vue
    import { db, storageRef } from '../../../config/db'
    import { mapActions, mapGetters } from 'vuex'


    import LocationBoxBackoffice from './LocationBoxBackoffice'
    import BaladeBoxBackoffice from './BaladeBoxBackoffice'
    import QuestionBoxBackoffice from './QuestionBoxBackoffice'
    import FormDeleteLocation from './FormDeleteLocation'
    import FormAddLocation from './FormAddLocation'
    import FormAddWalk from './FormAddWalk'
    import FormDeleteWalk from './FormDeleteWalk'
    
    export default {
        name: "Backoffice",
        components: {
            FormDeleteLocation,
            FormAddLocation,
            FormAddWalk,
            FormDeleteWalk,
            LocationBoxBackoffice,
            BaladeBoxBackoffice,
            QuestionBoxBackoffice
        },
        data() {
            return {
                documents: [],
                errors: [],
                locations: [],
                walks: [],
                questions:[],
                lastUpdatesLocation:null,
                lastUpdatesQuestion:null,
                lastUpdatesWalk:null,
            }
        },
        firebase: {
            documents: db.ref()
        },
        methods: {
            ...mapActions([
                'setActivePageBackoffice',
                'setBackofficeLocation',
                'setBackofficeWalk',
                'setBackofficeQuestion',
                'addWalkToStore',
                'addQuestionToStore',
                'addLocationToStore',
                'setLocalLastUpdatesLocations',
                'setLocalLastUpdatesQuestions',
                'setLocalLastUpdatesWalks',
                'deleteLocalLocations',
                'deleteLocalWalks',
                'deleteLocalQuestions',
                'deleteLocationFromStore',
                'deleteQuestionFromStore',
                'deleteWalkFromStore'
            ]),
            setLocationUpdates(){
                let date=new Date().toLocaleString()
                this.setLocalLastUpdatesLocations(date)
                const parsed = JSON.stringify(this.getLastUpdatesLocations); 
                localStorage.setItem('StorageLastUpdatesLocations', parsed);
            },
            setQuestionsUpdates(){
                let date=new Date().toLocaleString()
                this.setLocalLastUpdatesQuestions(date)
                const parsed = JSON.stringify(this.getLastUpdatesQuestions); 
                localStorage.setItem('StorageLastUpdatesQuestions', parsed);
            },
            setWalksUpdates(){
                let date=new Date().toLocaleString()
                this.setLocalLastUpdatesWalks(date)
                const parsed = JSON.stringify(this.getLastUpdatesWalks); 
                localStorage.setItem('StorageLastUpdatesWalks', parsed);
            },
            readLocations() {
                 console.log("read location")
                let self = this
                localStorage.removeItem('StorageLocations');
                self.deleteLocalLocations
                var query = db.ref('app/locations/').orderByKey();
                query.once("value")
                    .then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            const parsed = JSON.stringify(childSnapshot.val()); 
                            self.addLocationToStore(childSnapshot.val())
                            localStorage.setItem('StorageLocations', parsed);
                        });
                        self.locations.push(self.getLocalStoreQuestions);
                        self.setLocationUpdates()
                        self.setBackofficeLocation(self.locations)
                })
            },
            readWalks() {
                console.log("read walk")
                let self = this
                localStorage.removeItem('StorageWalks');
                self.deleteLocalWalks
                var query = db.ref('app/walks/').orderByKey();
                query.once("value")
                    .then(function (snapshot) {
                         snapshot.forEach(function (childSnapshot) {
                            const parsed = JSON.stringify(childSnapshot.val()); 
                            self.addWalkToStore(childSnapshot.val())
                            localStorage.setItem('StorageWalks', parsed);
                        });
                        self.walks=self.getLocalStoreWalks;
                        self.setWalksUpdates()    
                        self.setBackofficeWalk(self.walks)

                    });
            },
            readQuestions() {
                console.log("read question")
                let self = this
                localStorage.removeItem('StorageQuestions');
                self.deleteLocalQuestions
                var query = db.ref('app/questions/').orderByKey();
                query.once("value")
                    .then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            const parsed = JSON.stringify(childSnapshot.val()); 
                            self.addQuestionToStore(childSnapshot.val())
                            localStorage.setItem('StorageQuestions', parsed);
                        });
                        self.questions=self.getLocalStoreQuestions;
                        self.setQuestionsUpdates()
                        self.setBackofficeQuestion(self.questions)

                    });
            },
            testStorageLocations(){
                if (localStorage.getItem('StorageLocations')) {
                    try {
                        if (localStorage.getItem('StorageLocations')!=0) {
                            const listLocations = JSON.parse(localStorage.getItem('StorageLocations'));
                            listLocations.forEach(location => {
                                this.addLocationToStore(location)
                            });
                        }
                        else{
                             this.readLocations()
                        }
                    } catch(e) {
                        localStorage.removeItem('StorageLocations');
                    }
                }
                else{
                    this.readLocations()
                }
            },
            testStorageWalks(){
                if (localStorage.getItem('StorageWalks')) {
                    try {
                        if(localStorage.getItem('StorageWalks')!=0){
                            const listWalks = JSON.parse(localStorage.getItem('StorageWalks'));
                            listWalks.forEach(walk => {
                                this.addWalkToStore(walk)
                            });
                        }
                        else{
                            this.readWalks()
                        }
                        
                    
                    } catch(e) {
                        localStorage.removeItem('StorageWalks');
                    }
                }
                else{
                    this.readWalks()
                }
            },
            testStorageQuestions(){
                if (localStorage.getItem('StorageQuestions')) {
                    try {
                        if(localStorage.getItem('StorageQuestions')!=0){
                            const listQuestions = JSON.parse(localStorage.getItem('StorageQuestions'));
                            listQuestions.forEach(question => {
                                this.addQuestionToStore(question)
                            });
                              console.log(localStorage.getItem('StorageQuestions'))
                        }
                        else{
                            this.readQuestions()
                              console.log(localStorage.getItem('StorageQuestions'))
                        }
                      
                    
                    } catch(e) {
                        localStorage.removeItem('StorageQuestions');
                    }
                }
                else{
                    this.readQuestions()
                }
            },
            testUpdates(){
                if (localStorage.getItem('StorageLastUpdatesLocations')) {
                    try {
                        if(localStorage.getItem('StorageLastUpdatesLocations')!=0){
                            const date = JSON.parse(localStorage.getItem('StorageLastUpdatesLocations'));
                            date.forEach(date => {
                                this.setLocalLastUpdatesLocations(date)
                            });
                        }
                        else{
                             this.setLocationUpdates()
                        }
                    
                    } catch(e) {
                        localStorage.removeItem('StorageLastUpdatesLocations');
                    }
                }
                else{ 
                    this.setLocationUpdates()
                }
                if (localStorage.getItem('StorageLastUpdatesQuestions')) {
                    try {
                        if(localStorage.getItem('StorageLastUpdatesQuestions')!=0){
                            const date = JSON.parse(localStorage.getItem('StorageLastUpdatesQuestions'));
                            date.forEach(question => {
                                this.setLocalLastUpdatesQuestions(question)
                            });
                        }
                        else{
                            this.setQuestionsUpdates()
                        }
                    } catch(e) {
                        localStorage.removeItem('StorageLastUpdatesQuestions');
                    }
                }
                else{ 
                    this.setQuestionsUpdates()
                }

                if (localStorage.getItem('StorageLastUpdatesWalks')) {
                    try {
                        if(localStorage.getItem('StorageLastUpdatesWalks')){
                            const date = JSON.parse(localStorage.getItem('StorageLastUpdatesWalks'));
                            date.forEach(walk => {
                                this.setLocalLastUpdatesWalks(walk)
                            });
                        }
                        else{
                             this.setWalksUpdates()
                        }
                    
                    } catch(e) {
                        localStorage.removeItem('StorageLastUpdatesWalks');
                    }
                }
                else{ 
                    this.setWalksUpdates()
                }
            },
            getUpdateFromServer(){
                let self=this
                var query = db.ref('app/lastUpdates/').orderByKey();
                query.once("value").then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        if(childSnapshot.key=="questions"){
                            self.lastUpdatesQuestion=childSnapshot.val()
                        }
                        if(childSnapshot.key=="walks"){
                            self.lastUpdatesWalk=childSnapshot.val()
                        }
                        if(childSnapshot.key=="locations"){
                            self.lastUpdatesLocation=childSnapshot.val()
                        }
                    })
                    self.needUpdate()
                })
                
            },
            needUpdate(){
                console.log(this.lastUpdatesLocation)
                console.log(this.lastUpdatesQuestion)
                console.log(this.lastUpdatesWalk)
                if(this.lastUpdatesLocation>this.getLastUpdatesLocations){
                    console.log("coucou")
                    //trouver celui avec la bonne date
                    this.updateLocation(this.lastUpdatesLocation)
                }
                if(this.lastUpdatesQuestion>this.getLastUpdatesQuestions){
                    console.log("pouet")
                    this.updateQuestion(this.lastUpdatesQuestion)
                }
                if(this.lastUpdatesWalk>this.getLastUpdatesWalks){
                    console.log("ff")
                    this.updateWalk(this.lastUpdatesWalk)
                }

            },
            updateLocation(date){
                let self=this
                var query = db.ref('app/locations/').orderByKey();
                query.once("value").then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        childSnapshot.forEach(function(child){
                            if(child.key=="lastUpdate" && child.val()==date){
                                self.deleteLocationFromStore(childSnapshot.val())
                                self.addLocationToStore(childSnapshot.val())
                                localStorage.removeItem('StorageLocations');
                                const stored = self.getLocalStoreLocation
                                const parsed = JSON.stringify(stored); 
                                localStorage.setItem('StorageLocations', parsed);
                            }
                        })
                    })
                
                })
            },
            updateWalk(date){
                let self=this
                var query = db.ref('app/walks/').orderByKey();
                query.once("value").then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        childSnapshot.forEach(function(child){
                            if(child.key=="lastUpdate" && child.val()==date){
                                self.deleteWalkFromStore(childSnapshot.val())
                                self.addWalkToStore(childSnapshot.val())
                                localStorage.removeItem('StorageWalks');
                                const stored = self.getLocalStoreWalks
                                const parsed = JSON.stringify(stored); 
                                localStorage.setItem('StorageWalks', parsed);
                            }
                        })
                    })
                
                })
            },
            updateQuestion(date){
                let self=this
                var query = db.ref('app/questions/').orderByKey();
                query.once("value").then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        childSnapshot.forEach(function(child){
                            if(child.key=="lastUpdate" && child.val()==date){
                                //probleme ici : ne supprimer pas l'ancien car n'est plus le meme
                                console.log(self.getLocalStoreQuestions)
                                console.log(childSnapshot.val())
                                self.deleteQuestionFromStore(childSnapshot.val())
                                console.log(self.getLocalStoreQuestions)
                                self.addQuestionToStore(childSnapshot.val())
                                localStorage.removeItem('StorageQuestions');
                                console.log(localStorage.getItem('StorageQuestions'))
                                console.log(self.getLocalStoreQuestions)
                                const stored = self.getLocalStoreQuestions
                                const parsed = JSON.stringify(stored); 
                                localStorage.setItem('StorageQuestions', parsed);
                                console.log(localStorage.getItem('StorageQuestions'))
                            }
                        })
                    })
                
                })
            },
        },
        computed: {
            ...mapGetters([
                'getBackofficeLocation',
                'getBackofficeWalk',
                'getBackofficeQuestion',
                'getLocalStoreQuestions',
                'getLocalStoreWalks',
                'getLocalStoreLocations',
                'getLastUpdatesLocations',
                'getLastUpdatesWalks',
                'getLastUpdatesQuestions',
            ]),
        },
        mounted: function () {
            
            this.testStorageWalks()
            this.testStorageQuestions()
            this.testStorageLocations()
            this.testUpdates()
         
            if(this.getLastUpdatesLocations==0){
                this.setLocationUpdates()
                this.readLocations()
            }
            if(this.getLastUpdatesWalks==0){
                this.setWalksUpdates()
                this.readWalks()
            }
            if(this.getLastUpdatesQuestions==0){
                this.setQuestionsUpdates()
                this.readQuestions()
            }
            this.getUpdateFromServer()

        }
    }
</script>

<style>
    .down-icon {
        height: 1.5em;
        margin-right: 1em;
    }
    .containerBackoffice h1 {
        margin-left : 1em;
    }
</style>