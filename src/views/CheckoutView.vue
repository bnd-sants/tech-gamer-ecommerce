<template>
  <main class="checkout-page">
    <div class="checkout-inner">
      <div class="checkout-intro">
        <router-link to="/cart" class="back-link"><v-icon size="17">mdi-arrow-left</v-icon> Voltar ao carrinho</router-link>
        <p class="eyebrow">NÚCLEO / DEMONSTRAÇÃO</p>
        <h1>Seu setup está quase pronto.</h1>
        <p>Revise a seleção e veja como seria a confirmação de um pedido. Esta etapa é uma simulação para portfólio: não há compra, cobrança ou reserva de estoque.</p>
      </div>

      <div class="checkout-grid">
        <section class="checkout-main">
          <div class="checkout-panel">
            <div class="panel-heading"><span>01</span><h2>Entrega</h2></div>
            <p class="section-copy">O frete e o prazo não são simulados. Nenhum endereço pessoal é solicitado nesta demonstração.</p>
            <router-link to="/entrega">Como funciona esta prévia</router-link>
          </div>

          <div class="checkout-panel">
            <div class="panel-heading"><span>02</span><h2>Pagamento</h2></div>
            <div class="payment-note">
              <v-icon size="24" color="primary">mdi-shield-outline</v-icon>
              <div>
                <strong>Sem pagamento</strong>
                <p>A simulação termina na confirmação visual. Não informe dados de cartão: não existe cobrança nem integração de pagamento.</p>
              </div>
            </div>
          </div>
        </section>

        <aside class="checkout-summary">
          <p class="eyebrow">03 / REVISÃO</p>
          <h2>Resumo da simulação</h2>
          <div v-if="cartStore.cart.items.length" class="summary-items">
            <div v-for="item in cartStore.cart.items" :key="item.id" class="summary-item">
              <img :src="item.images?.[0]" :alt="item.name" />
              <div><strong>{{ item.name }}</strong><small>Quantidade {{ item.quantity }}</small></div>
              <span>{{ money(item.price * item.quantity) }}</span>
            </div>
          </div>
          <p v-else class="empty-cart">Seu carrinho está vazio. <router-link to="/products">Explorar produtos</router-link></p>
          <div class="summary-line"><span>Subtotal</span><strong>{{ money(cartStore.cart.subtotal) }}</strong></div>
          <div class="summary-line"><span>Frete</span><strong>A definir</strong></div>
          <div class="summary-total"><span>Subtotal ilustrativo</span><strong>{{ money(cartStore.cart.subtotal) }}</strong></div>
          <v-btn color="primary" block size="large" :disabled="!cartStore.cart.items.length || submitting" :loading="submitting" class="mt-6" @click="completeDemo">Concluir demonstração</v-btn>
          <p v-if="error" class="summary-footnote" role="alert">{{ error }}</p>
          <p class="summary-footnote">Será salvo apenas um registro fictício dos itens neste navegador. Nenhuma compra será realizada.</p>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useDemoOrdersStore } from '@/stores/demoOrders';

const cartStore = useCartStore();
const demoOrders = useDemoOrdersStore();
const router = useRouter();
const submitting = ref(false);
const error = ref('');
const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
async function completeDemo() {
  submitting.value = true;
  error.value = '';
  try {
    const order = demoOrders.create(cartStore.cart.items);
    await cartStore.clearCart();
    await router.push({ name: 'demo-order', params: { id: order.id } });
  } catch {
    error.value = 'Não foi possível concluir a simulação neste navegador.';
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.checkout-page{background:#f7f6f2;color:#1a1d1c;min-height:80vh;padding:54px 24px 110px}
.checkout-inner{max-width:1240px;margin:auto}
.checkout-intro{max-width:750px;margin-bottom:45px}.back-link{color:#46504e;text-decoration:none;font-size:.87rem;display:inline-flex;align-items:center;gap:7px;margin-bottom:44px}.back-link:hover{color:#0c38c5}
.eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.18em;color:#0c38c5;margin-bottom:15px}.checkout-intro h1{font-size:clamp(2.45rem,5vw,4.5rem);line-height:1.04;letter-spacing:-.055em;font-weight:600;margin-bottom:18px}.checkout-intro>p:last-child{font-size:1.03rem;line-height:1.6;color:#606661}
.checkout-grid{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(310px,1fr);gap:26px;align-items:start}.checkout-main{display:grid;gap:24px}.checkout-panel,.checkout-summary{background:#fff;border:1px solid #e5e5df;border-radius:4px;padding:32px}.panel-heading{display:flex;align-items:baseline;gap:16px;border-bottom:1px solid #eaeae6;padding-bottom:20px;margin-bottom:18px}.panel-heading span{font-size:.75rem;font-weight:800;color:#0c38c5}.panel-heading h2,.checkout-summary h2{font-size:1.65rem;letter-spacing:-.035em;font-weight:600}.section-copy{font-size:.88rem;color:#6c726d;line-height:1.55}.payment-note{display:flex;gap:17px;background:#f4f6fa;border:1px solid #e2e8f3;padding:20px}.payment-note strong{display:block;margin-bottom:6px}.payment-note p{color:#5c6570;font-size:.9rem;line-height:1.5}.checkout-panel :deep(.v-field){background:#fafaf8!important;border-radius:2px!important}.checkout-panel :deep(.v-field__input){color:#1a1d1c!important}.checkout-panel :deep(.v-label){color:#5a625d!important}
.checkout-summary{position:sticky;top:104px}.checkout-summary h2{margin-bottom:25px}.summary-items{border-top:1px solid #eaeae6;border-bottom:1px solid #eaeae6;margin-bottom:21px}.summary-item{display:grid;grid-template-columns:56px minmax(0,1fr) auto;align-items:center;gap:12px;padding:15px 0;border-bottom:1px solid #efefea;font-size:.83rem}.summary-item:last-child{border:0}.summary-item img{width:56px;height:56px;object-fit:contain;background:#f6f6f2}.summary-item strong{font-weight:600;display:block;line-height:1.3}.summary-item small{color:#858b86;display:block;margin-top:4px}.summary-item>span{font-weight:600;white-space:nowrap}.summary-line,.summary-total{display:flex;justify-content:space-between;gap:16px;padding:8px 0;font-size:.88rem}.summary-line span{color:#6a716b}.summary-total{border-top:1px solid #dedfdb;margin-top:15px;padding-top:19px;font-size:1rem}.summary-total strong{font-size:1.3rem;color:#0c38c5}.summary-footnote{font-size:.75rem;color:#7b817c;line-height:1.5;margin-top:14px;text-align:center}.empty-cart{padding:25px 0;color:#6a716b}.empty-cart a{color:#0c38c5}
@media(max-width:800px){.checkout-page{padding:30px 16px 70px}.checkout-grid{grid-template-columns:1fr}.checkout-summary{position:static}.checkout-panel,.checkout-summary{padding:22px}.back-link{margin-bottom:30px}}
</style>
