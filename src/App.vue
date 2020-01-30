<template>
    <div id="appContainer">
       <Backoffice />
    </div>
</template>

<script>
import Backoffice from "./view/Backoffice";
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "app",
        components: {
        Backoffice
    },
    data: function () {
        return {

        }
    },
    methods: {

    },
    computed:{

    },
	mounted: function(){
        
    }
}
</script>

<style>
    :root {
        --bluePC: #5b9bd5;
        --darkbluePC: #44546a;
        --catCulture: #E66F13;
        --catHistoire: #741d89;
        --catCulte: #A21414;
        --catNature: #539312;
        --catParc: #d9d217;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: 'Roboto', sans-serif;
    }

    .topPage {
        background-color: var(--bluePC);
        height: 14vh;
    }

    .pageTitle {
        color: white;
        text-align: center;
        font-size: 1.3rem;
        height: 50%;
        position: relative;
    }

    .centerPageTitle {
        margin: 0;
        position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }
</style>