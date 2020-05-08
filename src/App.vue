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

    .column {
        flex-direction: column;
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
        font-size:18px;
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
        font-size: 20px;
        font-weight: bold;
        margin:50px;
    }

    .link {
        font-weight: bold;
        color: var(--darkbluePontault)
    }

    .link:hover {
        transform: scale(0.99);
        cursor:pointer;
    }

    .whoAreWeContainer, .mobileApplicationContainer {
        width:80%;
        max-width:1000px;
    }

    #appContainer .pageContainer h2, #appContainer .pageContainer h3{
        margin-left: 0px;
        margin-bottom: 20px;
        margin-top: 0px;
    }

    /* FORM */
    
    form {
        width:400px;
    }
    .signupInfo {
        font-size:10px;
    }
    label {
        font-weight: bold;
        margin:15px 0px;
    }

    input[type=text],input[type=email],input[type=password], textarea {
        border:none;
        background-color: #F1F1F1;
        width:400px;
        padding:5px 10px;;
    }
    input[type=text],input[type=email],input[type=password] {
        height:45px;
    }

    textarea {
        height: 300px;
    }

    input, .submit{
        border-radius: 10px;
    }

    .submit {
        border:none;
        background-color: var(--darkbluePontault);
        color:white;
        padding: 10px 30px;
        font-weight: bold;
        margin-top: 30px;
    }

    .submit:hover {
        transform: scale(0.95);
        cursor:pointer;
    }

    .success {
        color:rgb(0, 184, 0);
    }
</style>