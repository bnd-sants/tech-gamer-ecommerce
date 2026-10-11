<template>
  <div class="curation-page"><div class="curation-inner">
    <div class="curation-heading"><span class="eyebrow">SELEÇÃO NÚCLEO</span><h1>Peças para explorar.</h1><p>Uma amostra da curadoria que estamos construindo. Preços e imagens são ilustrativos; pagamentos ainda não estão disponíveis nesta prévia.</p></div>
    <div v-if="loading" class="loading">Carregando seleção...</div>
    <div v-else-if="products.length" class="curation-grid"><ProductCard v-for="product in products" :key="product.id" :product="product" /></div>
    <div v-else class="empty"><h2>Seleção em preparação.</h2><p>Enquanto isso, conheça os componentes disponíveis no catálogo.</p></div>
    <router-link class="catalog-link" to="/products">Ver catálogo completo <v-icon size="17">mdi-arrow-right</v-icon></router-link>
  </div></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Product } from '@/types';
import services from '@/services/api';
import { mockProducts } from '@/data/mockProducts';
import ProductCard from '@/components/common/ProductCard.vue';
const products = ref<Product[]>([]);
const loading = ref(true);
onMounted(async () => {
  try { products.value = (await services.products.getProducts()).products.slice(0, 4); }
  catch { products.value = mockProducts.slice(0, 4); }
  finally { loading.value = false; }
});
</script>

<style scoped>
.curation-page{background:#f7f5f1;color:#171717;min-height:75vh}.curation-inner{max-width:1450px;margin:auto;padding:75px 48px 110px}.eyebrow{color:#0c38c5;font-size:10px;font-weight:700;letter-spacing:.25em}.curation-heading{max-width:760px;margin-bottom:45px}.curation-heading h1{font-size:clamp(42px,5vw,70px);letter-spacing:-.065em;line-height:1.05;margin:15px 0}.curation-heading p{font-size:16px;line-height:1.6;color:#6b6761}.curation-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:22px}.catalog-link{display:inline-flex;align-items:center;gap:20px;color:#0c38c5;text-decoration:none;margin-top:40px;font-size:14px;font-weight:700}.loading,.empty{padding:70px 0;color:#69655f}.empty h2{color:#171717;font-size:28px;margin-bottom:8px}@media(max-width:1100px){.curation-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:640px){.curation-inner{padding:52px 20px 80px}.curation-grid{grid-template-columns:1fr}}
</style>
