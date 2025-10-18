import api from "@/helpers/axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { v4 as uuidv4 } from "uuid";
import { addDurationToDate } from "@/helpers/date-helper";

interface Activity {
    id: string;
    title: string;
    discipline: string;
    startDate: Date;
    endDate: Date;
    duration?: number;
}


export const useActivityStore = defineStore('activity', () => {
    const activities = ref<Activity[]>([{
            id: uuidv4(),
            title: "Test Item",
            startDate: new Date(),
            endDate: addDurationToDate(new Date(), 1000),
            duration: 1000,
            discipline: ''
        }
    ]);

    const calendarActivities = computed(() => {
        return activities.value.map((activity) => {
            return {
                id: activity.id,
                title: activity.title,
                startDate: activity.startDate,
                // endDate: addDurationToDate(activity.startDate, activity.duration),
                classes: [],
            }
        })
    })

    async function addActivity(title: string, discipline: string, startDate: Date, endDate: Date, duration: number){
        const response = await api.post('/activities', {
            name: title,
            discipline,
            startDate,
            endDate,
            duration
        });
        // const id = uuidv4();
        // activities.value.push({
        //     id,
        //     title,
        //     discipline,
        //     startDate,
        //     endDate: addDurationToDate(startDate, duration),
        //     duration,
        // })
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

    return { activities, calendarActivities, addActivity, updateActivityTime}
})