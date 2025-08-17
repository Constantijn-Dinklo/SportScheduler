<script setup lang="ts">
    import { ref } from 'vue';

    import type { ICalendarItem } from 'vue-simple-calendar';
    import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar';
    import "../../node_modules/vue-simple-calendar/dist/vue-simple-calendar.css"

    import "../../node_modules/vue-simple-calendar/dist/css/default.css"

    const showDate = ref(new Date())
    function setShowDate(d: Date) {
        showDate.value = d;
    }

    const items = ref<ICalendarItem[]>([
        {
            id: "1",
            startDate: new Date(),
            title: "Test Item"
        }
    ])

    function addItem(){
        const newItem: ICalendarItem = {
            id: "2",
            startDate: new Date(2025, 7, 20, 14, 30),
            title: "Added Item"
        }

        items.value.push(newItem)
    }

</script>

<template>
    <div class="action-header">
        <button class="btn-primary add-button" @click="addItem">+</button>
    </div>
    <div class="vue-calendar">
        <CalendarView :items="items" :enable-drag-drop="true" :show-times="true" :starting-day-of-week="1" :show-date="showDate" class="theme-default">
            <template #header=" { headerProps }">
                <CalendarViewHeader :header-props="headerProps" @input="setShowDate"></CalendarViewHeader>
            </template>
        </CalendarView>
    </div>
</template>

<style lang="css" scoped>
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
</style>