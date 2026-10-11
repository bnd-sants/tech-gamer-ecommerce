<template>
  <main class="admin-orders">
    <div class="intro"><span class="eyebrow">OPERAÇÃO / PEDIDOS</span><h1>Visão da operação.</h1><p>Explore a apresentação de pedidos e simulações. Nenhuma ação aqui altera pagamentos ou envios.</p></div>
    <div v-if="isDemo"><div class="notice"><v-icon size="25">mdi-information-outline</v-icon><div><strong>Registros de demonstração deste navegador.</strong><p>Os itens abaixo não representam compras. Nenhum pagamento ou envio foi realizado.</p></div></div><div v-if="!demoOrders.orders.length" class="state"><h2>Nenhuma simulação ainda.</h2><p>Conclua uma demonstração no checkout para visualizar a lista.</p></div><div v-else class="order-list demo-list"><router-link v-for="order in demoOrders.orders" :key="order.id" :to="`/demo-orders/${order.id}`" class="order-row"><div><span class="label">SIMULAÇÃO</span><strong>#{{ order.id.slice(0, 8).toUpperCase() }}</strong></div><div><span class="label">DATA</span><strong>{{ formatDate(order.createdAt) }}</strong></div><div><span class="label">ITENS</span><strong>{{ order.items.length }}</strong></div><div><span class="label">STATUS</span><strong>Demonstração</strong></div><div><span class="label">SUBTOTAL</span><strong>{{ formatCurrency(order.subtotal) }}</strong></div></router-link></div></div>
    <template v-else>
      <div class="toolbar"><label>Buscar pedido<input v-model.trim="search" type="search" placeholder="Número do pedido" /></label><label>Status<select v-model="statusFilter"><option value="all">Todos</option><option value="pending">Pendente</option><option value="paid">Pago</option><option value="shipped">Enviado</option><option value="delivered">Entregue</option><option value="cancelled">Cancelado</option></select></label><button type="button" @click="loadOrders"><v-icon size="17">mdi-refresh</v-icon> Atualizar</button></div>
      <div v-if="loading" class="state" role="status">Consultando pedidos…</div>
      <div v-else-if="loadError" class="state" role="alert"><v-icon size="30">mdi-alert-circle-outline</v-icon><h2>Consulta indisponível.</h2><p>{{ loadError }}</p><button type="button" @click="loadOrders">Tentar novamente</button></div>
      <div v-else-if="filteredOrders.length === 0" class="state"><v-icon size="30">mdi-package-variant-closed</v-icon><h2>Nenhum pedido encontrado.</h2><p>{{ orders.length ? 'Ajuste a busca ou o filtro de status.' : 'Não há pedidos registrados para esta conta.' }}</p></div>
      <div v-else class="order-list"><article v-for="order in filteredOrders" :key="order.id" class="order-row"><div><span class="label">PEDIDO</span><strong>#{{ order.id }}</strong></div><div><span class="label">DATA</span><strong>{{ formatDate(order.createdAt) }}</strong></div><div><span class="label">ITENS</span><strong>{{ order.items.length }}</strong></div><div><span class="label">STATUS</span><strong>{{ statusName(order.status) }}</strong></div><div><span class="label">TOTAL</span><strong>{{ formatCurrency(order.total) }}</strong></div></article></div>
      <p class="read-only">Consulta somente de leitura. Alterações de pagamento, despacho e cancelamento dependem de um fluxo operacional integrado.</p>
    </template>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import services from '@/services/api';
import { useAuthStore } from '@/stores/auth';
import { useDemoOrdersStore } from '@/stores/demoOrders';
import type { Order } from '@/types';

type OrderSummary = Pick<Order, 'id' | 'status' | 'total' | 'createdAt' | 'items'>;
const authStore = useAuthStore();
const demoOrders = useDemoOrdersStore();
const isDemo = computed(() => authStore.token === 'mock-admin-token-xyz');
const orders = ref<OrderSummary[]>([]);
const loading = ref(false);
const loadError = ref('');
const search = ref('');
const statusFilter = ref('all');
const filteredOrders = computed(() => orders.value.filter((order) => order.id.toLowerCase().includes(search.value.toLowerCase()) && (statusFilter.value === 'all' || order.status === statusFilter.value)));
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Não informada' : date.toLocaleDateString('pt-BR'); }
function statusName(value: string) { return ({ pending: 'Pendente', paid: 'Pago', shipped: 'Enviado', delivered: 'Entregue', cancelled: 'Cancelado' } as Record<string, string>)[value] || value; }
async function loadOrders() {
  if (isDemo.value) return;
  loading.value = true;
  loadError.value = '';
  try { const data = await services.orders.getOrders(); orders.value = data.orders; }
  catch { orders.value = []; loadError.value = 'Não foi possível obter a fila de pedidos do servidor.'; }
  finally { loading.value = false; }
}
onMounted(loadOrders);
</script>

<style scoped>
.admin-orders{color:#1b1e1c}.eyebrow,.label{font-size:10px;letter-spacing:.19em;font-weight:800;color:#0c38c5}.intro{margin-bottom:37px}.intro h1{font-size:clamp(36px,4vw,56px);line-height:1.08;letter-spacing:-.06em;margin:13px 0}.intro p{max-width:680px;color:#69716a;font-size:14px;line-height:1.7}.notice{display:flex;align-items:start;gap:18px;background:#fff;border:1px solid #dfe4ef;padding:30px;max-width:760px;margin-bottom:18px}.notice>.v-icon{color:#0c38c5;flex:none}.notice strong{font-size:17px}.notice p{color:#69716a;font-size:13px;line-height:1.65;margin-top:9px}.toolbar{display:flex;align-items:end;gap:12px;flex-wrap:wrap;background:#fff;border:1px solid #e4e5de;padding:20px;margin-bottom:18px}.toolbar label{display:grid;gap:8px;font-size:11px;font-weight:800;color:#555e56;min-width:180px}.toolbar input,.toolbar select{height:42px;border:1px solid #d7dbd4;background:#fafaf8;padding:0 12px;color:#1b1e1c;font:inherit;font-size:13px}.toolbar button,.state button{height:42px;display:inline-flex;align-items:center;gap:8px;padding:0 15px;background:#0c38c5;border:0;color:white;font:inherit;font-size:12px;font-weight:700;cursor:pointer}.state{background:#fff;border:1px solid #e4e5de;padding:55px 30px;text-align:center;color:#68716a}.state>.v-icon{color:#0c38c5}.state h2{color:#1b1e1c;font-size:24px;letter-spacing:-.04em;margin:13px 0 8px}.state p{font-size:13px}.state button{margin-top:22px}.order-list{display:grid;gap:10px}.order-row{display:grid;grid-template-columns:1.2fr 1fr .6fr 1fr 1fr;gap:20px;align-items:center;background:#fff;border:1px solid #e4e5de;padding:21px}.demo-list a{color:inherit;text-decoration:none}.demo-list a:hover{border-color:#0c38c5}.order-row div{display:grid;gap:5px;min-width:0}.order-row strong{font-size:13px;overflow-wrap:anywhere}.read-only{font-size:11px;color:#7b827c;margin-top:20px;line-height:1.55}@media(max-width:850px){.order-row{grid-template-columns:repeat(3,1fr)}}@media(max-width:540px){.order-row{grid-template-columns:repeat(2,1fr);gap:18px}.toolbar label{width:100%}}
</style>
