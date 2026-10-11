<template>
  <v-container class="max-width-container product-detail-page py-10">
    <div v-if="loading" class="d-flex justify-center align-center py-16" style="min-height: 400px">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>

    <div v-else-if="!product" class="text-center py-16">
      <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
      <h2 class="text-h4 font-weight-black mb-4">PRODUTO NÃO ENCONTRADO</h2>
      <v-btn color="primary" to="/products">VOLTAR PARA PRODUTOS</v-btn>
    </div>

    <div v-else>
      <div class="product-intro"><span class="eyebrow">NÚCLEO / CONHEÇA CADA PEÇA</span><p>Desempenho em cada detalhe.</p></div>
      <!-- Breadcrumbs -->
      <div class="breadcrumbs mb-6 text-subtitle-2 text-grey-darken-1">
        <router-link to="/" class="hover-link">Início</router-link>
        <span class="mx-2">/</span>
        <router-link to="/products" class="hover-link">Produtos</router-link>
        <span class="mx-2">/</span>
        <span class="text-white">{{ product.name }}</span>
      </div>

      <!-- Main info row -->
      <v-row class="product-main mb-12">
        <!-- Left: Image Gallery -->
        <v-col cols="12" md="6">
          <v-card class="tech-card gallery-card pa-6 d-flex flex-column align-center">
            <!-- Big Image -->
            <div class="big-image-container mb-2 d-flex align-center justify-center rounded-lg">
              <img :src="product.images[activeImageIdx]" :alt="product.name" class="big-image" />
            </div>
            <span class="image-disclaimer">Imagem ilustrativa</span>

            <!-- Thumbnails -->
            <div class="d-flex gap-3 justify-center w-100 flex-wrap">
              <v-card
                v-for="(img, idx) in product.images"
                :key="idx"
                class="thumb-card rounded-md"
                :class="{ 'active-thumb': activeImageIdx === idx }"
                @click="activeImageIdx = idx"
              >
                <img :src="img" :alt="product.name" class="thumb-image" />
              </v-card>
            </div>
          </v-card>
        </v-col>

        <!-- Right: Purchase Details -->
        <v-col cols="12" md="6">
          <div class="d-flex justify-space-between align-center mb-4 product-meta">
            <span class="text-caption font-weight-bold text-secondary text-uppercase tracking-wider">{{ product.brand }}</span>
            <span class="text-caption text-grey-darken-1 font-weight-medium">SKU: {{ product.sku }}</span>
          </div>

          <h1 class="product-title text-white">{{ product.name }}</h1>
          <p class="product-lead">{{ product.shortDescription }}</p>

          <!-- Pricing Box -->
          <v-card class="tech-card purchase-card pa-6 mb-6">
            <div class="d-flex flex-column mb-4">
              <div class="d-flex align-baseline gap-2">
                <span class="text-h3 font-weight-black text-primary">
                  {{ formatCurrency(product.price) }}
                </span>
              </div>
              <span class="catalog-note">Preço demonstrativo; confirme antes de comprar.</span>
              <span class="catalog-note">Frete e prazo de entrega a definir. <router-link to="/entrega">Saiba mais sobre a entrega</router-link>.</span>
            </div>

            <!-- In stock status -->
            <div class="d-flex align-center mb-6">
              <div v-if="product.inStock" class="d-flex align-center text-success font-weight-bold text-caption">
                <v-icon size="small" class="mr-2">mdi-check-circle-outline</v-icon>
                <span>Disponível no catálogo</span>
              </div>
              <div v-else class="d-flex align-center text-error font-weight-bold text-caption">
                <v-icon size="small" class="mr-2">mdi-alert-circle-outline</v-icon>
                <span>PRODUTO INDISPONÍVEL</span>
              </div>
            </div>

            <!-- Add to cart -->
            <div class="d-flex align-center gap-3">
              <div class="quantity-selector d-flex align-center rounded-lg">
                <v-btn
                  icon="mdi-minus"
                  variant="text"
                  size="small"
                  color="primary"
                  :disabled="quantity <= 1 || !product.inStock"
                  @click="quantity--"
                ></v-btn>
                <span class="mx-3 font-weight-black text-body-1">{{ quantity }}</span>
                <v-btn
                  icon="mdi-plus"
                  variant="text"
                  size="small"
                  color="primary"
                  :disabled="quantity >= product.stockQuantity || !product.inStock"
                  @click="quantity++"
                ></v-btn>
              </div>

              <v-btn
                size="large"
                class="btn-buy-primary flex-grow-1 py-4 text-subtitle-2"
                :disabled="!product.inStock || cartLoading"
                @click="handleAddToCart"
              >
                <v-icon class="mr-2">mdi-cart-plus</v-icon>
                {{ cartLoading ? 'ADICIONANDO...' : 'ADICIONAR AO CARRINHO' }}
              </v-btn>
            </div>
            <div v-if="addedToCart" class="cart-feedback"><v-icon size="18">mdi-check-circle-outline</v-icon> Adicionado ao carrinho. <router-link to="/cart">Ver carrinho</router-link></div>
            <div v-if="addError" class="cart-error">{{ addError }}</div>
            <router-link v-if="setupSlot" class="setup-link" :to="{ name: 'build', query: { [setupSlot]: product.id } }">Ver esta peça no montador <v-icon size="17">mdi-arrow-right</v-icon></router-link>
          </v-card>

          <!-- Bullet features -->
          <div class="features-list">
            <h4 class="font-weight-black text-subtitle-2 mb-3 text-white text-uppercase">Destaques Principais</h4>
            <ul class="pa-0 list-unstyled">
              <li
                v-for="(feat, i) in product.features"
                :key="i"
                class="d-flex align-start text-caption text-grey-lighten-1 mb-2"
              >
                <v-icon color="secondary" class="mr-2 mt-1" size="x-small">mdi-check-bold</v-icon>
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>

      <!-- Specifications & Full Description Tabs -->
      <v-card class="tech-card details-card pa-6 mb-12">
        <v-tabs v-model="tab" color="secondary" align-tabs="start" class="border-b mb-6">
          <v-tab value="description" class="font-weight-bold">DESCRIÇÃO DETALHADA</v-tab>
          <v-tab value="specs" class="font-weight-bold">ESPECIFICAÇÕES TÉCNICAS</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <!-- Full description -->
          <v-window-item value="description">
            <p class="text-body-2 text-grey-lighten-1 leading-loose" style="white-space: pre-line">
              {{ product.description }}
            </p>
          </v-window-item>

          <!-- Specifications -->
          <v-window-item value="specs">
            <v-table class="bg-transparent">
              <tbody>
                <tr v-for="(val, name) in product.specifications" :key="name">
                  <td class="font-weight-bold text-secondary text-caption py-3 border-b-cell" style="width: 30%">
                    {{ name.toUpperCase() }}
                  </td>
                  <td class="text-caption text-grey-lighten-1 py-3 border-b-cell">
                    {{ val }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>
        </v-window>
      </v-card>

      <!-- Related Products Grid -->
      <section v-if="relatedProducts.length > 0">
        <div class="mb-6">
          <span class="text-caption text-secondary font-weight-bold tracking-wider text-uppercase">Recomendações</span>
          <h2 class="text-h5 font-weight-black text-white mt-1">Continue explorando</h2>
        </div>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="relProd in relatedProducts"
            :key="relProd.id"
          >
            <ProductCard :product="relProd" />
          </v-col>
        </v-row>
      </section>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '@/types';
import services from '@/services/api';
import { mockProducts } from '@/data/mockProducts';
import { productSlot } from '@/data/setupGuide';
import { useCartStore } from '@/stores/cart';
import ProductCard from '@/components/common/ProductCard.vue';

const route = useRoute();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const relatedProducts = ref<Product[]>([]);
const loading = ref(true);
const cartLoading = ref(false);
const addedToCart = ref(false);
const addError = ref('');
const setupSlot = computed(() => product.value ? productSlot(product.value) : null);
const activeImageIdx = ref(0);
const quantity = ref(1);
const tab = ref('description');
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

async function handleAddToCart() {
  if (!product.value || cartLoading.value) return;
  cartLoading.value = true;
  addError.value = '';
  try {
    await cartStore.addToCart(product.value, quantity.value);
    addedToCart.value = true;
  } catch (err) {
    console.error('Falha ao adicionar item:', err);
    addError.value = 'Não foi possível adicionar este item agora.';
  } finally {
    cartLoading.value = false;
  }
}

async function loadProductData(id: string) {
  loading.value = true;
  activeImageIdx.value = 0;
  quantity.value = 1;
  addedToCart.value = false;
  addError.value = '';
  try {
    const prod = await services.products.getProductById(id);
    product.value = prod;

    // Carrega relacionados
    try {
      const rel = await services.products.getRelatedProducts(prod.id, 4);
      relatedProducts.value = rel;
    } catch {
      relatedProducts.value = mockProducts.filter((p) => p.category === prod.category && p.id !== prod.id).slice(0, 4);
    }
  } catch (err) {
    console.warn('Falha na API ao carregar produto. Utilizando mockProducts como fallback.');
    const matched = mockProducts.find((p) => p.id === id);
    if (matched) {
      product.value = matched;
      relatedProducts.value = mockProducts.filter((p) => p.category === matched.category && p.id !== matched.id).slice(0, 4);
    } else {
      product.value = null;
    }
  } finally {
    loading.value = false;
  }
}

// Recarrega o componente se o ID do produto mudar na rota (ex: ao clicar em itens recomendados)
watch(
  () => route.params.id,
  (newId) => {
    if (newId) loadProductData(newId as string);
  }
);

onMounted(() => {
  if (route.params.id) {
    loadProductData(route.params.id as string);
  }
});
</script>

<style scoped>
.max-width-container {
  max-width: 1360px !important;
}
.product-detail-page { color:#171717; font-family:Inter,Arial,sans-serif; }
.product-detail-page :deep(.tech-card) { background:#f7f5f1 !important; border:1px solid #e1ddd6 !important; box-shadow:none !important; color:#171717 !important; border-radius:3px !important; }
.product-detail-page :deep(.tech-card:hover) { transform:none !important; }
.product-detail-page :deep(.text-white) { color:#171717 !important; }
.product-detail-page :deep(.text-grey-lighten-1) { color:#625e58 !important; }
.product-detail-page :deep(.text-grey-darken-1) { color:#77716a !important; }
.product-detail-page :deep(.btn-buy-primary) { background:#0c38c5 !important; color:#fff !important; box-shadow:none !important; }
.product-detail-page :deep(.badge-discount) { background:#efebe3 !important; color:#5d5140 !important; box-shadow:none !important; }
.product-detail-page :deep(.v-table) { color:#171717 !important; }
.product-detail-page :deep(.v-table td) { color:#625e58 !important; }
.product-detail-page :deep(.v-tab) { color:#171717 !important; }
.image-disclaimer { color:#827d76; font-size:11px; align-self:flex-start; margin-bottom:14px; }

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.hover-link {
  color: #6c6760;
  text-decoration: none;
  transition: color 0.2s ease;
}

.hover-link:hover {
  color: #0c38c5;
}

.line-height-tight {
  line-height: 1.25;
}

.big-image-container {
  height: 380px;
  width: 100%;
  background: #ebe7df;
  padding: 0;
  overflow:hidden;
}

.big-image {
  width:100%;
  height:100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.big-image-container:hover .big-image {
  transform: scale(1.05);
}

.thumb-card {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebe7df;
  border: 1px solid #d5d0c7 !important;
  cursor: pointer;
  border-radius: 8px !important;
  transition: all 0.2s ease;
  padding: 6px;
}

.thumb-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.active-thumb {
  border-color: #0c38c5 !important;
  box-shadow: none;
}

.quantity-selector {
  border: 1px solid #d5d0c7;
  padding: 4px;
  background-color: #f7f5f1;
}

.border-b {
  border-bottom: 1px solid #ded9d1;
}

.border-b-cell {
  border-bottom: 1px solid #ded9d1 !important;
}

.leading-relaxed {
  line-height: 1.6;
}

.leading-loose {
  line-height: 1.8;
}

.list-unstyled {
  list-style: none;
}
.product-detail-page{padding-top:38px!important;padding-bottom:100px!important}.product-intro{padding:20px 0 8px}.product-intro .eyebrow{font-size:10px;letter-spacing:.22em;font-weight:800;color:#0c38c5}.product-intro p{font-size:13px;color:#77736e;margin:7px 0 26px}.breadcrumbs{font-size:12px!important;color:#8b867f!important;max-width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.product-main{margin-top:25px}.product-meta{padding-top:13px}.product-meta span:first-child{letter-spacing:.18em!important}.product-title{font-size:clamp(34px,3.5vw,54px);line-height:1.07;letter-spacing:-.055em;font-weight:700;margin:14px 0 20px}.product-lead{font-size:15px;line-height:1.65;color:#6f6b66;max-width:540px;margin:0 0 32px}.product-detail-page :deep(.gallery-card){background:#ebe7e0!important;border:0!important;padding:20px!important}.big-image-container{height:510px;background:#e5dfd6;border-radius:0!important}.big-image-container:hover .big-image{transform:scale(1.025)}.thumb-card{border-radius:2px!important}.image-disclaimer{margin:12px 0 18px;font-size:10px;letter-spacing:.04em}.product-detail-page :deep(.purchase-card){background:#fff!important;border-color:#e2e2dc!important;padding:30px!important}.purchase-card .text-h3{font-size:36px!important;letter-spacing:-.05em}.catalog-note{font-size:11px;color:#8a847d;margin-top:12px}.quantity-selector{border-radius:2px!important;background:#fafaf8}.product-detail-page :deep(.btn-buy-primary){border-radius:2px!important;min-height:50px;letter-spacing:.02em}.features-list{border-top:1px solid #dedbd4;padding-top:23px}.features-list h4{font-size:11px!important;letter-spacing:.16em}.features-list li{font-size:13px!important;line-height:1.45;margin-bottom:13px!important}.cart-feedback,.cart-error{font-size:12px;margin-top:16px;display:flex;align-items:center;gap:6px}.cart-feedback{color:#235f42}.cart-feedback a{color:#0c38c5;font-weight:700}.cart-error{color:#ae3a3a}.product-detail-page :deep(.details-card){background:#fff!important;padding:26px 30px!important}.product-detail-page :deep(.v-tabs){border-bottom:1px solid #e4e1dc}.product-detail-page :deep(.v-tab){font-size:11px;letter-spacing:.08em}.product-detail-page :deep(.v-window){min-height:85px}.product-detail-page :deep(.v-table){background:transparent!important}.product-detail-page :deep(.v-table tr){border-color:#e4e1dc}.product-detail-page section>div>h2{font-size:32px!important;letter-spacing:-.04em}
.setup-link{display:inline-flex;align-items:center;gap:12px;margin-top:20px;color:#0c38c5;font-size:12px;font-weight:700;text-decoration:none}
@media(max-width:960px){.big-image-container{height:450px}.product-main{margin-top:0}.product-meta{padding-top:28px}}
@media(max-width:600px){.product-detail-page{padding:24px 16px 70px!important}.product-intro{padding-top:0}.product-title{font-size:34px}.big-image-container{height:320px}.product-detail-page :deep(.gallery-card){padding:12px!important}.product-detail-page :deep(.purchase-card){padding:21px!important}.purchase-card .text-h3{font-size:31px!important}.product-detail-page :deep(.details-card){padding:18px!important}.product-detail-page :deep(.v-tab){font-size:10px;letter-spacing:0}.product-detail-page section>div>h2{font-size:27px!important}}
</style>
