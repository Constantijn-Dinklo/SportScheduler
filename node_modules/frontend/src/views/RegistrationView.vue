<script setup lang="ts">
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/auth';


    const authStore = useAuthStore();

    const loginEmail = ref('')

    const name = ref('')
    const email = ref('')

    function login() {
        authStore.login(loginEmail.value);
    }
    
    function signup() {
        authStore.signup(name.value, email.value);
    }

    function getProfile() {
        authStore.getProfile();
    }

</script>

<template>
    <div>
        <div>
            Login
        </div>
        <div>Username: <input v-model="loginEmail" placeholder="email"/></div>
        <div><button @click="login">Login</button></div>
    </div>
    <div>
        <div>Sign up</div>
        <div>Name: <input v-model="name" placeholder="name"/></div>
        <div>Email: <input v-model="email" type="email" placeholder="email"/></div>
        <div><button @click="signup">Sign Up</button></div>
    </div>
    <div>
        <div>Get Profile</div>
        <div><button @click="getProfile">Get profile</button></div>
    </div>
</template>