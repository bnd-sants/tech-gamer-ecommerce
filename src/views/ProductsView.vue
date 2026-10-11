<template>
  <v-container class="max-width-container catalog-page py-10">
    <v-row>
      <!-- Filters Sidebar (Desktop) -->
      <v-col cols="12" md="3" class="hidden-sm-and-down">
        <v-card class="tech-card pa-5">
          <div class="d-flex align-center justify-space-between mb-5">
            <h3 class="font-weight-black text-subtitle-1">Filtros</h3>
            <v-btn variant="text" size="small" color="secondary" class="px-0 font-weight-bold" @click="resetFilters">LIMPAR</v-btn>
          </div>

          <!-- Search filter -->
          <div class="filter-section mb-5">
            <h4 class="font-weight-bold text-caption text-uppercase mb-2">Buscar Produto</h4>
            <v-text-field
              v-model="filters.search"
              density="compact"
              variant="outlined"
              placeholder="Digite o modelo..."
              hide-details
              color="secondary"
            ></v-text-field>
          </div>

          <!-- Category filter -->
          <div class="filter-section mb-5">
            <h4 class="font-weight-bold text-caption text-uppercase mb-2">Departamento</h4>
            <v-radio-group v-model="filters.category" color="primary" hide-details>
              <v-radio label="Todos os Departamentos" value=""></v-radio>
              <v-radio
                v-for="cat in categories"
                :key="cat"
                :label="cat"
                :value="cat"
              ></v-radio>
            </v-radio-group>
          </div>

          <!-- Price range filter -->
          <div class="filter-section mb-5">
            <h4 class="font-weight-bold text-caption text-uppercase mb-2">Faixa de Preço</h4>
            <v-slider
              v-model="filters.maxPrice"
              :max="maxAvailablePrice"
              :min="0"
              :step="100"
              color="primary"
              thumb-label
              hide-details
            ></v-slider>
            <div class="d-flex justify-space-between mt-2 text-caption text-grey-darken-1 font-weight-bold">
              <span>R$ 0</span>
              <span class="text-primary font-weight-black">Até R$ {{ filters.maxPrice.toLocaleString('pt-BR') }}</span>
            </div>
          </div>

          <!-- Stock filter -->
          <div class="filter-section">
            <v-checkbox
              v-model="filters.inStock"
              label="Apenas itens em estoque"
              color="primary"
              hide-details
            ></v-checkbox>
          </div>
        </v-card>
      </v-col>

      <!-- Products Grid -->
      <v-col cols="12" md="9">
        <!-- Grid Header (Controls) -->
        <v-card class="tech-card pa-4 mb-6 d-flex flex-wrap align-center justify-space-between gap-4">
          <div class="d-flex align-center">
            <v-btn
              class="hidden-md-and-up mr-2"
              variant="outlined"
              color="secondary"
              icon="mdi-filter-variant"
              size="small"
              @click="mobileDrawer = true"
            ></v-btn>
            <span class="text-subtitle-2">
              Exibindo <strong>{{ filteredProducts.length }}</strong> de <strong>{{ totalProducts }}</strong> produtos
            </span>
          </div>

          <div class="d-flex align-center gap-2">
            <span class="text-caption text-grey-darken-1 hidden-xs-only font-weight-bold">ORDENAR:</span>
            <v-select
              v-model="filters.sort"
              :items="sortOptions"
              item-title="title"
              item-value="value"
              density="compact"
              variant="outlined"
              hide-details
              color="secondary"
              style="width: 210px"
            ></v-select>
          </div>
        </v-card>

        <div class="compare-bar" aria-live="polite"><div><strong>{{ selectedIds.length }} / 3 para comparar</strong><span>Marque até três peças para ver as fichas lado a lado.</span></div><div class="compare-actions"><button v-if="selectedIds.length" type="button" @click="selectedIds = []">Limpar</button><router-link v-if="selectedIds.length >= 2" :to="{ name: 'compare', query: { ids: selectedIds.join(',') } }">Comparar peças <v-icon size="17">mdi-arrow-right</v-icon></router-link><span v-else>Selecione ao menos duas peças</span></div></div>
        <p v-if="compareNotice" class="compare-notice" role="status">{{ compareNotice }}</p>

        <Transition name="catalog-filter" mode="out-in">
        <!-- Loading -->
        <v-row v-if="loading" key="loading">
          <v-col cols="12" sm="6" md="4" v-for="n in 6" :key="n">
            <v-skeleton-loader
              type="card, heading, text, button"
              class="cyber-skeleton"
            ></v-skeleton-loader>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <div v-else-if="filteredProducts.length === 0" :key="`empty-${route.fullPath}`" class="text-center py-16">
          <v-icon size="64" color="grey-darken-1" class="mb-4">mdi-alert-circle-outline</v-icon>
          <h3 class="text-h5 font-weight-black mb-2">NENHUM PRODUTO ENCONTRADO</h3>
          <p class="text-grey-darken-1">{{ filters.category === 'PC Gamer' ? 'Esta categoria ainda não tem peças nesta prévia. Explore o montador para criar uma seleção.' : 'Tente ajustar seus filtros para encontrar o que procura.' }}</p>
          <v-btn color="primary" class="mt-6" @click="resetFilters">LIMPAR FILTROS</v-btn>
          <v-btn v-if="filters.category === 'PC Gamer'" variant="text" color="primary" class="mt-6" to="/build">ABRIR MONTADOR</v-btn>
        </div>

        <!-- Products -->
        <v-row v-else :key="route.fullPath">
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <ProductCard :product="product" show-compare :comparison-selected="selectedIds.includes(product.id)" @toggle-compare="toggleCompare" />
          </v-col>
        </v-row>
        </Transition>
      </v-col>
    </v-row>

    <!-- Mobile Filters Drawer -->
    <v-navigation-drawer v-model="mobileDrawer" temporary location="right" color="background" width="300">
      <div class="pa-6">
        <div class="d-flex align-center justify-space-between mb-6">
          <h3 class="font-weight-black text-subtitle-1">// FILTROS</h3>
          <v-btn icon="mdi-close" variant="text" size="small" @click="mobileDrawer = false"></v-btn>
        </div>

        <!-- Search filter -->
        <div class="filter-section mb-6">
          <h4 class="font-weight-bold text-subtitle-2 text-white mb-2">PALAVRA-CHAVE</h4>
          <v-text-field
            v-model="filters.search"
            density="compact"
            variant="outlined"
            placeholder="Buscar..."
            hide-details
            color="primary"
          ></v-text-field>
        </div>

        <!-- Category filter -->
        <div class="filter-section mb-6">
          <h4 class="font-weight-bold text-subtitle-2 text-white mb-2">CATEGORIA</h4>
          <v-radio-group v-model="filters.category" color="primary" hide-details>
            <v-radio label="Todas" value=""></v-radio>
            <v-radio
              v-for="cat in categories"
              :key="cat"
              :label="cat"
              :value="cat"
            ></v-radio>
          </v-radio-group>
        </div>

        <!-- Price range filter -->
        <div class="filter-section mb-6">
          <h4 class="font-weight-bold text-subtitle-2 text-white mb-2">PREÇO MÁXIMO</h4>
          <v-slider
            v-model="filters.maxPrice"
            :max="maxAvailablePrice"
            :min="0"
            :step="100"
            color="primary"
            thumb-label
            hide-details
          ></v-slider>
          <div class="d-flex justify-space-between mt-2 text-caption text-grey-darken-1">
            <span>R$ 0</span>
            <span>{{ formatCurrency(filters.maxPrice) }}</span>
          </div>
        </div>

        <!-- Stock filter -->
        <div class="filter-section mb-6">
          <v-checkbox
            v-model="filters.inStock"
            label="Apenas em estoque"
            color="primary"
            hide-details
          ></v-checkbox>
        </div>

        <v-btn block color="primary" @click="mobileDrawer = false">APLICAR</v-btn>
      </div>
    </v-navigation-drawer>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '@/types';
