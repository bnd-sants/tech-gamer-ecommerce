<template>
  <article class="nucleo-product-card">
    <div class="product-media">
      <router-link :to="'/products/' + product.id" class="product-image-link"><img :src="product.images[0]" :alt="product.name" loading="lazy" /></router-link>
      <button class="favorite" type="button" :aria-label="isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'" @click="toggleFavorite"><v-icon size="20">{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon></button>
    </div>
    <div class="product-content">
      <div class="product-kicker">{{ product.category }} <span>· {{ product.brand }}</span></div>
      <router-link :to="'/products/' + product.id" class="product-name">{{ product.name }}</router-link>
      <div class="product-note">Imagem ilustrativa</div>
      <button v-if="showCompare" type="button" class="compare-toggle" :class="{ selected: comparisonSelected }" :aria-pressed="comparisonSelected" @click="emit('toggleCompare', product.id)"><v-icon size="16">{{ comparisonSelected ? 'mdi-check-circle' : 'mdi-compare-horizontal' }}</v-icon>{{ comparisonSelected ? 'Na comparação' : 'Comparar' }}</button>
      <div class="product-bottom">
        <div><strong>{{ formatCurrency(product.price) }}</strong><small>Preço demonstrativo</small></div>
        <button type="button" :disabled="!product.inStock || loading" :aria-label="product.inStock ? 'Adicionar ' + product.name + ' ao carrinho' : product.name + ' esgotado'" @click="handleAddToCart"><v-icon size="18">mdi-cart-outline</v-icon>{{ !product.inStock ? 'Esgotado' : loading ? 'Adicionando' : 'Adicionar' }}</button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Product } from '@/types';
import { useCartStore } from '@/stores/cart';
import { useFavoritesStore } from '@/stores/favorites';
const props = withDefaults(defineProps<{ product: Product; showCompare?: boolean; comparisonSelected?: boolean }>(), { showCompare: false, comparisonSelected: false });
const emit = defineEmits<{ toggleCompare: [id: string] }>();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const loading = ref(false);
const isFavorite = computed(() => favoritesStore.has(props.product.id));
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
function toggleFavorite() { favoritesStore.toggle(props.product.id); }
async function handleAddToCart() { if (loading.value || !props.product.inStock) return; loading.value = true; try { await cartStore.addToCart(props.product, 1); } catch (error) { console.error('Não foi possível adicionar o produto', error); } finally { loading.value = false; } }
</script>

<style scoped>
.nucleo-product-card{height:100%;background:#f7f5f1;border:1px solid #e1ddd6;color:#171717;display:flex;flex-direction:column;transition:border-color .2s ease,transform .2s ease}
.nucleo-product-card:hover{border-color:#bbb5aa;transform:translateY(-2px)}
.product-media{position:relative;background:#e9e5de}.product-image-link{display:block;aspect-ratio:1.13;overflow:hidden}.product-image-link img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .4s ease}.nucleo-product-card:hover img{transform:scale(1.035)}
.favorite{position:absolute;right:12px;top:12px;width:34px;height:34px;display:grid;place-items:center;background:#f7f5f1;border:1px solid #ddd8d0;border-radius:50%;color:#222;cursor:pointer}.favorite:hover{color:#0c38c5}
.product-content{padding:16px;display:flex;flex-direction:column;flex:1}.product-kicker{font-size:10px;letter-spacing:.15em;text-transform:uppercase;font-weight:700;color:#55514c}.product-kicker span{color:#8b867e}.product-name{color:#171717;text-decoration:none;font-size:15px;font-weight:700;line-height:1.35;margin:9px 0 5px;min-height:40px}.product-name:hover{color:#0c38c5}.product-note{color:#827d76;font-size:10px}.product-bottom{margin-top:auto;padding-top:22px;display:flex;align-items:end;justify-content:space-between;gap:8px}.product-bottom strong{display:block;font-size:18px;white-space:nowrap;letter-spacing:-.04em}.product-bottom small{display:block;color:#77716a;font-size:10px;line-height:1.3}.product-bottom button{display:flex;align-items:center;gap:6px;border:1px solid #bfbab1;background:transparent;border-radius:3px;padding:8px 10px;color:#171717;font:inherit;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap}.product-bottom button:hover{border-color:#0c38c5;color:#0c38c5}.product-bottom button:disabled{opacity:.5;cursor:default}
.compare-toggle{display:inline-flex;align-items:center;gap:7px;align-self:start;margin-top:13px;padding:3px 0;border:0;background:none;color:#5c5750;font:inherit;font-size:11px;font-weight:700;cursor:pointer}.compare-toggle:hover,.compare-toggle.selected{color:#0c38c5}.compare-toggle:focus-visible{outline:2px solid #0c38c5;outline-offset:3px}
@media(max-width:600px){.product-image-link{aspect-ratio:1.5}.product-content{padding:14px}}
</style>
