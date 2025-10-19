import api from "@/helpers/axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { addDurationToDate } from "@/helpers/date-helper";

interface Activity {
    id: string;
    title: string;
    disciplineId: string;
    startDate: Date;
    endDate: Date;
    duration?: number;
}


export const useActivityStore = defineStore('activity', () => {
    const activities = ref<Activity[]>([]);

    const calendarActivities = computed(() => {
        return activities.value.map((activity) => {
            return {
                id: activity.id,
                title: activity.title,
                startDate: activity.startDate,
                classes: [],
            }
        })
    });

    async function fetchActivities() {
        const response = await api.get('/activities');
        const data = response.data;
        activities.value = [];
        data.forEach((activity: any) => {
            activities.value.push({
                id: activity._id,
                title: activity.title,
                disciplineId: activity.disciplineId,
                startDate: activity.startTime,
                endDate: activity.endTime
            })
        })
    }

    async function addActivity(title: string, disciplineId: string, startDate: Date, endDate: Date, duration: number){
        const response = await api.post('/activities', {
            title,
            disciplineId,
            startDate,
            endDate,
            duration
        });
        console.log(response);
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

    return { activities, calendarActivities, fetchActivities, addActivity, updateActivityTime}
})