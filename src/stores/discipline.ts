import { defineStore } from "pinia";
import { ref } from "vue";

interface Discipline {
    name: string
}


export const useDisciplineStore = defineStore('discipline', () => {
    const disciplines = ref<Discipline[]>([])

    function addDiscipline(name: string){
        disciplines.value.push({
            name
        })
    }

    return { disciplines, addDiscipline }
})