<script>
import { useCartStore } from '../store/cartStore';
import { useRouter } from 'vue-router';
import {ref} from "vue";

export default {
    name: 'Checkout',
    setup() {
        const cartStore = useCartStore();
        const router = useRouter();
        const name = ref('');
        const address = ref('');

        const handleCheckout = async () => {
            if (cartStore.items.length === 0) {
                alert("Your cart is empty. Add products before proceeding.");
                return;
            }

            await cartStore.checkout({
                name: name.value,
                address: address.value
            });

            if (!cartStore.errorMessage) {
                router.push('/orders');
            }
        };

        return { name, address, cartStore, handleCheckout };
    }
};
</script>

<template>
    <div class="container mx-auto p-8">
        <h1 class="text-4xl font-bold mb-8 text-center">Checkout</h1>
        <div v-if="cartStore.loading" class="text-center">Loading...</div>
        <div v-if="cartStore.errorMessage" class="text-red-500 mb-4">{{ cartStore.errorMessage }}</div>
        <div v-if="cartStore.items.length === 0" class="text-center text-red-500">
            Your cart is empty.
        </div>

        <div
            v-else
            v-for="item in cartStore.items" :key="item.id" class="border-b py-2"
        >
            <div class="flex justify-between">
                <span>{{ item.name }} (x{{ item.quantity }})</span>
                <span>$ {{ item.price * item.quantity }}</span>
            </div>
        </div>

        <div class="mt-4 font-bold">Total: $ {{ cartStore.totalPrice.toFixed(2) }}</div>
        <div>
            <div v-if="cartStore.items.length > 0" class="flex flex-col gap-4">
                <p>Please fill in details below:</p>
                <input
                    v-model="name"
                    placeholder="Name"
                    class="p-3 border border-gray-300 rounded-lg"
                    required
                />
                <input
                    v-model="address"
                    placeholder="Address"
                    class="p-3 border border-gray-300 rounded-lg"
                    required
                />
                <button
                    @click="handleCheckout"
                    class="cursor-pointer mt-4 mb-4 p-3 bg-blue-500 text-white rounded-lg"
                >
                    Confirm Purchase
                </button>
            </div>
            <router-link class="text-blue-500 underline" to="/products">< Return to products</router-link>
        </div>
    </div>
</template>
