import api from "@/helpers/axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

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
        activities.value = data.map((activity: any) => {
            return {
                id: activity._id,
                title: activity.title,
                disciplineId: activity.disciplineId,
                startDate: new Date(activity.startTime),
                endDate: new Date(activity.endTime)
            }
        });
    }

    function getActivity(id: string): Activity | undefined {
        return activities.value.find(activity => activity.id === id);
    }

    async function addActivity(title: string, disciplineId: string, startDate: Date, endDate: Date, duration: number){
        const response = await api.post('/activities', {
            title,
            disciplineId,
            startDate,
            endDate,
            duration
        });
        activities.value.push({
            id: response.data.id,
            title: response.data.title,
            disciplineId: response.data.disciplineId,
            startDate: new Date(response.data.startDate),
            endDate: new Date(response.data.endDate)
        })
    }

    async function updateActivity(id: string, title: string, disciplineId: string, startDate: Date, endDate: Date, duration: number) {
        const response = await api.patch(`/activities/${id}`, {
            title,
            disciplineId,
            startDate,
            endDate,
            duration
        });
        const updatedActivity = {
            id,
            title: response.data.title,
            disciplineId: response.data.disciplineId,
            startDate: new Date(response.data.startDate),
            endDate: new Date(response.data.endDate)
        };
        const activityIndex = activities.value.findIndex(activity => activity.id === id);
        if(activityIndex !== 1){
            activities.value[activityIndex] = updatedActivity;
        }
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

    async function deleteActivity(id: string) {
        const response = await api.delete(`/activities/${id}`);
        activities.value = activities.value.filter((activity) => activity.id != response.data.activityId);
    }

    return { activities, calendarActivities, fetchActivities, getActivity, addActivity, updateActivity, updateActivityTime, deleteActivity}
})