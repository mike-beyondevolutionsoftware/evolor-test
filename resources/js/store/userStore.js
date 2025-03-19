import { defineStore } from 'pinia';
import apiClient from '../api';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async register(credentials) {
            this.loading = true;

            try {
                const response = await apiClient.post('/register', credentials);

                if (response.status === 201) {
                    this.user = response.data;
                    this.token = this.user.token;

                    localStorage.setItem('token', this.token);

                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.errors;
                    const errorMessage = Object.values(errors).flat().join('\n');
                    throw new Error(errorMessage);
                } else {
                    throw new Error('Registration failed. Please try again.');
                }
            } finally {
                this.loading = false;
            }
        },
        async login(credentials) {
            this.loading = true;

            try {
                const response = await apiClient.post('/login', credentials);

                if (response.status === 201) {
                    this.user = response.data;
                    this.token = response.data.token;

                    localStorage.setItem('token', this.token);

                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    throw new Error(error.response?.data?.error || 'Invalid credentials');
                } else {
                    throw new Error('An unexpected error occurred. Please try again.');
                }
            } finally {
                this.loading = false;
            }
        },
        async getUser() {
            this.loading = true;
            this.error = null;

            if (!this.token) {
                this.loading = false;
                this.error = null;
                return;
            }

            try {
                const response = await apiClient.get('/user');

                if (response.status === 201) {
                    this.user = response.data;
                    this.token = this.user.token;

                    localStorage.setItem('token', this.token);

                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                }
            } catch (error) {
                throw new Error(error.response?.data?.error || 'An unexpected error occured. Please try again.');
            } finally {
                this.loading = false;
            }
        },
        async logout() {
            try {
                await apiClient.post('/logout');
                this.user = null;
                this.token = null;
                localStorage.removeItem('token');
            } catch (error) {
                alert('Failed to logout:', error);
            } finally {
                this.loading = false;
            }
        },
    },
});
