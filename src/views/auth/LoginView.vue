<template>
  <v-card class="tech-card pa-8 rounded-xl">
    <div class="text-center mb-6">
      <h2 class="text-h5 font-weight-black text-white">Entrar na Conta</h2>
      <p class="text-caption text-grey-lighten-1 mt-1">Projeto de portfólio: explore as contas de demonstração sem informar dados pessoais</p>
    </div>

    <v-alert type="info" variant="tonal" density="compact" class="mb-5">O formulário de acesso conectado requer a API opcional. Para conhecer a experiência, use uma conta de demonstração abaixo.</v-alert>

    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleLogin">
      <!-- Alerts -->
      <v-alert
        v-if="authStore.error"
        type="error"
        variant="tonal"
        density="compact"
        class="mb-6 rounded-lg"
        closable
      >
        {{ authStore.error }}
      </v-alert>

      <!-- Email -->
      <v-text-field
        v-model="email"
        label="E-mail"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-email-outline"
        :rules="[rules.required, rules.email]"
        color="secondary"
        class="mb-4"
      ></v-text-field>

      <!-- Password -->
      <v-text-field
        v-model="password"
        label="Senha"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        :rules="[rules.required, rules.minLength]"
        color="secondary"
        class="mb-2"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>

      <div class="d-flex justify-end mb-6">
        <router-link to="/auth/forgot-password" class="text-caption text-secondary text-decoration-none">
          Esqueceu a senha?
        </router-link>
      </div>

      <!-- Submit button -->
      <v-btn
        type="submit"
        block
        size="large"
        :loading="authStore.loading"
        class="font-weight-black mb-4 btn-buy-primary"
      >
        ENTRAR
      </v-btn>

      <v-btn
        block
        color="secondary"
        size="large"
        variant="outlined"
        class="font-weight-bold mb-3 rounded-lg"
        @click="handleSimulateCustomer"
      >
        <v-icon start size="18" class="mr-1">mdi-account-outline</v-icon>
        Explorar conta de cliente
      </v-btn>

      <!-- Local admin preview -->
      <v-btn
        block
        color="secondary"
        size="large"
        variant="outlined"
        :loading="authStore.loading"
        class="font-weight-bold mb-6 rounded-lg"
        @click="handleSimulateAdmin"
      >
        <v-icon start size="18" class="mr-1">mdi-shield-account-outline</v-icon>
        Explorar painel de demonstração
      </v-btn>

      <div class="text-center text-caption text-grey-lighten-1">
        Não possui uma conta?
        <router-link to="/auth/register" class="text-secondary font-weight-bold text-decoration-none ml-1">
          Cadastre-se
        </router-link>
      </div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const cartStore = useCartStore();

const form = ref<any>(null);
const valid = ref(true);
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const rules = {
  required: (value: any) => !!value || 'Campo obrigatório.',
  email: (value: any) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Formato de e-mail inválido.';
  },
  minLength: (value: any) => (value && value.length >= 6) || 'A senha deve conter no mínimo 6 caracteres.',
};

async function handleLogin() {
  const formValidation = await form.value?.validate();
  if (!formValidation?.valid) return;

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });

    // Sincroniza o carrinho local de visitante com o banco
    await cartStore.syncLocalCart();
    await cartStore.loadCart();

    const redirectPath = (route.query.redirect as string) || '/';
    router.push(redirectPath);
  } catch (err) {
    console.error('Falha ao autenticar:', err);
  }
}

async function handleSimulateAdmin() {
  try {
    await authStore.simulateAdminLogin();
    await cartStore.syncLocalCart();
    await cartStore.loadCart();

    const redirectPath = (route.query.redirect as string) || '/admin';
    router.push(redirectPath);
  } catch (err) {
    console.error('Falha ao simular login de admin:', err);
  }
}

async function handleSimulateCustomer() {
  await authStore.simulateCustomerLogin();
  await cartStore.loadCart();
  router.push('/account/profile');
}
</script>

<style scoped>
</style>
