<script>
import { ref } from 'vue';
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';

export default {
    name: 'Register',
    setup() {
        const router = useRouter();
        const userStore = useUserStore();

        const name = ref('');
        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');
        const errorMessage = ref('');


        const register = async () => {
            errorMessage.value = '';

            try {
                await userStore.register({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    password_confirmation: confirmPassword.value,
                });

                router.push('/products');
            } catch (error) {
                errorMessage.value = error.message || 'An unexpected error occurred. Please try again.';
            }
        };

        return { name, email, password, confirmPassword, errorMessage, register };
    }
};
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen text-center gap-6">
        <h1 class="text-3xl font-bold mb-4">Register</h1>
        <div class="flex flex-col gap-4 w-100">
            <input
                v-model="name"
                placeholder="Name"
                class="p-3 border border-gray-300 rounded-lg"
                required
            />
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
            <input
                v-model="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                class="p-3 border border-gray-300 rounded-lg"
                required
            />
            <button
                @click="register"
                class="p-3 bg-blue-500 text-white rounded-lg cursor-pointer"
            >
                Register
            </button>
            <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
        </div>
        <p>Already have an account?
            <router-link class="text-blue-500 underline" to="/login">Login here</router-link>
        </p>
    </div>
</template>
