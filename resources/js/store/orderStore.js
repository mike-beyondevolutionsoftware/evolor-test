import { defineStore } from 'pinia';
import apiClient from '../api';

export const useOrderStore = defineStore('orderStore', {
    state: () => ({
        orders: [],
        loading: false,
        errorMessage: '',
    }),
    actions: {
        async getOrders() {
            this.loading = true;
            this.errorMessage = '';

            try {
                const response = await apiClient.get('/orders');
                this.orders = response.data;
            } catch (error) {
                this.errorMessage = error.response?.data?.error || 'An unexpected error occured. Please try again.';
            } finally {
                this.loading = false;
            }
        }
    }
});