import services from '@/services/api';
import { mockProducts } from '@/data/mockProducts';
import ProductCard from '@/components/common/ProductCard.vue';

const route = useRoute();

const products = ref<Product[]>([]);
const totalProducts = ref(0);
const loading = ref(true);
const mobileDrawer = ref(false);

const categories = ['Hardware', 'Periféricos', 'Monitores'];
const selectedIds = ref<string[]>(typeof route.query.compare === 'string' ? route.query.compare.split(',').filter(Boolean).slice(0, 3) : []);
const compareNotice = ref('');
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
const maxAvailablePrice = computed(() => Math.max(10000, Math.ceil(Math.max(0, ...products.value.map(product => product.price)) / 1000) * 1000));

const filters = reactive({
  search: (route.query.search as string) || '',
  category: (route.query.category as string) || '',
  maxPrice: 10000,
  inStock: false,
  sort: 'popular'
});

const sortOptions = [
  { title: 'Relevância', value: 'popular' },
  { title: 'Menor Preço', value: 'price_asc' },
  { title: 'Maior Preço', value: 'price_desc' }
];

function resetFilters() {
  filters.search = '';
  filters.category = '';
  filters.maxPrice = maxAvailablePrice.value;
  filters.inStock = false;
  filters.sort = 'popular';
}

