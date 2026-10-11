<template>
  <AccountShell title="Peças que ficam." description="Guarde componentes para comparar e voltar a eles quando quiser." section-label="SUA SELEÇÃO" section-title="Favoritos" heading-id="favorites-title">
    <p class="panel-copy">{{ favoritedProducts.length }} {{ favoritedProducts.length === 1 ? 'produto salvo' : 'produtos salvos' }} nesta prévia. A seleção fica neste navegador.</p>
    <div v-if="loading" class="status" role="status">Carregando sua seleção…</div>
    <div v-else-if="favoritedProducts.length === 0" class="empty-state">
      <v-icon size="38">mdi-heart-outline</v-icon>
      <h3>Seu espaço começa aqui.</h3>
      <p>Toque no coração de um produto para guardá-lo nesta lista.</p>
      <router-link to="/products">Explorar catálogo <v-icon size="17">mdi-arrow-up-right</v-icon></router-link>
    </div>
    <div v-else class="favorites-grid">
      <ProductCard v-for="product in favoritedProducts" :key="product.id" :product="product" />
    </div>
  </AccountShell>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Product } from '@/types';
import services from '@/services/api';
import { mockProducts } from '@/data/mockProducts';
import { useFavoritesStore } from '@/stores/favorites';
import ProductCard from '@/components/common/ProductCard.vue';
import AccountShell from '@/components/layout/AccountShell.vue';

const favoritesStore = useFavoritesStore();
const products = ref<Product[]>(mockProducts);
const loading = ref(true);
const favoritedProducts = computed(() => products.value.filter((product) => favoritesStore.ids.includes(product.id)));

onMounted(async () => {
  favoritesStore.refresh();
  loading.value = true;
  try {
    const data = await services.products.getProducts();
    products.value = data.products;
  } catch {
    products.value = mockProducts;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.panel-copy{color:#737a74;font-size:13px;margin:0 0 28px}.status{padding:35px 0;color:#707770;font-size:14px}.empty-state{padding:55px 20px;text-align:center;background:#fafaf8;border:1px solid #e8eae4}.empty-state .v-icon{color:#0c38c5}.empty-state h3{font-size:26px;letter-spacing:-.04em;margin:18px 0 8px}.empty-state p{color:#6d756e;font-size:14px;line-height:1.6}.empty-state a{display:inline-flex;align-items:center;gap:12px;margin-top:25px;color:#0c38c5;font-size:13px;font-weight:700;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:6px}.favorites-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}@media(max-width:600px){.favorites-grid{grid-template-columns:1fr}}
</style>
