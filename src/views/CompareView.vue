<template>
  <div class="compare-page"><div class="compare-inner">
    <div class="compare-heading"><span class="eyebrow">NÚCLEO / COMPARAÇÃO</span><h1>Os detalhes lado a lado.</h1><p>Compare até três peças do catálogo. Campos sem informação aparecem como “Não informado”; categorias diferentes podem ter especificações distintas.</p></div>
    <div class="compare-controls"><label for="add-product">Adicionar produto</label><select id="add-product" v-model="candidateId" :disabled="selectedProducts.length >= 3"><option value="">Selecione uma peça</option><option v-for="product in availableProducts" :key="product.id" :value="product.id">{{ product.name }}</option></select><button type="button" :disabled="!candidateId || selectedProducts.length >= 3" @click="addProduct">Adicionar</button><router-link :to="{ name: 'products', query: selectedIds.length ? { compare: selectedIds.join(',') } : {} }">Voltar ao catálogo</router-link></div>
    <div v-if="!selectedProducts.length" class="compare-empty"><v-icon size="40">mdi-compare-horizontal</v-icon><h2>Escolha as peças que quer analisar.</h2><p>Você pode começar aqui ou marcar produtos no catálogo.</p></div>
    <template v-else>
      <p class="scroll-hint"><v-icon size="16">mdi-gesture-swipe-horizontal</v-icon> Deslize a tabela para ver as outras peças.</p>
      <div class="compare-scroll" role="region" aria-label="Tabela comparativa de produtos" tabindex="0"><div class="compare-table" :style="{ '--columns': selectedProducts.length }">
        <div class="compare-row product-row"><div class="row-label">PRODUTOS</div><article v-for="product in selectedProducts" :key="product.id"><button type="button" class="remove" :aria-label="`Remover ${product.name} da comparação`" @click="removeProduct(product.id)"><v-icon size="17">mdi-close</v-icon></button><img :src="product.images[0]" :alt="product.name" /><span>{{ product.category }} · {{ product.brand }}</span><router-link :to="`/products/${product.id}`">{{ product.name }}</router-link><small>Imagem ilustrativa</small></article></div>
        <div v-for="row in rows" :key="row.label" class="compare-row"><div class="row-label">{{ row.label }}</div><div v-for="product in selectedProducts" :key="product.id">{{ row.value(product) }}</div></div>
      </div></div>
      <p class="compare-note">Preços de demonstração; especificações reproduzidas das fichas cadastradas nesta prévia. Confirme todos os dados na fonte oficial antes de comprar.</p>
    </template>
    <section class="compare-next"><span class="eyebrow">PRÓXIMO PASSO</span><h2>Veja como as peças trabalham juntas.</h2><router-link to="/build">Abrir montador de setup <v-icon size="18">mdi-arrow-right</v-icon></router-link></section>
  </div></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Product } from '@/types';
import { mockProducts } from '@/data/mockProducts';
import services from '@/services/api';
const route = useRoute();
const router = useRouter();
const products = ref<Product[]>(mockProducts);
const candidateId = ref('');
const selectedIds = ref<string[]>([]);
function idsFromQuery(value: unknown) { return typeof value === 'string' ? [...new Set(value.split(',').filter(Boolean))].slice(0, 3) : []; }
watch(() => route.query.ids, value => { selectedIds.value = idsFromQuery(value); }, { immediate: true });
const selectedProducts = computed(() => selectedIds.value.map(id => products.value.find(product => product.id === id)).filter((product): product is Product => !!product));
const availableProducts = computed(() => products.value.filter(product => !selectedIds.value.includes(product.id)));
function updateIds(ids: string[]) { router.replace({ name: 'compare', query: ids.length ? { ids: ids.join(',') } : {} }); }
function addProduct() { if (candidateId.value && selectedIds.value.length < 3) { updateIds([...selectedIds.value, candidateId.value]); candidateId.value = ''; } }
function removeProduct(id: string) { updateIds(selectedIds.value.filter(item => item !== id)); }
const money = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
const rows = computed(() => {
  const base = [
    { label: 'Preço demonstrativo', value: (product: Product) => money(product.price) },
    { label: 'Categoria', value: (product: Product) => product.category },
    { label: 'Marca', value: (product: Product) => product.brand },
    { label: 'Disponibilidade', value: (product: Product) => product.inStock ? 'No catálogo' : 'Indisponível' },
  ];
  const keys = [...new Set(selectedProducts.value.flatMap(product => Object.keys(product.specifications)))];
  return [...base, ...keys.map(label => ({ label, value: (product: Product) => product.specifications[label] || 'Não informado' }))];
});
onMounted(async () => { try { products.value = (await services.products.getProducts()).products; } catch { products.value = mockProducts; } });
</script>

