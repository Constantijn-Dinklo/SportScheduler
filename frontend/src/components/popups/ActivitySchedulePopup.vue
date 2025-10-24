<script setup lang="ts">
    import { formatDateString, formatTimeString, toDatetimeLocalString } from '@/helpers/date-helper';
    import { useActivityStore } from '@/stores/activity';
    import { useDisciplineStore } from '@/stores/discipline';
    import { onMounted, ref, watch } from 'vue';

    const titleInputRef = ref<HTMLInputElement | null>(null)

    const activityStore = useActivityStore();
    const disciplineStore = useDisciplineStore();

    const props = defineProps<{
        modelValue: boolean;
        selectedActivityId: string;
        selectedDate: Date;
    }>()

    const emit = defineEmits<{
        (e: "update:modelValue", value: boolean): void
    }>()
    
    const editing = ref(false);

    const newItem = ref({
        title: '',
        discipline: '',
        startDate: '',
        endDate: '',
        duration: 60
    })

    onMounted(() => {
        disciplineStore.fetchDisciplines();
    })

    watch(
        titleInputRef,
        () => {
            titleInputRef.value?.focus()
        }
    )

    watch(
        [() => props.selectedDate],
        ([selectedDate]) => {
            if(!props.modelValue) return;

            resetPopupValues();

            const startTime = '12:00';
            const [hours, minutes] = startTime.split(":").map(Number);
            selectedDate.setHours(hours, minutes, 0, 0);

            const endDate = new Date(selectedDate);
            endDate.setMinutes(endDate.getMinutes() + newItem.value.duration);

            newItem.value.startDate = toDatetimeLocalString(selectedDate);
            newItem.value.endDate = toDatetimeLocalString(endDate);
        }
    )

    watch(
        () => props.selectedActivityId,
        (activityId) => {
            const activity = activityStore.getActivity(activityId);
            if(!activity) { return; }

            editing.value = true;

            newItem.value = {
                title: activity.title,
                discipline: activity.disciplineId,
                startDate: toDatetimeLocalString(activity.startDate),
                endDate: toDatetimeLocalString(activity.endDate),
                duration: 60
            }
        }
    )


    function addItem(){
        const startDate = new Date(newItem.value.startDate);
        const endDate = new Date(newItem.value.endDate); 
        activityStore.addActivity(newItem.value.title, newItem.value.discipline, startDate, endDate, newItem.value.duration);
        emit("update:modelValue", false);
        resetPopupValues();
    }

    function updateItem() {
        const startDate = new Date(newItem.value.startDate);
        const endDate = new Date(newItem.value.endDate); 
        activityStore.updateActivity(props.selectedActivityId, newItem.value.title, newItem.value.discipline, startDate, endDate, newItem.value.duration);
        emit("update:modelValue", false);
        resetPopupValues();
    }

    function deleteItem() {
        activityStore.deleteActivity(props.selectedActivityId);
        close();
    }

    function close(){
        emit("update:modelValue", false);
        resetPopupValues();
    }

    function resetPopupValues(){
        editing.value = false;

        newItem.value = {
            title: '',
            discipline: '',
            startDate: '',
            endDate: '',
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
                    <option 
                        v-for="discipline in disciplineStore.disciplines" 
                        :key="discipline.id" 
                        :value="discipline.id">
                        {{ discipline.name }}
                    </option>
                </select>
            </div>
            <div class="row">
                Start Time:
                <input v-model="newItem.startDate" type="datetime-local" />
            </div>
            <div class="row">
                End Time:
                <input v-model="newItem.endDate" type="datetime-local"/>
            </div>
            <div v-if="!editing">
                <button class="btn-primary" @click="addItem">Add Item</button>
            </div>
            <div v-else>
                <button class="btn-primary" @click="updateItem">Update Item</button>
                <button class="btn-primary" @click="deleteItem">Delete Item</button>
            </div>
            
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