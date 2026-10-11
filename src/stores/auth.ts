import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, LoginCredentials, RegisterData } from '@/types';
import services from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(
    localStorage.getItem('@techgamer:user')
      ? JSON.parse(localStorage.getItem('@techgamer:user')!)
      : null
  );
  const token = ref<string | null>(localStorage.getItem('@techgamer:token'));
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'admin');
  const isDemo = computed(() => token.value === 'mock-admin-token-xyz' || token.value === 'mock-customer-token-xyz');

  async function login(credentials: LoginCredentials) {
    loading.value = true;
    error.value = null;
    try {
      const data = await services.auth.login(credentials);
      user.value = data.user;
      token.value = data.token;

      localStorage.setItem('@techgamer:token', data.token);
      localStorage.setItem('@techgamer:refreshToken', data.refreshToken);
      localStorage.setItem('@techgamer:user', JSON.stringify(data.user));
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Falha ao realizar login. Tente novamente.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function register(registerData: RegisterData) {
    loading.value = true;
    error.value = null;
    try {
      const data = await services.auth.register(registerData);
      user.value = data.user;
      token.value = data.token;

      localStorage.setItem('@techgamer:token', data.token);
      localStorage.setItem('@techgamer:refreshToken', data.refreshToken);
      localStorage.setItem('@techgamer:user', JSON.stringify(data.user));
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Falha ao cadastrar. Verifique as informações.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    try {
      if (!isDemo.value) await services.auth.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      user.value = null;
      token.value = null;
      localStorage.removeItem('@techgamer:token');
      localStorage.removeItem('@techgamer:refreshToken');
      localStorage.removeItem('@techgamer:user');
      loading.value = false;
    }
  }

  async function updateProfile(data: Partial<User>) {
    loading.value = true;
    error.value = null;
    try {
      const updatedUser = await services.auth.updateProfile(data);
      user.value = updatedUser;
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Falha ao atualizar dados.';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function checkAuth() {
    if (!token.value) return;
    try {
      if (isDemo.value) return;
      const updatedUser = await services.auth.getMe();
      user.value = updatedUser;
      localStorage.setItem('@techgamer:user', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Falha de validação da sessão:', err);
      logout();
    }
  }

  async function simulateAdminLogin() {
    loading.value = true;
    error.value = null;
    try {
      const mockAdmin: User = {
        id: 'admin-999',
        name: 'Administrador de demonstração',
        email: 'admin@nucleo.demo',
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      user.value = mockAdmin;
      token.value = 'mock-admin-token-xyz';

      localStorage.setItem('@techgamer:token', 'mock-admin-token-xyz');
      localStorage.setItem('@techgamer:refreshToken', 'mock-admin-refresh-token-xyz');
      localStorage.setItem('@techgamer:user', JSON.stringify(mockAdmin));
    } catch (err: any) {
      error.value = 'Falha ao simular login de admin.';
    } finally {
      loading.value = false;
    }
  }

  async function simulateCustomerLogin() {
    const mockCustomer: User = {
      id: 'customer-demo',
      name: 'Cliente de demonstração',
      email: 'cliente@nucleo.demo',
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    user.value = mockCustomer;
    token.value = 'mock-customer-token-xyz';
    error.value = null;
    localStorage.setItem('@techgamer:token', token.value);
    localStorage.removeItem('@techgamer:refreshToken');
    localStorage.setItem('@techgamer:user', JSON.stringify(mockCustomer));
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isDemo,
    login,
    register,
    logout,
    updateProfile,
    checkAuth,
    simulateAdminLogin,
    simulateCustomerLogin,
  };
});
