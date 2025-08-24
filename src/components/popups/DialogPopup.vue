<script setup lang="ts">
    import { ref, watch, defineProps, defineEmits} from "vue"

    const props = defineProps<{
        modelValue: boolean
    }>()

    const emit = defineEmits<{
        (e: "update:modelValue", value: boolean): void
    }>()

    const triggerRef = ref<HTMLButtonElement | null>(null)
    const pos = ref({left: 0, top: 0})

    function toggle() {
        emit("update:modelValue", !props.modelValue);
    }

    function close() {
        emit("update:modelValue", false);
    }

    watch(
        () => props.modelValue, 
        (isOpen) => {
            if(isOpen && triggerRef.value) {
                const rect = triggerRef.value.getBoundingClientRect();
                pos.value = {
                    left: rect.right - 250,
                    top: rect.top
                }
            }
    })

</script>

<template>
    
    <div class="relative inline-block">
        <span ref="triggerRef" @click="toggle">
            <slot name="trigger"></slot>
        </span>
    </div>

    <!-- <dialog 
        v-if="modelValue" 
        open
        :style="{ left: `${pos.left}px`, top: `${pos.top}px`, position: 'absolute'}"
        >
        <slot></slot>
        <button @click="close">Close</button>
    </dialog> -->

    <dialog v-if="modelValue" open>
        <slot></slot>
        <button @click="close">Close</button>
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