<style scoped>
.compare-page{background:#f7f5f1;color:#171717;min-height:80vh}.compare-inner{max-width:1450px;margin:auto;padding:75px 48px 110px}.eyebrow{font-size:10px;font-weight:700;letter-spacing:.25em;color:#0c38c5}.compare-heading{max-width:800px}.compare-heading h1{font-size:clamp(44px,5vw,72px);letter-spacing:-.065em;line-height:1.05;margin:18px 0}.compare-heading p{color:#69655f;font-size:15px;line-height:1.65}.compare-controls{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin:45px 0 30px}.compare-controls label{font-size:12px;font-weight:700}.compare-controls select{width:min(400px,100%);min-width:220px;height:43px;border:1px solid #ccc6bc;background:white;color:#171717;padding:0 12px;font:inherit;font-size:12px}.compare-controls button{height:43px;border:0;background:#0c38c5;color:#fff;padding:0 19px;font:inherit;font-size:12px;font-weight:700;cursor:pointer}.compare-controls button:disabled{opacity:.4;cursor:default}.compare-controls a{color:#0c38c5;text-decoration:none;font-size:12px;font-weight:700;margin-left:auto}.compare-empty{background:#fff;border:1px solid #e0dcd5;text-align:center;padding:75px 25px;color:#0c38c5}.compare-empty h2{color:#171717;font-size:28px;margin:14px 0 8px}.compare-empty p{color:#706b63;font-size:13px}.compare-scroll{overflow-x:auto;border:1px solid #dedad3}.compare-table{min-width:700px}.compare-row{display:grid;grid-template-columns:170px repeat(var(--columns),minmax(220px,1fr));border-bottom:1px solid #e4dfd8}.compare-row:last-child{border-bottom:0}.compare-row>div{padding:17px 20px;background:#fff;border-left:1px solid #e4dfd8;font-size:13px;line-height:1.5}.compare-row>div.row-label{border-left:0;background:#f1efea;color:#65615b;font-size:11px;font-weight:700;letter-spacing:.04em}.product-row article{padding:20px;background:#fff;border-left:1px solid #e4dfd8;position:relative;display:flex;flex-direction:column}.product-row img{width:100%;height:175px;object-fit:cover;background:#ece8e1}.product-row span{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:#0c38c5;font-weight:700;margin:15px 0 7px}.product-row a{color:#171717;text-decoration:none;font-size:15px;font-weight:700;line-height:1.35}.product-row a:hover{color:#0c38c5}.product-row small{color:#837d75;margin-top:7px}.remove{position:absolute;top:27px;right:27px;display:grid;place-items:center;width:29px;height:29px;border:1px solid #ddd5ca;background:#fff;color:#171717;cursor:pointer}.compare-note{font-size:11px;color:#817b72;margin-top:14px;line-height:1.5}.compare-next{border-top:1px solid #d7d2c9;margin-top:75px;padding-top:32px}.compare-next h2{font-size:clamp(28px,3vw,40px);letter-spacing:-.055em;margin:15px 0 22px}.compare-next a{display:inline-flex;align-items:center;gap:12px;color:#0c38c5;text-decoration:none;font-size:13px;font-weight:700}select:focus-visible,button:focus-visible,a:focus-visible,.compare-scroll:focus-visible{outline:2px solid #0c38c5;outline-offset:3px}@media(max-width:650px){.compare-inner{padding:55px 20px 85px}.compare-controls{align-items:stretch}.compare-controls label{width:100%}.compare-controls select{width:100%}.compare-controls a{width:100%;margin:6px 0 0}.compare-row{grid-template-columns:120px repeat(var(--columns),minmax(200px,1fr))}.compare-row>div{padding:14px 12px}.product-row img{height:130px}}
.scroll-hint{display:none;color:#6c665e;font-size:11px;margin:0 0 10px;align-items:center;gap:6px}@media(max-width:650px){.scroll-hint{display:flex}}
</style>
