<template>
    <div id="appContainer">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: "app",
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
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    #appContainer {
        width:100%;
        height:100%;
    }
    .standartContainer {
        width:100%;
        height:100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    :root {
        --darkbluePontault: #44546A;
        --bluePontault: #5B9BD5;
    }
    .bold {
        font-weight: bold;
    }
    html,
    body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        font-family: 'Roboto', sans-serif;
    }

    #appContainer h2 {
        font-size: 30px;
        font-weight: bold;
        margin: 30px;
    }

    #appContainer h3 {
        font-size: 25px;
        font-weight: bold;
        margin:50px;
    }

    .link {
        font-weight: bold;
        color: var(--darkbluePontault)
    }

    .link:hover {
        transform: scale(0.95);
        cursor:pointer;
    }
</style>