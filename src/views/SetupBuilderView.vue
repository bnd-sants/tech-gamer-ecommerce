<template>
  <div class="builder-page">
    <section class="builder-hero"><div><span class="eyebrow">NÚCLEO / SETUP STUDIO</span><h1>Projete o conjunto.</h1><p>Escolha as peças da seleção e confira os pontos técnicos que já podem ser avaliados. O que não estiver documentado permanece pendente.</p></div><img src="/showroom/assembly-02.png" alt="Componentes de um computador separados em camadas" /></section>
    <div class="builder-body">
      <div class="builder-intro"><div><span class="eyebrow">01 / ESCOLHA AS PEÇAS</span><h2>Comece pelo núcleo.</h2></div><p>Configuração orientativa com produtos de demonstração. A validação final depende das fichas oficiais e de todos os componentes do projeto.</p></div>
      <div class="builder-grid">
        <div class="builder-main">
          <div class="slot-grid">
            <section v-for="slot in slots" :key="slot.key" class="slot-card">
              <div class="slot-head"><span>{{ slot.number }} / {{ slot.label }}</span><v-icon size="23">{{ slot.icon }}</v-icon></div>
              <label :for="`slot-${slot.key}`">{{ slot.prompt }}</label>
              <select :id="`slot-${slot.key}`" v-model="selection[slot.key]"><option value="">Selecionar peça</option><option v-for="product in slotOptions[slot.key]" :key="product.id" :value="product.id">{{ product.name }}</option></select>
              <template v-if="selectedProduct(slot.key)"><img class="slot-image" :src="selectedProduct(slot.key)?.images[0]" :alt="selectedProduct(slot.key)?.name" /><div class="slot-meta"><strong>{{ money(selectedProduct(slot.key)?.price || 0) }}</strong><router-link :to="`/products/${selectedProduct(slot.key)?.id}`">Ver ficha <v-icon size="15">mdi-arrow-up-right</v-icon></router-link></div></template>
              <p v-else class="slot-empty">{{ slot.empty }}</p>
            </section>
          </div>

          <section class="manual-card" aria-labelledby="manual-title"><span class="eyebrow">02 / DADOS DO SEU PROJETO</span><h2 id="manual-title">Informe o que está fora do catálogo.</h2><p>Use os valores das fichas oficiais da placa-mãe, fonte, GPU e gabinete. Eles não são guardados nem enviados.</p>
            <div class="manual-fields">
              <label>Socket da placa-mãe<select v-model="selection.boardSocket"><option value="">Não informado</option><option value="LGA1700">LGA1700</option><option value="LGA1851">LGA1851</option><option value="AM4">AM4</option><option value="AM5">AM5</option></select></label>
              <label>Memória aceita pela placa-mãe<select v-model="selection.boardMemory"><option value="">Não informado</option><option value="DDR4">DDR4</option><option value="DDR5">DDR5</option></select></label>
              <label>Potência da fonte (W)<input v-model.number="selection.psuWatts" type="number" min="0" step="50" inputmode="numeric" placeholder="Ex.: 850" /></label>
              <label>Comprimento da GPU (mm)<input v-model.number="selection.gpuLengthMm" type="number" min="0" step="1" inputmode="numeric" placeholder="Ficha da GPU" /></label>
              <label>Espaço livre do gabinete (mm)<input v-model.number="selection.caseClearanceMm" type="number" min="0" step="1" inputmode="numeric" placeholder="Ficha do gabinete" /></label>
            </div>
          </section>
        </div>

        <aside class="builder-aside" aria-labelledby="result-title"><div class="result-card"><span class="eyebrow">03 / LEITURA DO CONJUNTO</span><h2 id="result-title">Pontos de atenção</h2><p class="result-lead" aria-live="polite">{{ resultSummary }}</p><div class="check-list"><article v-for="check in checks" :key="check.title" :class="`check-${check.status}`"><v-icon size="20">{{ check.status === 'ok' ? 'mdi-check-circle-outline' : check.status === 'warning' ? 'mdi-alert-circle-outline' : 'mdi-help-circle-outline' }}</v-icon><div><span class="check-status">{{ check.status === 'ok' ? 'Sem conflito neste critério' : check.status === 'warning' ? 'Conflito' : 'Não verificado' }}</span><strong>{{ check.title }}</strong><p>{{ check.detail }}</p></div></article></div><div class="subtotal"><span>{{ selectedProducts.length }} {{ selectedProducts.length === 1 ? 'peça selecionada' : 'peças selecionadas' }}</span><strong>{{ money(subtotal) }}</strong></div><small>Subtotal demonstrativo. Não inclui placa-mãe, fonte, gabinete, frete ou serviço de montagem.</small><button type="button" class="reset-button" @click="resetSelection">Recomeçar configuração</button></div></aside>
      </div>
      <div class="builder-next"><span class="eyebrow">CONTINUE EXPLORANDO</span><h2>Veja cada peça antes de decidir.</h2><router-link to="/products">Explorar catálogo <v-icon size="18">mdi-arrow-right</v-icon></router-link></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '@/types';
