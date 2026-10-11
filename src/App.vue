<template>
  <v-app>
    <v-fade-transition hide-on-leave>
      <div v-if="appLoading" class="loading-overlay">
        <div class="loader-container">
          <div class="tech-spinner"></div>
          <div class="loader-text font-weight-bold">CARREGANDO NÚCLEO...</div>
        </div>
      </div>
    </v-fade-transition>

    <router-view v-if="!appLoading" v-slot="{ Component, route }">
      <Transition name="route-shell" mode="out-in">
        <component :is="Component" :key="route.matched[0]?.path || route.path" />
      </Transition>
    </router-view>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const authStore = useAuthStore();
const cartStore = useCartStore();
const appLoading = ref(true);

onMounted(async () => {
  try {
    // Tenta validar o token e recuperar o carrinho
    await authStore.checkAuth();
    await cartStore.loadCart();
  } catch (err) {
    console.error('Falha na inicialização do aplicativo:', err);
  } finally {
    appLoading.value = false;
  }
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f7f5f1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.tech-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #dedbd5;
  border-top-color: #0c38c5;
  border-right-color: #0c38c5;
  border-radius: 50%;
  animation: spin 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.loader-text {
  color: #171717;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  opacity: 0.8;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
</style>
