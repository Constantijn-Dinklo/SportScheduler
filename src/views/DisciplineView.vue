<script setup lang="ts">
import { useDisciplineStore } from '@/stores/discipline';
import { ref } from 'vue';

    const disciplineStore = useDisciplineStore();

    const newDiscipline = ref('')

    function addDiscipline(){
        disciplineStore.addDiscipline(newDiscipline.value)
        newDiscipline.value = "";
    }
</script>

<template>
    <div>
        Define your disciplines here:
        <input type="text" v-model="newDiscipline" @keyup.enter="addDiscipline" placeholder="Enter discipline"/>
        <button @click="addDiscipline">Add Discipline</button>

        <ul>
            <li v-for="discipline in disciplineStore.disciplines">
                {{ discipline }}
            </li>
        </ul>
    </div>
</template>