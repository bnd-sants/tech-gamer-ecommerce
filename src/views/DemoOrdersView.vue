<template>
  <main class="demo-orders">
    <div class="demo-inner">
      <span class="eyebrow">NÚCLEO / PORTFÓLIO INTERATIVO</span>
      <template v-if="selected">
        <div class="hero"><v-icon size="37" color="primary">mdi-check-circle-outline</v-icon><p>SIMULAÇÃO CONCLUÍDA</p><h1>Seu projeto, reunido.</h1><span>Este é um registro fictício salvo apenas neste navegador. Nenhum pedido foi enviado, nenhum pagamento foi feito e nenhum produto foi reservado.</span></div>
        <div class="order-head"><div><small>REFERÊNCIA DA DEMONSTRAÇÃO</small><strong>#{{ selected.id.slice(0, 8).toUpperCase() }}</strong></div><div><small>DATA</small><strong>{{ formatDate(selected.createdAt) }}</strong></div><div><small>STATUS</small><strong>Demonstração</strong></div></div>
        <section class="items"><h2>Componentes selecionados</h2><article v-for="item in selected.items" :key="item.productId"><img :src="item.image" :alt="item.name" /><div><strong>{{ item.name }}</strong><span>Quantidade {{ item.quantity }}</span></div><b>{{ money(item.unitPrice * item.quantity) }}</b></article><div class="subtotal"><span>Subtotal ilustrativo</span><strong>{{ money(selected.subtotal) }}</strong></div></section>
        <div class="actions"><router-link to="/products" class="primary">Explorar mais componentes <v-icon size="18">mdi-arrow-right</v-icon></router-link><router-link to="/demo-orders">Ver minhas simulações</router-link></div>
      </template>
      <template v-else-if="route.params.id"><div class="empty"><h1>Simulação não encontrada.</h1><p>Os registros ficam somente no navegador usado para criá-los e podem desaparecer se os dados locais forem apagados.</p><router-link to="/demo-orders">Ver simulações</router-link></div></template>
      <template v-else>
        <h1>Suas simulações.</h1><p class="lead">Projetos concluídos nesta prévia, salvos somente neste navegador. Eles não representam compras.</p>
        <div v-if="!store.orders.length" class="empty"><h2>Nenhuma simulação por aqui.</h2><p>Escolha componentes para percorrer o fluxo da loja.</p><router-link to="/products">Explorar catálogo</router-link></div>
        <div v-else class="order-list"><router-link v-for="order in store.orders" :key="order.id" :to="`/demo-orders/${order.id}`"><div><small>SIMULAÇÃO</small><strong>#{{ order.id.slice(0, 8).toUpperCase() }}</strong></div><div><small>DATA</small><strong>{{ formatDate(order.createdAt) }}</strong></div><div><small>ITENS</small><strong>{{ order.items.reduce((sum, item) => sum + item.quantity, 0) }}</strong></div><div><small>SUBTOTAL ILUSTRATIVO</small><strong>{{ money(order.subtotal) }}</strong></div><v-icon size="20">mdi-arrow-up-right</v-icon></router-link></div>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDemoOrdersStore } from '@/stores/demoOrders';
const route = useRoute();
const store = useDemoOrdersStore();
const selected = computed(() => route.params.id ? store.find(String(route.params.id)) : undefined);
const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const formatDate = (value: string) => new Date(value).toLocaleDateString('pt-BR');
</script>

<style scoped>
.demo-orders{min-height:70vh;background:#f7f5f1;color:#171717;padding:66px 24px 110px}.demo-inner{max-width:1120px;margin:auto}.eyebrow{display:block;color:#0c38c5;font-size:10px;letter-spacing:.24em;font-weight:800;margin-bottom:25px}h1{font-size:clamp(40px,5vw,68px);letter-spacing:-.06em;line-height:1.05;margin:0 0 17px}.lead{color:#656a65;line-height:1.65;max-width:650px}.hero{background:#eaece8;padding:clamp(32px,5vw,65px);max-width:950px}.hero p{font-size:11px;font-weight:800;letter-spacing:.18em;color:#0c38c5;margin:25px 0 12px}.hero span{display:block;line-height:1.65;color:#565d57;max-width:650px}.order-head,.order-list>a{display:grid;grid-template-columns:repeat(3,1fr);gap:25px;border-bottom:1px solid #d8d9d2;padding:27px 0}.order-head div,.order-list>a div{display:grid;gap:8px}small{font-size:10px;letter-spacing:.16em;color:#777d76;font-weight:800}strong{font-size:14px}.items{margin-top:52px}.items h2{font-size:25px;margin-bottom:20px}.items article{display:flex;align-items:center;gap:20px;border-top:1px solid #d8d9d2;padding:17px 0}.items article img{width:76px;height:76px;object-fit:cover;background:#ece8df}.items article div{flex:1;display:grid;gap:6px}.items article span{font-size:12px;color:#737972}.items article b{font-size:14px}.subtotal{border-top:1px solid #d8d9d2;display:flex;justify-content:space-between;padding:24px 0;font-size:15px}.subtotal strong{color:#0c38c5;font-size:20px}.actions{display:flex;align-items:center;gap:25px;flex-wrap:wrap;margin-top:20px}.actions a,.empty a{color:#0c38c5;text-decoration:none;font-size:13px;font-weight:700}.actions a.primary,.empty a{background:#0c38c5;color:#fff;padding:15px 20px;display:inline-flex;align-items:center;gap:15px}.order-list{margin-top:35px;border-top:1px solid #d8d9d2}.order-list>a{grid-template-columns:1.2fr 1fr .6fr 1fr auto;color:#171717;text-decoration:none;align-items:center}.order-list>a:hover{color:#0c38c5}.empty{background:#eeece7;padding:50px;margin-top:40px}.empty h2{font-size:26px}.empty p{color:#626861;line-height:1.6;margin:12px 0 25px}@media(max-width:650px){.demo-orders{padding:45px 20px 75px}.order-head{grid-template-columns:1fr 1fr}.order-list>a{grid-template-columns:1fr 1fr}.order-list>a .v-icon{display:none}.items article{flex-wrap:wrap}.items article b{width:100%;padding-left:96px}}
</style>
