<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';


    const authStore = useAuthStore();

    function logout() {
        authStore.logout();
    }

</script>

<template>
    <div v-if="authStore.isAuthenticated()">
        Hello {{ authStore.getUserName() }}!
        <button @click="logout">Logout</button>
    </div>
</template>