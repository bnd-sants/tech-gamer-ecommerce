<template>
  <AccountShell title="Cada detalhe." description="Informações do pedido, produtos e entrega em um só lugar." section-label="ACOMPANHAMENTO" :section-title="order ? `Pedido #${order.id}` : 'Detalhe do pedido'" heading-id="order-detail-title">
    <router-link to="/account/orders" class="back-link"><v-icon size="17">mdi-arrow-left</v-icon> Voltar aos pedidos</router-link>
    <div v-if="loading" class="state" role="status">Consultando pedido…</div>
    <div v-else-if="!order" class="state" role="alert"><v-icon size="32">mdi-alert-circle-outline</v-icon><h3>Pedido indisponível.</h3><p>{{ loadError }}</p><button type="button" @click="loadOrderDetails">Tentar novamente</button></div>
    <template v-else>
      <div class="summary-strip"><div><span class="label">STATUS</span><strong>{{ order.status }}</strong></div><div><span class="label">DATA</span><strong>{{ formatDate(order.createdAt) }}</strong></div><div><span class="label">TOTAL</span><strong>{{ formatCurrency(order.total) }}</strong></div></div>
      <div v-if="order.trackingCode" class="tracking"><span class="label">RASTREAMENTO</span><strong>{{ order.trackingCode }}</strong><a v-if="order.trackingUrl" :href="order.trackingUrl" target="_blank" rel="noopener noreferrer">Consultar entrega <v-icon size="15">mdi-arrow-up-right</v-icon></a></div>
      <div class="detail-grid">
        <section class="detail-box"><span class="label">ENTREGA</span><h3>Endereço informado</h3><p>{{ order.shippingAddress.street }}, {{ order.shippingAddress.number }}<br>{{ order.shippingAddress.complement ? `${order.shippingAddress.complement} · ` : '' }}{{ order.shippingAddress.neighborhood }}<br>{{ order.shippingAddress.city }} · {{ order.shippingAddress.state }}<br>CEP {{ order.shippingAddress.zipCode }}</p></section>
        <section class="detail-box"><span class="label">PAGAMENTO</span><h3>Forma registrada</h3><p>{{ paymentName(order.paymentMethod.type) }}<template v-if="order.paymentMethod.installments"><br>{{ order.paymentMethod.installments }} parcelas</template><template v-if="order.paymentMethod.cardLastFour"><br>Cartão final {{ order.paymentMethod.cardLastFour }}</template></p></section>
      </div>
      <section class="items-section"><span class="label">COMPONENTES</span><h3>Itens do pedido</h3><div v-for="item in order.items" :key="item.id" class="item"><img :src="item.product.image" :alt="item.product.name"><div><strong>{{ item.product.name }}</strong><small>Quantidade: {{ item.quantity }}</small></div><span>{{ formatCurrency(item.price * item.quantity) }}</span></div></section>
      <div class="totals"><div><span>Subtotal</span><strong>{{ formatCurrency(order.subtotal) }}</strong></div><div v-if="order.discount > 0"><span>Desconto</span><strong>− {{ formatCurrency(order.discount) }}</strong></div><div><span>Frete</span><strong>{{ order.shipping === 0 ? 'Grátis' : formatCurrency(order.shipping) }}</strong></div><div class="total"><span>Total</span><strong>{{ formatCurrency(order.total) }}</strong></div></div>
    </template>
  </AccountShell>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { Order } from '@/types';
import services from '@/services/api';
import AccountShell from '@/components/layout/AccountShell.vue';

const route = useRoute();
const order = ref<Order | null>(null);
const loading = ref(true);
const loadError = ref('');
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Não informada' : date.toLocaleDateString('pt-BR'); }
function paymentName(type: string) { return ({ credit_card: 'Cartão de crédito', pix: 'Pix', bank_slip: 'Boleto bancário' } as Record<string, string>)[type] || type; }

async function loadOrderDetails() {
  const id = String(route.params.id || '');
  if (!id) { loading.value = false; loadError.value = 'O identificador do pedido não foi informado.'; return; }
  loading.value = true;
  loadError.value = '';
  try {
    order.value = await services.orders.getOrderById(id);
  } catch {
    order.value = null;
    loadError.value = 'Não foi possível consultar este pedido nesta prévia.';
  } finally {
    loading.value = false;
  }
}
onMounted(loadOrderDetails);
watch(() => route.params.id, loadOrderDetails);
</script>

<style scoped>
.back-link{display:inline-flex;align-items:center;gap:8px;color:#0c38c5;text-decoration:none;font-size:12px;font-weight:700;margin-bottom:25px}.state{padding:50px 24px;text-align:center;background:#fafaf8;border:1px solid #e8eae4;color:#646c65}.state>.v-icon{color:#0c38c5}.state h3{font-size:25px;letter-spacing:-.04em;color:#1b1e1c;margin:16px 0 8px}.state p{font-size:14px;line-height:1.6}.state button{margin-top:22px;border:0;border-bottom:1px solid currentColor;padding:0 0 6px;color:#0c38c5;background:none;font:inherit;font-size:13px;font-weight:700;cursor:pointer}.label{font-size:10px;letter-spacing:.16em;font-weight:800;color:#7a817b}.summary-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;background:#f0f2f7;padding:19px 23px}.summary-strip div{display:grid;gap:5px}.summary-strip strong{font-size:14px}.tracking{display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding:20px 0;border-bottom:1px solid #e6e8e1}.tracking strong{font-size:13px}.tracking a{display:inline-flex;align-items:center;gap:4px;color:#0c38c5;text-decoration:none;font-size:12px;font-weight:700;margin-left:auto}.detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:24px 0}.detail-box{border:1px solid #e5e6df;padding:25px;min-width:0}.detail-box h3,.items-section h3{font-size:19px;letter-spacing:-.035em;margin:11px 0}.detail-box p{color:#626a63;font-size:13px;line-height:1.8}.items-section{margin-top:28px}.item{display:flex;align-items:center;gap:15px;border-bottom:1px solid #e5e6df;padding:14px 0}.item img{width:60px;height:60px;object-fit:cover;background:#f0eee9}.item>div{min-width:0;flex:1;display:grid;gap:5px}.item strong{font-size:13px}.item small{color:#7a817b;font-size:11px}.item>span{font-size:13px;font-weight:700;white-space:nowrap}.totals{max-width:320px;margin:30px 0 0 auto}.totals div{display:flex;justify-content:space-between;gap:15px;padding:9px 0;font-size:13px;color:#69716a}.totals strong{color:#1b1e1c}.totals .total{border-top:1px solid #dfe2db;margin-top:8px;padding-top:16px;font-size:16px;font-weight:700;color:#1b1e1c}.totals .total strong{color:#0c38c5}@media(max-width:600px){.summary-strip{grid-template-columns:repeat(2,1fr)}.detail-grid{grid-template-columns:1fr}.item{flex-wrap:wrap}.item>span{margin-left:75px}}
</style>
