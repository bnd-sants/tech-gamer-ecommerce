<template>
  <AccountShell title="Seu histórico." description="Reveja as escolhas feitas durante a experiência NÚCLEO." section-label="ACOMPANHAMENTO" :section-title="isDemo ? 'Simulações' : 'Meus pedidos'" heading-id="orders-title">
    <template v-if="isDemo">
      <p class="panel-copy">Estas simulações ficam somente neste navegador. Nenhuma representa uma compra.</p>
      <div v-if="!demoOrders.orders.length" class="state"><v-icon size="32">mdi-package-variant-closed</v-icon><h3>Nenhuma simulação por enquanto.</h3><p>Escolha componentes e conclua uma demonstração sem pagamento.</p><router-link to="/products">Explorar catálogo <v-icon size="17">mdi-arrow-up-right</v-icon></router-link></div>
      <div v-else class="order-list"><article v-for="order in demoOrders.orders" :key="order.id" class="order-item"><div class="order-heading"><div><span class="label">SIMULAÇÃO</span><h3>#{{ order.id.slice(0, 8).toUpperCase() }}</h3></div><span class="status-chip">Demonstração</span></div><div class="order-meta"><div><span class="label">DATA</span><strong>{{ formatDate(order.createdAt) }}</strong></div><div><span class="label">ITENS</span><strong>{{ order.items.length }}</strong></div><div><span class="label">SUBTOTAL ILUSTRATIVO</span><strong>{{ formatCurrency(order.subtotal) }}</strong></div></div><router-link :to="`/demo-orders/${order.id}`">Ver detalhes <v-icon size="17">mdi-arrow-up-right</v-icon></router-link></article></div>
    </template>
    <template v-else>
    <p class="panel-copy">Pedidos comerciais aparecerão aqui se a API estiver conectada a uma operação real.</p>
    <div v-if="loading" class="state" role="status">Consultando pedidos…</div>
    <div v-else-if="loadError" class="state" role="alert"><v-icon size="32">mdi-alert-circle-outline</v-icon><h3>Não foi possível consultar agora.</h3><p>{{ loadError }}</p><button type="button" @click="loadOrders">Tentar novamente</button></div>
    <div v-else-if="orders.length === 0" class="state"><v-icon size="32">mdi-package-variant-closed</v-icon><h3>Nenhum pedido por enquanto.</h3><p>Esta prévia ainda não aceita pagamentos ou cria pedidos.</p><router-link to="/products">Explorar catálogo <v-icon size="17">mdi-arrow-up-right</v-icon></router-link></div>
    <div v-else class="order-list">
      <article v-for="order in orders" :key="order.id" class="order-item">
        <div class="order-heading"><div><span class="label">PEDIDO</span><h3>#{{ order.id }}</h3></div><span class="status-chip">{{ order.status }}</span></div>
        <div class="order-meta"><div><span class="label">DATA</span><strong>{{ formatDate(order.createdAt) }}</strong></div><div><span class="label">ITENS</span><strong>{{ order.items.length }}</strong></div><div><span class="label">TOTAL</span><strong>{{ formatCurrency(order.total) }}</strong></div></div>
        <router-link :to="`/account/orders/${order.id}`">Ver detalhes <v-icon size="17">mdi-arrow-up-right</v-icon></router-link>
      </article>
    </div>
    </template>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import services from '@/services/api';
import type { Order } from '@/types';
import AccountShell from '@/components/layout/AccountShell.vue';
import { useAuthStore } from '@/stores/auth';
import { useDemoOrdersStore } from '@/stores/demoOrders';

const authStore = useAuthStore();
const isDemo = computed(() => authStore.isDemo);
const demoOrders = useDemoOrdersStore();
const orders = ref<Pick<Order, 'id' | 'status' | 'total' | 'createdAt' | 'items'>[]>([]);
const loading = ref(true);
const loadError = ref('');
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Não informada' : date.toLocaleDateString('pt-BR'); }

async function loadOrders() {
  if (isDemo.value) { loading.value = false; return; }
  loading.value = true;
  loadError.value = '';
  try {
    const data = await services.orders.getOrders();
    orders.value = data.orders;
  } catch {
    orders.value = [];
    loadError.value = 'A consulta de pedidos está indisponível nesta prévia.';
  } finally {
    loading.value = false;
  }
}
onMounted(loadOrders);
</script>

<style scoped>
.panel-copy{color:#737a74;font-size:13px;margin:0 0 28px}.state{padding:50px 24px;text-align:center;background:#fafaf8;border:1px solid #e8eae4;color:#646c65}.state>.v-icon{color:#0c38c5}.state h3{font-size:25px;letter-spacing:-.04em;color:#1b1e1c;margin:16px 0 8px}.state p{font-size:14px;line-height:1.6}.state button,.state a,.order-item a{display:inline-flex;align-items:center;gap:10px;color:#0c38c5;background:none;border:0;border-bottom:1px solid currentColor;padding:0 0 6px;font:inherit;font-size:13px;font-weight:700;text-decoration:none;cursor:pointer;margin-top:22px}.order-list{display:grid;gap:14px}.order-item{border:1px solid #e5e6df;padding:24px;background:#fafaf8}.order-heading{display:flex;align-items:start;justify-content:space-between;gap:16px}.label{font-size:10px;letter-spacing:.16em;font-weight:800;color:#7a817b}.order-heading h3{font-size:23px;letter-spacing:-.035em;margin-top:4px}.status-chip{background:#edf1fa;color:#0c38c5;padding:6px 10px;font-size:11px;font-weight:700;text-transform:uppercase}.order-meta{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:25px;padding-top:18px;border-top:1px solid #e3e6df}.order-meta div{display:grid;gap:5px}.order-meta strong{font-size:14px}.order-item a{margin-top:24px}@media(max-width:600px){.order-meta{grid-template-columns:repeat(2,1fr)}}
</style>
