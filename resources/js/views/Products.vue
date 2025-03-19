<script>
import { onMounted } from 'vue';
import { useProductStore } from '../store/productStore';
import { useUserStore } from '../store/userStore.js';
import { useCartStore } from '../store/cartStore';
import { useRouter } from 'vue-router';

export default {
    name: 'Products',
    setup() {
        const productStore = useProductStore();
        const userStore = useUserStore();
        const cartStore = useCartStore();
        const router = useRouter();

        const addToCart = (product) => {
            alert(`Product "${product.name}" added to cart!`);
        };

        const logout = async () => {
            await userStore.logout();
            router('/');
        };

        const goToCheckout = () => {
            if (cartStore.items.length > 0) {
                router.push('/checkout');
            } else {
                alert("Your cart is empty. Please add products.");
            }
        };

        const goToOrderHistory = () => {
            router.push('/orders');
        };

        onMounted(() => {
            if (userStore.isAuthenticated) {
                productStore.getProducts();
            }
        });

        return { productStore, cartStore, addToCart, goToCheckout, goToOrderHistory, logout };
    }
};
</script>

<template>
    <div class="container mx-auto py-8">
        <div class="flex justify-end items-center gap-6 mb-6">
            <div class="text-xl font-bold">
                <span>Cart Items: </span>
                <span class="text-blue-500">{{ cartStore.ItemsCount }}</span>
            </div>
            <button
                @click="goToCheckout"
                class="cursor-pointer bg-green-500 text-white py-1 px-3 rounded-lg"
            >
                Checkout
            </button>
            <button
                @click="goToOrderHistory"
                class="cursor-pointer bg-blue-500 text-white py-1 px-3 rounded-lg"
            >
                Order History
            </button>
            <button
                @click="logout"
                class="cursor-pointer bg-red-500 text-white py-1 px-3 rounded-lg"
            >
                Logout
            </button>
        </div>
        <h1 class="text-4xl font-bold mb-8 text-center">Available Products</h1>
        <div v-if="productStore.errorMessage" class="text-red-500 mb-4">{{ productStore.errorMessage }}</div>
        <div v-if="productStore.loading" class="text-center">Loading...</div>
        <p
            v-if="productStore?.products?.length === 0"
            class="text-center"
        >
            No Products Available
        </p>
        <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
                v-for="product in productStore.products"
                :key="product.id"
                class="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
                <h2 class="text-xl font-bold mb-2">{{ product.name }}</h2>
                <p class="mb-2">{{ product.description }}</p>
                <p class="font-bold mb-2">${{ product.price }}</p>
                <button
                    @click="cartStore.addToCart(product)"
                    class="cursor-pointer bg-blue-500 text-white py-1 px-3 rounded-lg"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>
