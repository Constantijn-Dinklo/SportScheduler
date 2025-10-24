<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import type { ICalendarItem } from 'vue-simple-calendar';
    import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
    import "../../../node_modules/vue-simple-calendar/dist/vue-simple-calendar.css"
    import "../../../node_modules/vue-simple-calendar/dist/css/default.css"

    import { useActivityStore } from '@/stores/activity';

    import AddActivityPopup from '@/components/popups/ActivitySchedulePopup.vue';

    const isOpen = ref(false)
    const selectedActivityId = ref('')
    const selectedDate = ref(new Date())
   
    const showDate = ref(new Date())
    function setShowDate(d: Date) {
        showDate.value = d;
    }

    const activityStore = useActivityStore();

    onMounted(() => {
        activityStore.fetchActivities();
    })

    function dateClicked(date: Date, calendarItems: any, windowEvent: any) {
        console.log("Date Clicked");
        isOpen.value = true;
        selectedDate.value = date;
    }

    function itemClicked(calendarItem: ICalendarItem) {
        console.log("Item Clicked");
        isOpen.value = true;
        selectedActivityId.value = calendarItem.id;
    }

    function droppedItemOnDate(calendarItem: ICalendarItem, date: Date){
        const newDate = new Date(
            date.getFullYear(), 
            date.getMonth(), 
            date.getDate(), 
            calendarItem.startDate.getHours(), 
            calendarItem.startDate.getMinutes()
        );

        activityStore.updateActivityTime(calendarItem.id, newDate)
    }

</script>

<template>
    <div class="action-header">
        <button class="btn-primary add-button">+</button>
    </div>
    <div class="vue-calendar">
        <CalendarView
            class="theme-default"
            :starting-day-of-week="1"
            :show-date="showDate"
            :items="activityStore.calendarActivities"
            :enable-drag-drop="true" 
            :show-times="true"
            @click-date="dateClicked"
            @click-item="itemClicked"
            @drop-on-date="droppedItemOnDate"
            >
            <template #header="{ headerProps }">
                <CalendarViewHeader :header-props="headerProps" @input="setShowDate"></CalendarViewHeader>
            </template>
        </CalendarView>
    </div>

    <AddActivityPopup v-model="isOpen" :selected-activity-id="selectedActivityId" :selected-date="selectedDate"></AddActivityPopup>
</template>

<style lang="css">
    .action-header {
        padding: 5px;
        display: flex;
        justify-content: flex-end;
    }
    .add-button {
        height: 40px;
        width: 40px;

        border: none;
        border-radius: 50%;

        font-size: 20px;
    }
    .vue-calendar {
        height: 67vh;
    }

    .red-activity {
        background-color: red
    }
</style>