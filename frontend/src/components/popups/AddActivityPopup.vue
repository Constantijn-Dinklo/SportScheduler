<script setup lang="ts">
    import { dateFromString, formatDateString, formatTimeString } from '@/helpers/date-helper';
    import { useActivityStore } from '@/stores/activity';
    import { useDisciplineStore } from '@/stores/discipline';
    import { ref, watch } from 'vue';

    const titleInputRef = ref<HTMLInputElement | null>(null)

    const disciplineStore = useDisciplineStore();

    const props = defineProps<{
        modelValue: boolean;
        selectedDate: Date
    }>()

    const emit = defineEmits<{
        (e: "update:modelValue", value: boolean): void
    }>()
    
    const newItem = ref({
        title: '',
        discipline: '',
        startDate: '',
        startTime: '12:00',
        endDate: '',
        endTime: '',
        duration: 60
    })

    watch(
        [() => props.modelValue, () => props.selectedDate],
        ([isOpen, selectedDate]) => {
            if(!isOpen) return;

            const [hours, minutes] = newItem.value.startTime.split(":").map(Number);
            selectedDate.setHours(hours, minutes, 0, 0);

            const startDateString = formatDateString(selectedDate);

            const endDate = dateFromString(startDateString, newItem.value.startTime);
            endDate.setMinutes(endDate.getMinutes() + newItem.value.duration);

            const endDateString = formatDateString(endDate);
            const endTimeString = formatTimeString(endDate);

            newItem.value.startDate = startDateString;
            newItem.value.endDate = endDateString;
            newItem.value.endTime = endTimeString;
        }
    )

    watch(
        titleInputRef,
        () => {
            titleInputRef.value?.focus()
        }
    )

    const activityStore = useActivityStore();

    function addItem(){
        const startDate = dateFromString(newItem.value.startDate, newItem.value.startTime);
        activityStore.addActivity(newItem.value.title, newItem.value.discipline, startDate, newItem.value.duration);
        emit("update:modelValue", false);
        resetNewItem();
    }

    function close(){
        resetNewItem();
        emit("update:modelValue", false);
    }


    function resetNewItem(){
        newItem.value = {
            title: '',
            discipline: '',
            startDate: '',
            startTime: '12:00',
            endDate: '',
            endTime: '',
            duration: 60
        }
    }
</script>

<template>
    <dialog v-if="modelValue" open>
        <div class="model-content">
            <div class="model-header">
                <h2>Add Item</h2>
                <button @click="close" class="close-button">x</button>
            </div>
            <div class="row title-row">
                <input class="title-input" ref="titleInputRef" autofocus v-model="newItem.title" placeholder="Add title" />
            </div>
            <div class="row discipline-row">
                Discipline:
                <select id="discipline" v-model="newItem.discipline">
                    <option disabled value="">-- Please choose --</option>
                    <option v-for="discipline in disciplineStore.disciplines">{{ discipline.name }}</option>
                </select>
            </div>
            <div class="row">
                Start Time:
                <input v-model="newItem.startDate" type="date" />
                <input v-model="newItem.startTime" type="time" />
            </div>
            <div class="row">
                End Time:
                <input v-model="newItem.endDate" type="date"/>
                <input v-model="newItem.endTime" type="time" />
            </div>
            <button class="btn-primary" @click="addItem">Add Item</button>
        </div>
        
    </dialog>
</template>

<style>
    dialog {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        z-index: 9998;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.15);

        width: 400px;
    }

    .model-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .model-header {
        display: flex;
        justify-content: space-between;
    }

    .close-button {
        background: white;
        border: none;

        height: 30px;
        width: 30px;
        border-radius: 50%;
    }

    .close-button:hover {
        background: rgb(241, 241, 241);
    }

    .title-input {
        width: 100%;
        border: none;
    }

</style>