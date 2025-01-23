<template>
    <div class="home">
        <h2>EMPLACEMENT DE L'ECRAN</h2>
        <hr>
        <select class="form-select" name="" id="">
            <option value="">Sélectionnez un Emplacement</option>
        </select>
        <button>Identifier l'écran</button>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    props: {
        msg: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h2{
        color: orange;
        font-family: Arial, Helvetica, sans-serif;
        word-spacing: 5px;
        letter-spacing: 2px;
    }

    hr{
        width: 50vw;
        background: black;
        height: 1px;
        border: none;
        margin-bottom: 32px;
        
    }
    .form-select{
        background: none;
        padding: 16px;
        min-width: 39vw;
        border: none;
        border-radius: 10px 0 0 10px;
        box-shadow: 0px 0px 1px black;

    }
    .form-select:focus{
        border: 1px;
        box-shadow: 0px 0px 8px orange;
    }
    .form-select option{
        padding: 16px !important;
    }
    button{
        padding:16px;
        border-radius: 0px 5px 5px 0px;
        border:none;
        box-shadow: 1px 0px 1px black;
        text-transform: uppercase;
        cursor: pointer;
        background: orange;
        color: white;
        font-weight: bold;
    }
    button:hover{
        border: 1px;
        background: green;
        color: white;
    }
</style>