import { mockProducts } from '@/data/mockProducts';
import { evaluateSetup, productSlot, type SetupSlot } from '@/data/setupGuide';
import services from '@/services/api';

const route = useRoute();
const products = ref<Product[]>(mockProducts);
const slots: { key: SetupSlot; number: string; label: string; prompt: string; icon: string; empty: string }[] = [
  { key: 'cpu', number: '01', label: 'PROCESSADOR', prompt: 'Qual será o processador?', icon: 'mdi-cpu-64-bit', empty: 'Escolha uma CPU para começar a verificar o socket.' },
  { key: 'gpu', number: '02', label: 'PLACA DE VÍDEO', prompt: 'Qual será a GPU?', icon: 'mdi-expansion-card-variant', empty: 'Escolha uma GPU para conferir fonte e gabinete.' },
  { key: 'memory', number: '03', label: 'MEMÓRIA', prompt: 'Qual memória entrará no conjunto?', icon: 'mdi-memory', empty: 'Escolha a RAM para conferir o tipo de memória.' },
];
const queryId = (key: SetupSlot) => typeof route.query[key] === 'string' ? route.query[key] as string : '';
const selection = reactive({ cpu: queryId('cpu'), gpu: queryId('gpu'), memory: queryId('memory'), boardSocket: '', boardMemory: '', psuWatts: null as number | null, gpuLengthMm: null as number | null, caseClearanceMm: null as number | null });
const slotOptions = computed(() => ({
  cpu: products.value.filter(product => productSlot(product) === 'cpu'),
  gpu: products.value.filter(product => productSlot(product) === 'gpu'),
  memory: products.value.filter(product => productSlot(product) === 'memory'),
}));
function selectedProduct(slot: SetupSlot) { return slotOptions.value[slot].find(product => product.id === selection[slot]) || null; }
const selectedProducts = computed(() => slots.map(slot => selectedProduct(slot.key)).filter((product): product is Product => !!product));
const checks = computed(() => evaluateSetup({ cpu: selectedProduct('cpu'), gpu: selectedProduct('gpu'), memory: selectedProduct('memory'), boardSocket: selection.boardSocket, boardMemory: selection.boardMemory, psuWatts: selection.psuWatts, gpuLengthMm: selection.gpuLengthMm, caseClearanceMm: selection.caseClearanceMm }));
const warningCount = computed(() => checks.value.filter(check => check.status === 'warning').length);
const unknownCount = computed(() => checks.value.filter(check => check.status === 'unknown').length);
const resultSummary = computed(() => {
  const conflicts = warningCount.value ? `${warningCount.value} ${warningCount.value === 1 ? 'conflito encontrado' : 'conflitos encontrados'}.` : 'Nenhum conflito nos dados informados.';
  const pending = unknownCount.value ? `${unknownCount.value} ${unknownCount.value === 1 ? 'verificação pendente' : 'verificações pendentes'}.` : 'Todos os critérios disponíveis foram avaliados.';
  return `${conflicts} ${pending}`;
});
const subtotal = computed(() => selectedProducts.value.reduce((total, product) => total + product.price, 0));
const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
function resetSelection() { selection.cpu = ''; selection.gpu = ''; selection.memory = ''; selection.boardSocket = ''; selection.boardMemory = ''; selection.psuWatts = null; selection.gpuLengthMm = null; selection.caseClearanceMm = null; }
onMounted(async () => { try { products.value = (await services.products.getProducts()).products; } catch { products.value = mockProducts; } });
</script>

