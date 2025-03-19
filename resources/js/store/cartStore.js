import { defineStore } from 'pinia';
import apiClient from '../api';

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        items: [],
        loading: false,
        errorMessage: '',
    }),

    getters: {
        totalPrice(state) {
            return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        ItemsCount: (state) => state.items.reduce((count, item) => count + item.quantity, 0),
    },
    actions: {
        addToCart(product) {
            const existingProduct = this.items.find(item => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }
        },

        removeFromCart(productId) {
            this.items = this.items.filter(item => item.id !== productId);
        },

        async checkout(deliveryDetails) {
            this.loading = true;
            this.errorMessage = '';

            try {
                const response = await apiClient.post('/checkout', {
                    name: deliveryDetails.name,
                    address: deliveryDetails.address,
                    items: this.items
                });

                if (response.status === 201) {
                    this.items = [];
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;
                    this.errorMessage = Object.values(errors).flat().join('\n');
                } else {
                    this.errorMessage = error.response?.data?.error || 'An unexpected error occured. Please try again.';
                }
            } finally {
                this.loading = false;
            }
        }
    }
});
