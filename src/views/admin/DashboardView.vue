<template>
  <main class="dashboard-page">
    <div class="intro"><span class="eyebrow">VISÃO GERAL / 01</span><h1>O conceito em números.</h1><p>Explore o catálogo e as simulações criadas neste navegador. Estes indicadores não representam vendas.</p></div>
    <div class="status-grid">
      <article><span class="card-index">01 / CATÁLOGO</span><v-icon size="27">mdi-format-list-bulleted</v-icon><strong>{{ mockProducts.length }}</strong><p>produtos na seleção demonstrativa</p><router-link to="/admin/catalog">Ver catálogo <v-icon size="17">mdi-arrow-up-right</v-icon></router-link></article>
      <article><span class="card-index">02 / SIMULAÇÕES</span><v-icon size="27">mdi-package-variant-closed</v-icon><strong>{{ demoOrders.count }}</strong><p>simulações locais, sem compras</p><router-link to="/admin/orders">Ver simulações <v-icon size="17">mdi-arrow-up-right</v-icon></router-link></article>
      <article><span class="card-index">03 / CHECKOUT</span><v-icon size="27">mdi-credit-card-outline</v-icon><strong>Demo</strong><p>conclusão visual sem pagamento ou envio</p><router-link to="/checkout">Ver checkout <v-icon size="17">mdi-arrow-up-right</v-icon></router-link></article>
    </div>
    <section class="next-steps"><div><span class="eyebrow">PONTOS DE EXTENSÃO</span><h2>Se este conceito virar loja.</h2><p>O template pode receber catálogo, estoque, atendimento e logística de uma operação real. A integração de pagamento permanece fora do escopo deste portfólio.</p></div><ol><li><span>01</span> Catálogo e estoque verificados</li><li><span>02</span> Contas e pedidos no servidor</li><li><span>03</span> Frete e acompanhamento</li></ol></section>
    <section class="store-link"><div><span class="eyebrow">A EXPERIÊNCIA DA LOJA</span><h2>Veja o que o cliente vê.</h2></div><router-link to="/">Abrir vitrine <v-icon size="18">mdi-arrow-up-right</v-icon></router-link></section>
  </main>
</template>

<script setup lang="ts">
import { mockProducts } from '@/data/mockProducts';
import { useDemoOrdersStore } from '@/stores/demoOrders';
const demoOrders = useDemoOrdersStore();
</script>

<style scoped>
.dashboard-page{color:#1b1e1c}.eyebrow,.card-index{font-size:10px;letter-spacing:.2em;font-weight:800;color:#0c38c5}.intro{margin-bottom:38px}.intro h1{font-size:clamp(38px,4vw,56px);line-height:1.08;letter-spacing:-.065em;margin:13px 0}.intro p{max-width:650px;color:#69716a;font-size:14px;line-height:1.7}.status-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.status-grid article{display:flex;flex-direction:column;min-height:278px;padding:27px;background:#fff;border:1px solid #e4e5de}.status-grid article>.v-icon{color:#0c38c5;margin:25px 0 17px}.status-grid strong{font-size:clamp(24px,2.8vw,37px);letter-spacing:-.06em;line-height:1.1}.status-grid p{font-size:12px;color:#737b74;margin:8px 0 20px;line-height:1.5}.status-grid a,.store-link a{display:inline-flex;align-items:center;gap:10px;align-self:start;margin-top:auto;color:#0c38c5;font-size:12px;font-weight:800;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:6px}.next-steps{display:grid;grid-template-columns:1.25fr 1fr;gap:45px;background:#eaece8;padding:42px;margin-top:28px}.next-steps h2,.store-link h2{font-size:clamp(27px,3vw,39px);letter-spacing:-.05em;margin:12px 0}.next-steps p{font-size:13px;color:#646c65;line-height:1.7;max-width:500px}.next-steps ol{list-style:none;padding:0;margin:0}.next-steps li{display:flex;gap:16px;border-bottom:1px solid #ced3cb;padding:15px 0;font-size:13px;font-weight:700}.next-steps li span{color:#0c38c5;font-size:10px;letter-spacing:.12em}.store-link{display:flex;align-items:end;justify-content:space-between;gap:25px;border-top:1px solid #dfe2da;margin-top:42px;padding-top:30px}@media(max-width:1050px){.status-grid{grid-template-columns:1fr 1fr}.status-grid article:last-child{grid-column:1/-1}}@media(max-width:660px){.status-grid,.next-steps{grid-template-columns:1fr}.status-grid article:last-child{grid-column:auto}.status-grid article{min-height:235px}.next-steps{padding:28px}.store-link{align-items:start;flex-direction:column}}
</style>
