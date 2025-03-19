<script>
export default {
    name: 'Home'
};
</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen text-center gap-4">
        <h1 class="text-3xl font-bold mb-4">Welcome</h1>
        <div class="flex flex-row gap-4">
            <router-link class="text-blue-500 underline" to="/login">Login</router-link>
            <router-link class="text-blue-500 underline" to="/register">Register</router-link>
        </div>
    </div>
</template>
