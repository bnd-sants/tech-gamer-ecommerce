<template>
  <v-card class="tech-card pa-8 rounded-xl text-center">
    <v-icon size="48" color="primary" class="mb-4">mdi-lock-reset</v-icon>
    <h1 class="text-h5 font-weight-black text-white mb-4">Redefinir senha</h1>
    <v-alert type="info" variant="tonal" class="mb-6 text-left">A redefinição de senha estará disponível quando o serviço de e-mail e a validação de links forem configurados. Nenhuma senha é alterada nesta prévia.</v-alert>
    <v-btn class="btn-buy-primary font-weight-bold" block to="/auth/login">Voltar para o login</v-btn>
  </v-card>
</template>
