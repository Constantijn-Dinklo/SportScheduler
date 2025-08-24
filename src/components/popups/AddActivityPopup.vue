<script setup lang="ts">
    import { formatDateLocal } from '@/helpers/date-helper';
    import { useActivityStore } from '@/stores/activity';
    import { ref, watch } from 'vue';

    const titleInputRef = ref<HTMLInputElement | null>(null)

    const props = defineProps<{
        modelValue: boolean;
        selectedDate: Date
    }>()

    const emit = defineEmits<{
        (e: "update:modelValue", value: boolean): void
    }>()
    
    const newItem = ref({
        title: '',
        startDate: '',
    })

    watch(
        [() => props.modelValue, () => props.selectedDate],
        ([isOpen, selectedDate]) => {
            if(!isOpen) return;

            const dateString = formatDateLocal(selectedDate);
            newItem.value.startDate = dateString;
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
        activityStore.addActivity(newItem.value.title, new Date(newItem.value.startDate), 0);
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
            startDate: ''
        }
    }
</script>

<template>
    <dialog v-if="modelValue" open>
        <h2>Add Item</h2><button @click="close">x</button>
        <div>
            Name:
            <input ref="titleInputRef" autofocus v-model="newItem.title" />
        </div>
        <div>
            Start date:
            <input v-model="newItem.startDate" type="date" />
        </div>
        <div>
            End date:
            <input type="date"/>
        </div>
        <button @click="addItem">Add Item</button>
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
    }
</style>