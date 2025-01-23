<template>
    <div class="home">
        <img class="logo" alt="Vue logo" src="../assets/os25.png">

        <h2>EMPLACEMENT DE L'ECRAN</h2>
        <hr>
        <select class="form-select" name="" id="" @change="selectScreen">
            <option 
                v-for="screen in screens" 
                :key="screen?.id" 
                :value="screen?.zone" 
                :data-screen="screen?.id">
                {{ screen?.zone }}
            </option>
        </select>
        <button @click="definirEcran">Identifier l'écran</button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import io from "socket.io-client";
import { ref } from "vue";

const router = useRouter();
const screens = ref([]); // Liste des écrans
const selectedScreen = ref(""); // Zone sélectionnée
const selectedScreenId = ref(""); // ID de l'écran sélectionné
const socket = io();

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Réception des écrans libres via socket.io
socket.on("freeScreens", (data) => {
    console.log(data); // Vérifiez les données reçues
    screens.value = data; // Assignez les données aux écrans
    selectedScreenId.value = data[0].id;
});

// Gestion de la sélection d'écran
const selectScreen = (event) => {
    selectedScreen.value = event.target.value; // Mettre à jour la zone sélectionnée
    selectedScreenId.value = event.target.selectedOptions[0].dataset.screen; // Récupérer l'ID de l'écran
    console.log("Zone sélectionnée :", selectedScreen.value);
    console.log("ID de l'écran sélectionné :", selectedScreenId.value);
};

// Action pour identifier l'écran sélectionné
const definirEcran = () => {
    localStorage.setItem("emplacement", selectedScreen.value);
    localStorage.setItem("screenId", selectedScreenId.value);

    if (!selectedScreenId.value) {
        alert("Veuillez sélectionner un écran avant de continuer.");
        return;
    }
    socket.emit("aboutConnection", {
        token: localStorage.getItem("sessionID"),
        privateKey: localStorage.getItem("privateKey"),
        emplacement: localStorage.getItem("emplacement"),
        type: "client",
        zone: "",
        screenId: selectedScreenId.value
    })
    router.push({
        name: 'MainScreen',
        query: { id: selectedScreenId.value } // Passer l'ID de l'écran en paramètre
    });
};

socket.on("sessionID", (data) => {
    localStorage.setItem("sessionID", data.sessionID);
    if (localStorage.getItem("privateKey") == null) {
        let pk = uuidv4();
        localStorage.setItem("privateKey", pk);
        localStorage.setItem("emplacement", "");
    } else {
        if (localStorage.getItem("emplacement") != null && localStorage.getItem("emplacement") != "") {
            socket.emit("aboutConnection", {
                token: data.sessionID,
                privateKey: localStorage.getItem("privateKey"),
                emplacement: localStorage.getItem("emplacement"),
                type: "client",
                zone: "",
                screenId: localStorage.getItem("screenId")
            });
            router.push({
                name: 'MainScreen',
                query: { id: localStorage.getItem("screenId") } // Passer l'ID de l'écran en paramètre
            });
        }
    }
})
// Auto Login with Token
if (sessionStorage.getItem("token") !== null) {
    socket.emit("authToken", {
        login: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        groupe: "client",
        token: localStorage.getItem("token")
    });
}
</script>

<style scoped>
.logo{
  width: 200px;
  margin-top: 50px;
}
h2 {
    color: orange;
    font-family: Arial, Helvetica, sans-serif;
    word-spacing: 5px;
    letter-spacing: 2px;
}
hr {
    width: 50vw;
    background: black;
    height: 1px;
    border: none;
    margin-bottom: 32px;
}

.form-select {
    background: none;
    padding: 16px;
    min-width: 39vw;
    border: none;
    border-radius: 10px 0 0 10px;
    box-shadow: 0px 0px 1px black;
}

.form-select:focus {
    border: 1px;
    box-shadow: 0px 0px 8px orange;
}

.form-select option {
    padding: 16px !important;
}

button {
    padding: 16px;
    border-radius: 0px 5px 5px 0px;
    border: none;
    box-shadow: 1px 0px 1px black;
    text-transform: uppercase;
    cursor: pointer;
    background: orange;
    color: white;
    font-weight: bold;
}

button:hover {
    border: 1px;
    background: green;
    color: white;
}
</style>
