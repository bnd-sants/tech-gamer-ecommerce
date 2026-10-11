<template>
  <v-card class="tech-card pa-8 rounded-xl">
    <div class="text-center mb-6">
      <h2 class="text-h5 font-weight-black text-white">Criar Conta</h2>
      <p class="text-caption text-grey-lighten-1 mt-1">Cadastro conectado à API opcional do template</p>
    </div>

    <v-alert type="info" variant="tonal" density="compact" class="mb-5">Esta é uma experiência de portfólio. Se quiser apenas explorar, volte ao login e escolha a conta demonstrativa, sem informar seus dados.</v-alert>

    <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleRegister">
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

      <!-- Name -->
      <v-text-field
        v-model="name"
        label="Nome Completo"
        variant="outlined"
        density="comfortable"
        prepend-inner-icon="mdi-account-outline"
        :rules="[rules.required]"
        color="secondary"
        class="mb-4"
      ></v-text-field>

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
        class="mb-6"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>

      <!-- Submit button -->
      <v-btn
        type="submit"
        block
        size="large"
        :loading="authStore.loading"
        class="font-weight-black mb-6 btn-buy-primary"
      >
        CRIAR CONTA
      </v-btn>

      <div class="text-center text-caption text-grey-lighten-1">
        Já possui uma conta?
        <router-link to="/auth/login" class="text-secondary font-weight-bold text-decoration-none ml-1">
          Iniciar Sessão
        </router-link>
      </div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const form = ref<any>(null);
const valid = ref(true);
const name = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const rules = {
  required: (value: any) => !!value || 'Campo obrigatório.',
  email: (value: any) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Formato de e-mail inválido.';
  },
  minLength: (value: any) => (value && value.length >= 12) || 'A senha deve conter no mínimo 12 caracteres.',
};

async function handleRegister() {
  const formValidation = await form.value?.validate();
  if (!formValidation?.valid) return;

  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    // Sincroniza o carrinho local de visitante com o banco
    await cartStore.syncLocalCart();
    await cartStore.loadCart();

    router.push('/');
  } catch (err) {
    console.error('Falha ao cadastrar:', err);
  }
}
</script>

<style scoped>
</style>
