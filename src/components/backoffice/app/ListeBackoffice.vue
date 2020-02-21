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
                    <LocationBoxBackoffice v-for="location in getBackofficeLocation" :key="location.name" :location='location'></LocationBoxBackoffice>
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
                    <BaladeBoxBackoffice v-for="walk in getBackofficeWalk" :key="walk.name" :walk='walk'></BaladeBoxBackoffice>
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
                    <QuestionBoxBackoffice v-for="question in getBackofficeQuestion" :key="question.name" :question='question'></QuestionBoxBackoffice>
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
                'setLocalLastUpdatesWalks'
            ]),
            readLocations() {
                let self = this
                var query = db.ref('app/locations/').orderByKey();
                query.once("value")
                    .then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            const parsed = JSON.stringify(childSnapshot.val()); 
                            self.addLocationToStore(childSnapshot.val())
                            localStorage.setItem('StorageLocations', parsed);
                        });
                        self.locations.push(self.getLocalStoreQuestions);
                        console.log(self.locations)
                        this.setLocalLastUpdates()
                        self.setBackofficeLocation(self.locations)
                })
            },
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
            readWalks() {
                let self = this
                var query = db.ref('app/walks/').orderByKey();
                query.once("value")
                    .then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            self.walks.push(childSnapshot.val());
                        });
                        self.setBackofficeWalk(self.walks)

                    });
            },
            readQuestions() {
                let self = this
                var query = db.ref('app/questions/').orderByKey();
                query.once("value")
                    .then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            self.questions.push(childSnapshot.val());
                        });
                        self.setBackofficeQuestion(self.questions)

                    });
            },
            testStorageLocations(){
                if (localStorage.getItem('StorageLocations')) {
                    try {
                        const listLocations = JSON.parse(localStorage.getItem('StorageLocations'));
                        listLocations.forEach(location => {
                            this.addLocationToStore(location)
                        });
                    
                    } catch(e) {
                        localStorage.removeItem('StorageLocations');
                    }
                }
            },
            testStorageWalks(){
                if (localStorage.getItem('StorageWalks')) {
                    try {
                        const listWalks = JSON.parse(localStorage.getItem('StorageWalks'));
                        listWalks.forEach(walk => {
                            this.addWalkToStore(walk)
                        });
                    
                    } catch(e) {
                        localStorage.removeItem('StorageWalks');
                    }
                }
            },
            testStorageQuestions(){
                if (localStorage.getItem('StorageQuestions')) {
                    try {
                        const listQuestions = JSON.parse(localStorage.getItem('StorageQuestions'));
                        listQuestions.forEach(question => {
                            this.addQuestionToStore(question)
                        });
                    
                    } catch(e) {
                        localStorage.removeItem('StorageQuestions');
                    }
                }
            },
            testUpdates(){
                if (localStorage.getItem('StorageLastUpdatesLocations')) {
                    try {
                        const date = JSON.parse(localStorage.getItem('StorageLastUpdatesLocations'));
                        listLocations.forEach(date => {
                            this.setLocalLastUpdatesLocations(date)
                        });
                    
                    } catch(e) {
                        localStorage.removeItem('StorageLastUpdatesLocations');
                    }
                }
                else{ 
                    this.setLocationUpdates()
                }
                if (localStorage.getItem('StorageLastUpdatesQuestions')) {
                    try {
                        const date = JSON.parse(localStorage.getItem('StorageLastUpdatesQuestions'));
                        listLocations.forEach(question => {
                            this.setLocalLastUpdatesQuestions(question)
                        });
                    
                    } catch(e) {
                        localStorage.removeItem('StorageLastUpdatesQuestions');
                    }
                }
                else{ 
                    this.setQuestionsUpdates()
                }

                if (localStorage.getItem('StorageLastUpdatesWalks')) {
                    try {
                        const date = JSON.parse(localStorage.getItem('StorageLastUpdatesWalks'));
                        listLocations.forEach(walk => {
                            this.setLocalLastUpdatesWalks(walk)
                        });
                    
                    } catch(e) {
                        localStorage.removeItem('StorageLastUpdatesWalks');
                    }
                }
                else{ 
                    this.setWalksUpdates()
                }
            }
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
                });
            });

            if(this.lastUpdatesLocation>this.getLastUpdatesLocations){
                this.readLocations()
            }
            if(this.lastUpdatesQuestion>this.getLastUpdatesQuestions){
                this.readQuestions()
            }
            if(this.lastUpdatesWalk>this.getLastUpdatesWalks){
                this.readWalks()
            }
        
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