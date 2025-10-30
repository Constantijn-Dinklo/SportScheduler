import api from "@/helpers/axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface Activity {
    id: string;
    title: string;
    disciplineId: string;
    startDateTime: Date;
    endDateTime: Date;
    duration?: number;
}


export const useActivityStore = defineStore('activity', () => {
    const activities = ref<Activity[]>([]);

    const calendarActivities = computed(() => {
        return activities.value.map((activity) => {
            return {
                id: activity.id,
                title: activity.title,
                startDate: activity.startDateTime,
                classes: [],
            }
        })
    });

    async function fetchActivities() {
        const response = await api.get('/activities');
        const data = response.data;
        activities.value = data.map((activity: any): Activity => {
            return {
                id: activity._id,
                title: activity.title,
                disciplineId: activity.disciplineId,
                startDateTime: new Date(activity.startDateTime),
                endDateTime: new Date(activity.endDateTime)
            }
        });
    }

    function getActivity(id: string): Activity | undefined {
        return activities.value.find(activity => activity.id === id);
    }

    async function addActivity(title: string, disciplineId: string, startDateTime: Date, endDateTime: Date, duration: number){
        const response = await api.post('/activities', {
            title,
            disciplineId,
            startDateTime,
            endDateTime,
            duration
        });
        activities.value.push({
            id: response.data.id,
            title: response.data.title,
            disciplineId: response.data.disciplineId,
            startDateTime: new Date(response.data.startDateTime),
            endDateTime: new Date(response.data.endDateTime)
        })
    }

    async function updateActivity(id: string, title: string, disciplineId: string, startDateTime: Date, endDateTime: Date, duration: number) {
        const response = await api.patch(`/activities/${id}`, {
            title,
            disciplineId,
            startDateTime,
            endDateTime,
            duration
        });
        const updatedActivity: Activity = {
            id,
            title: response.data.title,
            disciplineId: response.data.disciplineId,
            startDateTime: new Date(response.data.startDateTime),
            endDateTime: new Date(response.data.endDateTime)
        };
        const activityIndex = activities.value.findIndex(activity => activity.id === id);
        if(activityIndex !== -1){
            activities.value[activityIndex] = updatedActivity;
        }
    }

    function updateActivityTime(id: string, newStartDateTime: Date){
        activities.value = activities.value.map((activity) => {
            if(activity.id != id) {
                return activity
            }
            return {
                ...activity,
                startDateTime: newStartDateTime
            }
        })
    }

    async function deleteActivity(id: string) {
        const response = await api.delete(`/activities/${id}`);
        activities.value = activities.value.filter((activity) => activity.id != response.data.activityId);
    }

    return { activities, calendarActivities, fetchActivities, getActivity, addActivity, updateActivity, updateActivityTime, deleteActivity}
})