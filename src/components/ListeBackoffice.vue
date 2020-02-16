<template>
    <div class="container containerBackoffice" role="tablist">
        <b-card no-body class="mb-1">
            <div header-tag="header" class="p-1" role="tab">
                <div class="m-2 d-flex justify-content-between" block href="#" v-b-toggle.accordion-1 variant="info">
                    <h1>
                        Lieux <button @click="setActivePageBackoffice('FormAddLocation')" class="ml-1 btn btn-primary">Ajouter un lieu</button>
                    </h1>
                    <div class="d-flex flex-column justify-content-center">
                        <img class="down-icon" src="../img/down.png" />
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
                        <img class="down-icon" src="../img/down.png" />
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
                        <img class="down-icon" src="../img/down.png" />
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
    import { db, storageRef } from '../config/db'
    import { mapActions, mapGetters } from 'vuex'

    import LocationBoxBackoffice from '../components/LocationBoxBackoffice'
    import BaladeBoxBackoffice from '../components/BaladeBoxBackoffice'
     import QuestionBoxBackoffice from '../components/QuestionBoxBackoffice'


    import FormDeleteLocation from '../components/FormDeleteLocation'
    import FormAddLocation from '../components/FormAddLocation'
    import FormAddWalk from '../components/FormAddWalk'
    import FormDeleteWalk from '../components/FormDeleteWalk'
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
                questions:[]
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
                'setBackofficeQuestion'
            ]),
            readLocations() {
                let self = this
                var query = db.ref('app/locations/').orderByKey();
                query.once("value")
                    .then(function (snapshot) {
                        snapshot.forEach(function (childSnapshot) {
                            self.locations.push(childSnapshot.val());
                        });
                        self.setBackofficeLocation(self.locations)
                    });
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

        },
        computed: {
            ...mapGetters([
                'getBackofficeLocation',
                'getBackofficeWalk',
                'getBackofficeQuestion'
            ]),
        },
        mounted: function () {
            this.readLocations()
            this.readWalks()
            this.readQuestions()
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