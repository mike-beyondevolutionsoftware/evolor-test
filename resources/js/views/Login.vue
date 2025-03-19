<script>
import { ref } from 'vue';
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';

export default {
    name: 'Login',
    setup() {
        const router = useRouter();
        const userStore = useUserStore();

        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');

        const login = async () => {
            errorMessage.value = '';

            try {
                await userStore.login({
                    email: email.value,
                    password: password.value
                });

                router.push('/products');
            } catch (error) {
                errorMessage.value = error.message || 'An unexpected error occurred. Please try again.';
            }
        };

        return { email, password, login, errorMessage };
    }
};
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen text-center gap-6">
        <h1 class="text-3xl font-bold mb-4">Login</h1>
        <div class="flex flex-col gap-4 w-100">
            <input
                v-model="email"
                placeholder="Email"
                class="p-3 border border-gray-300 rounded-lg"
                required
            />
            <input
                v-model="password"
                placeholder="Password"
                type="password"
                class="p-3 border border-gray-300 rounded-lg"
                required
            />
            <button
                @click="login"
                class="p-3 bg-blue-500 text-white rounded-lg cursor-pointer"
            >
                Login
            </button>

            <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
        </div>
        <p>Don't have an account?
            <router-link class="text-blue-500 underline" to="/register">Sign up here</router-link>
        </p>
    </div>
</template>
