import api from "@/helpers/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

interface Discipline {
    id: string
    name: string
}


export const useDisciplineStore = defineStore('discipline', () => {
    const disciplines = ref<Discipline[]>([])

    async function fetchDisciplines() {
        const res = await api.get('/disciplines');
        const data = res.data;
        disciplines.value = [];
        data.forEach((value: any) => {
            disciplines.value.push({
                id: value._id,
                name: value.name
            });
        });  
    }

    async function addDiscipline(name: string) {
        const response = await api.post('/disciplines', {name: name});
        const data = response.data;
        disciplines.value.push({
            id: data._id,
            name: data.name
        })
    }

    async function removeDiscipline(id: string) {
        const response = await api.delete(`/disciplines/${id}`);
        disciplines.value = disciplines.value.filter((discipline) => discipline.id != response.data.id)
    }

    return { disciplines, fetchDisciplines, addDiscipline, removeDiscipline }
})