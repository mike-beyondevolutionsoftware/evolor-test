import { defineStore } from 'pinia';
import apiClient from '../api';

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [],
        loading: false,
        errorMessage: '',
    }),
    actions: {
        async getProducts() {
            this.loading = true;
            this.errorMessage = '';

            try {
                const response = await apiClient.get('/products');
                this.products = response.data;
            } catch (error) {
                this.errorMessage = error.response?.data?.error || 'An unexpected error occured. Please try again.';
            } finally {
                this.loading = false;
            }
        }
    }
});
