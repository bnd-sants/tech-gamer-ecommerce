<template>
  <main class="not-found">
    <div class="not-found-inner">
      <p class="eyebrow">NÚCLEO / CAMINHO NÃO ENCONTRADO</p>
      <div class="error-number" aria-hidden="true">404<span>.</span></div>
      <div class="error-copy">
        <h1>Esta peça não está aqui.</h1>
        <p>O endereço pode ter mudado ou o produto ainda não faz parte desta seleção. Volte ao início ou encontre outro componente no catálogo.</p>
        <div class="actions"><router-link to="/">Voltar ao início <v-icon size="18">mdi-arrow-up-right</v-icon></router-link><router-link to="/products">Explorar catálogo <v-icon size="18">mdi-arrow-up-right</v-icon></router-link></div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.not-found{min-height:76vh;background:#f7f5f1;color:#171717;padding:85px 28px 110px}.not-found-inner{max-width:1240px;margin:auto}.eyebrow{font-size:10px;font-weight:800;letter-spacing:.25em;color:#0c38c5}.error-number{font-size:clamp(150px,27vw,390px);font-weight:800;letter-spacing:-.11em;line-height:.93;margin:26px 0 0;border-bottom:1px solid #d9d5cc}.error-number span{color:#0c38c5}.error-copy{display:grid;grid-template-columns:1fr 1fr;gap:50px;padding-top:34px}.error-copy h1{font-size:clamp(34px,4vw,58px);line-height:1.08;letter-spacing:-.055em}.error-copy p{font-size:15px;line-height:1.7;color:#6b6861;max-width:470px}.actions{grid-column:2;display:flex;gap:32px;flex-wrap:wrap}.actions a{display:inline-flex;gap:12px;align-items:center;color:#0c38c5;text-decoration:none;font-size:13px;font-weight:700;border-bottom:1px solid currentColor;padding-bottom:7px}@media(max-width:700px){.not-found{padding:65px 20px 90px}.error-copy{grid-template-columns:1fr;gap:16px}.actions{grid-column:auto}.error-number{font-size:clamp(125px,38vw,250px)}}
</style>
