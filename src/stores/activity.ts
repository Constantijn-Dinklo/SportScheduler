import { defineStore } from "pinia";
import { ref } from "vue";

import { v4 as uuidv4 } from "uuid";

interface Activity {
    id: string;
    title: string;
    startDate: Date;
    duration: number;
}


export const useActivityStore = defineStore('activity', () => {
    const activities = ref<Activity[]>([{
            id: "1",
            title: "Test Item",
            startDate: new Date(),
            duration: 1000
        }
    ]);

    function addActivity(title: string, startDate: Date, duration: number){
        const id = uuidv4();
        activities.value.push({
            id,
            title,
            startDate,
            duration
        })
    }

    function updateActivityTime(id: string, newStartDate:Date){
        activities.value = activities.value.map((activity) => {
            if(activity.id != id) {
                return activity
            }
            return {
                ...activity,
                startDate: newStartDate
            }
        })
    }

    return { activities, addActivity, updateActivityTime}
})