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

</script>

<template>
    <div class="registration-container">
        <div class="login-container">
            <div>
                Login
            </div>
            <div>Username: <input v-model="loginEmail" placeholder="email"/></div>
            <div><button @click="login">Login</button></div>
        </div>
        <div class="signup-container">
            <div>Sign up</div>
            <div>Name: <input v-model="name" placeholder="name"/></div>
            <div>Email: <input v-model="email" type="email" placeholder="email"/></div>
            <div><button @click="signup">Sign Up</button></div>
        </div>
    </div>
    
</template>

<style lang="css">
    .registration-container {
        padding-top: 50px;
        height: 200px;

        display: flex;
        justify-content: space-evenly;

    }

    .login-container {
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: space-around;
    }

    .signup-container {
        display: flex;
        flex-direction: column;

        align-items: center;
        justify-content: space-around;
    }
</style>