function toggleCompare(id: string) {
  compareNotice.value = '';
  if (selectedIds.value.includes(id)) { selectedIds.value = selectedIds.value.filter(item => item !== id); return; }
  if (selectedIds.value.length >= 3) { compareNotice.value = 'Você pode comparar até três peças. Remova uma antes de adicionar outra.'; return; }
  selectedIds.value = [...selectedIds.value, id];
}

// Observe mudanças nos parâmetros da rota (ex: buscas feitas pelo header)
watch(
  () => route.query,
  (query) => {
    filters.search = typeof query.search === 'string' ? query.search : '';
    filters.category = typeof query.category === 'string' ? query.category : '';
  }
);

// Filtros locais em conjunto com o mock fallback
const filteredProducts = computed(() => {
  let result = [...products.value];

  // Filtro de Busca
  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }

  // Filtro de Categoria
  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  // Filtro de Preço Máximo
  result = result.filter((p) => p.price <= filters.maxPrice);

  // Filtro de Disponibilidade
  if (filters.inStock) {
    result = result.filter((p) => p.inStock);
  }

  // Ordenação
  if (filters.sort === 'price_asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.sort === 'price_desc') {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
});

async function loadProducts() {
  loading.value = true;
  try {
    const data = await services.products.getProducts();
    products.value = data.products;
    totalProducts.value = data.total;
  } catch (err) {
    console.warn('API de produtos indisponível. Carregando mockProducts como fallback.');
    products.value = mockProducts;
    totalProducts.value = mockProducts.length;
  } finally {
    selectedIds.value = selectedIds.value.filter(id => products.value.some(product => product.id === id));
    if (filters.maxPrice === 10000) filters.maxPrice = maxAvailablePrice.value;
    loading.value = false;
  }
}

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.max-width-container { max-width: 1450px !important; }
.catalog-page { color:#171717; font-family:Inter,Arial,sans-serif; }
.catalog-page :deep(.tech-card) { background:#f7f5f1 !important; border:1px solid #e1ddd6 !important; border-radius:3px !important; color:#171717 !important; box-shadow:none !important; }
.catalog-page :deep(.tech-card:hover) { transform:none !important; }
.catalog-page :deep(.text-white) { color:#171717 !important; }
.catalog-page :deep(.text-grey-lighten-1) { color:#625e58 !important; }
.catalog-page :deep(.text-grey-darken-1) { color:#77716a !important; }
.catalog-page :deep(.v-field) { background:#fff !important; color:#171717 !important; border-radius:3px !important; }
.catalog-page :deep(.v-field input),.catalog-page :deep(.v-field .v-select__selection-text) { color:#171717 !important; }
.catalog-page :deep(.v-selection-control),.catalog-page :deep(.v-label) { color:#2d2a26 !important; }
.catalog-page :deep(.v-icon) { color:inherit; }

.gap-2 {
  gap: 0.5rem;
}

.gap-4 {
  gap: 1rem;
}

.filter-section {
  border-bottom: 1px solid #e2ded7;
  padding-bottom: 1.25rem;
}

.filter-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.compare-bar{display:flex;align-items:center;justify-content:space-between;gap:20px;border:1px solid #d8d3ca;background:#efede8;padding:14px 17px;margin:-8px 0 24px}.compare-bar>div:first-child{display:grid;gap:3px}.compare-bar strong{font-size:13px}.compare-bar span{font-size:11px;color:#756f67}.compare-actions{display:flex;align-items:center;gap:15px;white-space:nowrap}.compare-actions button{background:none;border:0;color:#5f5a53;text-decoration:underline;font:inherit;font-size:11px;cursor:pointer}.compare-actions a{display:inline-flex;align-items:center;gap:10px;background:#0c38c5;color:#fff;text-decoration:none;padding:10px 13px;font-size:11px;font-weight:700}.compare-notice{color:#a33e23;font-size:12px;margin:-12px 0 18px}@media(max-width:650px){.compare-bar{display:block}.compare-actions{margin-top:12px;justify-content:space-between;flex-wrap:wrap}}

.catalog-filter-enter-active,
.catalog-filter-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.catalog-filter-enter-from { opacity: 0; transform: translateY(8px); }
.catalog-filter-leave-to { opacity: 0; transform: translateY(-5px); }
@media (prefers-reduced-motion: reduce) {
  .catalog-filter-enter-active,
  .catalog-filter-leave-active { transition: none; }
}
</style>
