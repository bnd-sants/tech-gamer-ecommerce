<template>
  <v-card class="tech-card pa-8 rounded-xl text-center">
    <v-icon size="48" color="primary" class="mb-4">mdi-email-lock-outline</v-icon>
    <h1 class="text-h5 font-weight-black text-white mb-4">Recuperar acesso</h1>
    <v-alert type="info" variant="tonal" class="mb-6 text-left">O envio seguro de links por e-mail ainda não foi configurado. Nenhum link de recuperação pode ser enviado nesta prévia.</v-alert>
    <v-btn class="btn-buy-primary font-weight-bold" block to="/auth/login">Voltar para o login</v-btn>
  </v-card>
</template>
