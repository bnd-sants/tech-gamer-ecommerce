<template>
  <main class="admin-catalog">
    <div class="intro"><span class="eyebrow">OPERAÇÃO / CATÁLOGO</span><h1>A seleção em detalhe.</h1><p>Explore as peças cadastradas e confira como aparecem na vitrine. A edição e o estoque persistido serão ligados ao servidor numa etapa futura.</p></div>
    <div class="source-note"><v-icon size="20">mdi-information-outline</v-icon><span>{{ isDemo ? 'Catálogo demonstrativo: imagens, preços e disponibilidade são ilustrativos.' : 'Catálogo consultado do servidor. Alterações estão indisponíveis nesta interface.' }}</span></div>
    <div class="toolbar"><label>Buscar componente<input v-model.trim="search" type="search" placeholder="Nome, marca ou SKU" /></label><label>Categoria<select v-model="categoryFilter"><option value="all">Todas</option><option v-for="category in categories" :key="category" :value="category">{{ category }}</option></select></label><span class="result-count">{{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'peça' : 'peças' }}</span></div>
    <div v-if="loading" class="state" role="status">Consultando catálogo…</div>
    <div v-else-if="loadError" class="state" role="alert"><v-icon size="30">mdi-alert-circle-outline</v-icon><h2>Catálogo indisponível.</h2><p>{{ loadError }}</p><button type="button" @click="loadProducts">Tentar novamente</button></div>
    <div v-else-if="filteredProducts.length === 0" class="state"><v-icon size="30">mdi-magnify</v-icon><h2>Nenhuma peça encontrada.</h2><p>Ajuste a busca ou a categoria selecionada.</p></div>
    <div v-else class="product-list"><article v-for="product in filteredProducts" :key="product.id" class="product-row"><img :src="product.images[0]" :alt="product.name" loading="lazy" /><div class="product-info"><span class="label">{{ product.category }} / {{ product.brand }}</span><h2>{{ product.name }}</h2><small>SKU {{ product.sku || 'não informado' }}</small></div><div class="price"><span class="label">{{ isDemo ? 'PREÇO DEMONSTRATIVO' : 'PREÇO CADASTRADO' }}</span><strong>{{ formatCurrency(product.price) }}</strong></div><router-link :to="`/products/${product.id}`" :aria-label="`Ver ${product.name} na vitrine`">Ver na vitrine <v-icon size="17">mdi-arrow-up-right</v-icon></router-link></article></div>
    <p class="read-only">Este painel está em modo de consulta. A API possui rotas administrativas de catálogo, mas a publicação comercial de preços e estoque exige validação operacional antes de ativar a edição aqui.</p>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import services from '@/services/api';
import { mockProducts } from '@/data/mockProducts';
import { useAuthStore } from '@/stores/auth';
import type { Product } from '@/types';

const authStore = useAuthStore();
const isDemo = computed(() => authStore.token === 'mock-admin-token-xyz');
const products = ref<Product[]>([]);
const loading = ref(false);
const loadError = ref('');
const search = ref('');
const categoryFilter = ref('all');
const categories = computed(() => [...new Set(products.value.map((product) => product.category))].sort());
const filteredProducts = computed(() => products.value.filter((product) => {
  const term = search.value.toLocaleLowerCase('pt-BR');
  const matches = [product.name, product.brand, product.sku].some((value) => value.toLocaleLowerCase('pt-BR').includes(term));
  return matches && (categoryFilter.value === 'all' || product.category === categoryFilter.value);
}));
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
async function loadProducts() {
  loadError.value = '';
  if (isDemo.value) { products.value = [...mockProducts]; return; }
  loading.value = true;
  try { const data = await services.products.getProducts({ limit: 50 }); products.value = data.products; }
  catch { products.value = []; loadError.value = 'Não foi possível obter produtos do servidor.'; }
  finally { loading.value = false; }
}
onMounted(loadProducts);
</script>

<style scoped>
.admin-catalog{color:#1b1e1c}.eyebrow,.label{font-size:10px;letter-spacing:.19em;font-weight:800;color:#0c38c5}.intro{margin-bottom:32px}.intro h1{font-size:clamp(36px,4vw,56px);line-height:1.08;letter-spacing:-.06em;margin:13px 0}.intro p{max-width:680px;color:#69716a;font-size:14px;line-height:1.7}.source-note{display:flex;align-items:center;gap:11px;background:#e9edf7;color:#304778;padding:14px 18px;font-size:12px;line-height:1.5}.source-note>.v-icon{flex:none}.toolbar{display:flex;align-items:end;gap:12px;flex-wrap:wrap;background:#fff;border:1px solid #e4e5de;padding:20px;margin:18px 0}.toolbar label{display:grid;gap:8px;font-size:11px;font-weight:800;color:#555e56;min-width:180px}.toolbar label:first-child{flex:1;min-width:220px}.toolbar input,.toolbar select{height:42px;width:100%;border:1px solid #d7dbd4;background:#fafaf8;padding:0 12px;color:#1b1e1c;font:inherit;font-size:13px}.result-count{font-size:12px;color:#69716a;padding:0 4px 11px}.state{background:#fff;border:1px solid #e4e5de;padding:55px 30px;text-align:center;color:#68716a}.state>.v-icon{color:#0c38c5}.state h2{color:#1b1e1c;font-size:24px;letter-spacing:-.04em;margin:13px 0 8px}.state p{font-size:13px}.state button{margin-top:22px;background:#0c38c5;color:#fff;border:0;padding:12px 16px;font:inherit;font-size:12px;font-weight:700;cursor:pointer}.product-list{display:grid;gap:10px}.product-row{display:grid;grid-template-columns:80px minmax(0,1.7fr) minmax(130px,.8fr) auto;align-items:center;gap:22px;background:#fff;border:1px solid #e4e5de;padding:14px 20px}.product-row img{width:80px;height:80px;object-fit:cover;background:#e9e5de}.product-info{min-width:0}.product-info h2{font-size:15px;letter-spacing:-.025em;line-height:1.35;margin:6px 0}.product-info small{font-size:11px;color:#818882}.price{display:grid;gap:7px}.price strong{font-size:16px;white-space:nowrap}.product-row a{display:inline-flex;align-items:center;gap:8px;color:#0c38c5;text-decoration:none;font-size:12px;font-weight:800;white-space:nowrap}.read-only{font-size:11px;color:#7b827c;margin-top:20px;line-height:1.55}@media(max-width:1100px){.product-row{grid-template-columns:70px minmax(0,1fr) auto}.product-row img{width:70px;height:70px}.price{grid-column:2}.product-row a{grid-column:3;grid-row:1/3}}@media(max-width:620px){.product-row{grid-template-columns:70px minmax(0,1fr);gap:13px}.price{grid-column:2}.product-row a{grid-column:2;grid-row:auto}.toolbar label{width:100%}}
</style>
