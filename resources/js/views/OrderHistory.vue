<script>
import { onMounted } from 'vue';
import { useOrderStore } from '../store/orderStore.js';
import { useUserStore } from '../store/userStore.js';

export default {
    name: 'OrderHistory',
    setup() {
        const orderStore = useOrderStore();
        const userStore = useUserStore();

        onMounted(() => {
            if (userStore.isAuthenticated) {
                orderStore.getOrders();
            }
        });

        return { orderStore };
    }
};
</script>

<template>
    <div class="container mx-auto py-8">
        <h1 class="text-4xl font-bold mb-8 text-center">Order History</h1>
        <router-link class="text-blue-500 underline" to="/products">< Return to products</router-link>
        <div v-if="orderStore.loading" class="text-center">Loading...</div>
        <div v-if="orderStore.errorMessage" class="text-red-500 text-center mb-4">{{ orderStore.errorMessage }}</div>
        <div v-if="orderStore.orders.length === 0 && !orderStore.loading" class="text-center">
            No orders found.
        </div>
        <div v-else class="mt-4">
            <div v-for="order in orderStore.orders" :key="order.id" class="border p-4 rounded-lg mb-4">
                <h2 class="text-xl font-bold mb-2">Order #{{ order.id }}</h2>
                <p>Total Amount: ${{ order.total_price }}</p>
                <p>Date: {{ new Date(order.created_at).toLocaleString() }}</p>
                <div>
                    <h3 class="font-bold mt-2">Items:</h3>
                    <ul>
                        <li v-for="item in JSON.parse(order.details)" :key="item.id">
                            {{ item.name }} - x{{ item.quantity }} (${{ item.price * item.quantity }})
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