<style scoped>
.builder-page{background:#f7f5f1;color:#171717}.eyebrow{font-size:10px;font-weight:700;letter-spacing:.23em;color:#0c38c5}.builder-hero{display:grid;grid-template-columns:1fr 45%;min-height:430px;background:#e9e7e1;overflow:hidden}.builder-hero>div{align-self:center;padding:70px clamp(24px,6vw,100px)}.builder-hero h1{font-size:clamp(45px,5.1vw,75px);letter-spacing:-.065em;line-height:1.05;margin:22px 0}.builder-hero p{max-width:580px;font-size:16px;line-height:1.65;color:#615e59}.builder-hero img{width:100%;height:100%;object-fit:cover}.builder-body{max-width:1450px;margin:auto;padding:80px 48px 110px}.builder-intro{display:flex;align-items:end;justify-content:space-between;gap:35px;margin-bottom:36px}.builder-intro h2,.manual-card h2,.builder-next h2{font-size:clamp(28px,3vw,42px);letter-spacing:-.055em;margin:14px 0 0}.builder-intro p{max-width:430px;font-size:13px;color:#6d6860;line-height:1.6}.builder-grid{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(320px,.8fr);gap:26px;align-items:start}.builder-main{display:grid;gap:24px}.slot-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.slot-card,.manual-card,.result-card{background:#fff;border:1px solid #ddd9d1;padding:22px}.slot-card{min-height:370px;display:flex;flex-direction:column}.slot-head{display:flex;justify-content:space-between;align-items:center;color:#0c38c5;font-size:10px;font-weight:700;letter-spacing:.14em}.slot-card>label{display:block;font-size:16px;font-weight:700;letter-spacing:-.03em;margin:25px 0 10px;min-height:45px}.slot-card select,.manual-fields select,.manual-fields input{width:100%;min-width:0;height:43px;border:1px solid #cfcac1;border-radius:2px;background:#fff;color:#171717;padding:0 10px;font:inherit;font-size:12px}.slot-image{display:block;width:100%;height:135px;object-fit:cover;margin-top:18px;background:#e9e5df}.slot-empty{font-size:12px;line-height:1.5;color:#88827a;margin-top:20px}.slot-meta{margin-top:auto;padding-top:13px;display:grid;gap:5px}.slot-meta strong{font-size:16px}.slot-meta a{font-size:11px;color:#0c38c5;text-decoration:none;font-weight:700}.manual-card{padding:30px}.manual-card h2{font-size:30px}.manual-card>p{font-size:13px;color:#6f6a63;line-height:1.55;margin:12px 0 25px}.manual-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:17px}.manual-fields label{font-size:12px;font-weight:700;display:grid;gap:8px}.result-card{position:sticky;top:96px;padding:28px}.result-card h2{font-size:27px;letter-spacing:-.045em;margin:12px 0}.result-lead{font-size:13px;line-height:1.55;color:#625e58;margin-bottom:23px}.check-list{border-top:1px solid #e7e3dd}.check-list article{display:flex;gap:12px;padding:17px 0;border-bottom:1px solid #e7e3dd}.check-list article>i{flex:none}.check-ok>i{color:#277a56}.check-warning>i{color:#bb522e}.check-unknown>i{color:#8a857c}.check-list strong{display:block;font-size:12px;margin-bottom:4px}.check-list p{font-size:11px;line-height:1.5;color:#6d6860}.subtotal{display:flex;justify-content:space-between;gap:10px;border-top:1px solid #ded9d1;margin-top:20px;padding-top:21px;font-size:12px}.subtotal strong{font-size:19px;color:#0c38c5}.result-card small{display:block;color:#817b73;line-height:1.5;margin-top:10px}.reset-button{background:none;border:0;color:#0c38c5;text-decoration:underline;padding:0;margin-top:25px;font:inherit;font-size:12px;font-weight:700;cursor:pointer}.builder-next{border-top:1px solid #d7d2c9;margin-top:80px;padding-top:35px}.builder-next h2{margin-bottom:22px}.builder-next a{color:#0c38c5;text-decoration:none;font-weight:700;font-size:13px;display:inline-flex;align-items:center;gap:12px}select:focus-visible,input:focus-visible,button:focus-visible,a:focus-visible{outline:2px solid #0c38c5;outline-offset:3px}@media(max-width:1100px){.builder-grid{grid-template-columns:1fr}.result-card{position:static}}@media(max-width:780px){.builder-hero{grid-template-columns:1fr}.builder-hero>div{padding:65px 24px}.builder-hero img{height:280px}.builder-body{padding:60px 20px 85px}.builder-intro{display:block}.slot-grid{grid-template-columns:1fr}.slot-card{min-height:0}.slot-card>label{min-height:0}.slot-image{height:200px}.manual-fields{grid-template-columns:1fr}}
.check-status{display:block;font-size:10px;font-weight:700;letter-spacing:.04em;margin-bottom:3px}.check-ok .check-status{color:#277a56}.check-warning .check-status{color:#bb522e}.check-unknown .check-status{color:#777168}
</style>
