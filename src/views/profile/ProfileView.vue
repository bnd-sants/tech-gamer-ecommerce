<template>
  <AccountShell title="Seu espaço." description="Gerencie seus dados e acompanhe os componentes escolhidos para seu próximo projeto." section-label="DADOS PESSOAIS" section-title="Meu perfil" heading-id="profile-title">
    <p class="panel-copy">Mantenha suas informações atualizadas para uma experiência melhor.</p>
    <v-alert v-if="isDemo" type="info" variant="tonal" class="notice">Você está usando uma conta de demonstração. A edição de dados não está disponível nesta prévia.</v-alert>
    <v-alert v-if="successMsg" type="success" variant="tonal" class="notice">{{ successMsg }}</v-alert>
    <v-alert v-if="authStore.error" type="error" variant="tonal" class="notice">{{ authStore.error }}</v-alert>
    <v-form ref="form" v-model="valid" @submit.prevent="handleUpdate">
      <div class="form-grid">
        <v-text-field v-model="name" label="Nome completo" variant="outlined" density="comfortable" :rules="[rules.required]" :disabled="isDemo" />
        <v-text-field v-model="email" label="E-mail" variant="outlined" density="comfortable" disabled />
      </div>
      <div class="form-footer"><p>O e-mail da conta não pode ser alterado por aqui.</p><v-btn type="submit" color="primary" size="large" :loading="authStore.loading" :disabled="isDemo">Salvar alterações</v-btn></div>
    </v-form>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import AccountShell from '@/components/layout/AccountShell.vue';

const authStore = useAuthStore();
const isDemo = computed(() => authStore.isDemo);
const form = ref<any>(null);
const valid = ref(true);
const name = ref('');
const email = ref('');
const successMsg = ref<string | null>(null);
const rules = { required: (value: string) => !!value.trim() || 'Informe seu nome.' };

onMounted(() => {
  name.value = authStore.user?.name || '';
  email.value = authStore.user?.email || '';
});

async function handleUpdate() {
  if (isDemo.value) return;
  const result = await form.value?.validate();
  if (!result?.valid) return;
  successMsg.value = null;
  try {
    await authStore.updateProfile({ name: name.value.trim() });
    successMsg.value = 'Dados atualizados com sucesso.';
  } catch (error) {
    console.error('Falha ao atualizar perfil', error);
  }
}
</script>

<style scoped>
.panel-copy{color:#737a74;font-size:13px;margin:0 0 30px}.notice{margin-bottom:24px}.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}:deep(.v-field){background:#fafaf8!important;color:#1b1e1c!important;border-radius:2px!important}:deep(.v-field__input){color:#1b1e1c!important}:deep(.v-label){color:#646d66!important}.form-footer{display:flex;justify-content:space-between;align-items:center;gap:20px;border-top:1px solid #e8eae4;padding-top:24px;margin-top:14px}.form-footer p{font-size:12px;color:#828982}.form-footer :deep(.v-btn){border-radius:2px!important;padding:0 25px;box-shadow:none!important}@media(max-width:600px){.form-grid{grid-template-columns:1fr;gap:4px}.form-footer{align-items:stretch;flex-direction:column}.form-footer :deep(.v-btn){width:100%}}
</style>
