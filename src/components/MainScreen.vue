<template>
    <div>
        <h1>Main Screen</h1>
        <p>ID de l'écran sélectionné : {{ screenId }}</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const screenId = route.query.id; // Récupérer l'ID transmis en paramètre
</script>

<style scoped>
/* Vos styles ici */
</style>
