import api from "@/helpers/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

interface Auth {
    name: string;
    isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', () => {
    const auth = ref<Auth>({
        name: '',
        isAuthenticated: false
    });

    async function signup(name: string, email: string) {
        try{
            const res = await api.post('/auth/signup', {name: name, email: email});
            auth.value.name = res.data.name;
            auth.value.isAuthenticated = true;
        } catch (err: any) {
            console.log(err);
        }
    }

    async function login(email: string) {
        const res = await api.post('/auth/login', {username: email});
        auth.value.name = res.data.name;
        auth.value.isAuthenticated = true;
    }

    async function logout() {
        const res = await api.post('/auth/logout');
        auth.value.name =  '';
        auth.value.isAuthenticated = false;
    }

    function isAuthenticated() {
        return auth.value.isAuthenticated;
    }

    function getUserName() {
        return auth.value.name;
    }

    async function getProfile() {
        const res = await api.get('/auth/profile');
        auth.value.isAuthenticated = true;
        auth.value.name = res.data.userName;
    }

    return { auth, signup, login, logout, isAuthenticated, getUserName, getProfile };
})