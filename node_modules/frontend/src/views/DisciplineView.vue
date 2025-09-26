<script setup lang="ts">
    import api from '@/helpers/axios';
    import { useDisciplineStore } from '@/stores/discipline';
    import { onMounted, ref } from 'vue';

    const disciplineStore = useDisciplineStore();

    const newDiscipline = ref('')

    function addDiscipline(){
        disciplineStore.addDiscipline(newDiscipline.value)
        newDiscipline.value = "";
    }

    function removeDiscipline(id: string){
        disciplineStore.removeDiscipline(id);
    }

    onMounted(() => {
        disciplineStore.fetchDisciplines();
    });
</script>

<template>
    <div>
        Define your disciplines here:
        <input type="text" v-model="newDiscipline" @keyup.enter="addDiscipline" placeholder="Enter discipline"/>
        <button class="btn-primary" @click="addDiscipline">Add Discipline</button>

        <ul>
            <li v-for="discipline in disciplineStore.disciplines">
                {{ discipline.name }}
                <button class="btn-primary" @click="removeDiscipline(discipline.id)">X</button>
            </li>
        </ul>
    </div>
</template>