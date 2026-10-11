<template>
  <div class="nucleo-home">
    <section class="showroom" aria-label="Showroom de montagem">
      <img class="showroom-photo showroom-base" :src="stages[0].image" :alt="activeStage === 0 ? stages[0].alt : ''" :aria-hidden="activeStage !== 0" fetchpriority="high" />
      <img v-for="(stage, index) in stages.slice(1)" :key="stage.image" class="showroom-photo" :class="{ 'is-active': activeStage === index + 1 }" :src="stage.image" :alt="activeStage === index + 1 ? stage.alt : ''" :aria-hidden="activeStage !== index + 1" />
      <div class="showroom-wash" aria-hidden="true"></div>
      <div class="showroom-inner">
        <nav class="chapter-rail" aria-label="Etapas da montagem">
          <button v-for="(stage, index) in stages" :key="stage.title" class="chapter" :class="{ active: activeStage === index }" type="button" :aria-current="activeStage === index ? 'step' : undefined" @click="setStage(index)">
            <span class="chapter-dot"></span><span class="chapter-copy"><strong>0{{ index + 1 }}</strong>{{ stage.title }}</span>
          </button>
        </nav>
        <div class="showroom-copy">
          <span class="eyebrow">SHOWROOM NÚCLEO · EDIÇÃO 01</span>
          <h1>Engenharia que<br />merece ser vista.</h1>
          <p>Do primeiro encaixe ao conjunto final. Explore cada camada de um setup criado para unir desempenho, precisão e presença.</p>
          <div class="stage-caption" aria-live="polite">
            <span>0{{ activeStage + 1 }} / 03</span><strong>{{ stages[activeStage].title }}</strong>
            <small>{{ stages[activeStage].description }}</small>
          </div>
          <div class="showroom-actions">
            <button class="primary-action" type="button" @click="toggleTour"><v-icon size="19">{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>{{ isPlaying ? 'Pausar montagem' : 'Ver montagem' }}</button>
            <router-link class="secondary-action" :to="{ name: 'products', query: { category: 'Hardware' } }">Explorar hardware <v-icon size="18">mdi-arrow-up-right</v-icon></router-link>
          </div>
        </div>
      </div>
      <div class="showroom-index">DESIGN × DESEMPENHO <span>01 — 03</span></div>
    </section>

    <section class="selection" aria-labelledby="selection-title">
      <div class="selection-heading">
        <div><span class="eyebrow">SELEÇÃO NÚCLEO</span><h2 id="selection-title">Equipamentos em destaque</h2><p>Hardware para quem valoriza desempenho, design e confiabilidade. Preços demonstrativos.</p></div>
        <router-link to="/products" class="catalog-link">Ver todos os produtos <v-icon size="17">mdi-arrow-right</v-icon></router-link>
      </div>
      <div class="editorial-grid">
        <article v-for="item in selection" :key="item.product.id" class="editorial-card">
          <router-link :to="'/products/' + item.product.id" class="editorial-image-link"><img :src="item.image" :alt="item.product.name" loading="lazy" /></router-link>
          <div class="editorial-meta">{{ item.kicker }}</div>
          <router-link :to="'/products/' + item.product.id" class="editorial-title">{{ item.product.name }}</router-link>
          <p class="editorial-description">{{ item.description }} · Imagem ilustrativa</p>
          <div class="editorial-purchase">
            <div><strong>{{ formatCurrency(item.product.price) }}</strong><small>Preço demonstrativo</small></div>
            <button type="button" :disabled="addingId === item.product.id || !item.product.inStock" :aria-label="'Adicionar ' + item.product.name + ' ao carrinho'" @click="addProduct(item.product)"><v-icon size="17">mdi-cart-outline</v-icon>{{ addingId === item.product.id ? 'Adicionando' : 'Adicionar' }}</button>
          </div>
        </article>
      </div>
    </section>
    <section class="philosophy"><span class="eyebrow">FEITO PARA ESCOLHAS MELHORES</span><h2>Conheça a peça.<br />Entenda o conjunto.</h2><p>Escolha CPU, GPU e memória, confira pontos de compatibilidade e descubra o que ainda precisa ser validado no seu projeto.</p><router-link to="/build">Abrir montador <v-icon size="18">mdi-arrow-up-right</v-icon></router-link></section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { mockProducts } from '@/data/mockProducts';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types';

const router = useRouter();
const cartStore = useCartStore();
const stages = [
  { title: 'Estrutura', description: 'O chassi revela a arquitetura do projeto.', image: '/showroom/assembly-01.png', alt: 'Gabinete premium com painel de vidro e estrutura parcialmente separados' },
  { title: 'Fluxo de ar', description: 'Cada componente encontra seu lugar.', image: '/showroom/assembly-02.png', alt: 'Vista explodida dos painéis, ventiladores e componentes do computador' },
  { title: 'Conjunto final', description: 'Desempenho e materiais em equilíbrio.', image: '/showroom/assembly-03.png', alt: 'Computador montado com gabinete preto e frente de madeira' },
];
const activeStage = ref(0);
const isPlaying = ref(false);
const addingId = ref<string | null>(null);
let timer: ReturnType<typeof setInterval> | undefined;
const selection = [
  { product: mockProducts.find(p => p.id === '2')!, image: '/showroom/gpu.png', kicker: 'PLACA DE VÍDEO', description: '16GB GDDR6X · DLSS 3 · Ray Tracing' },
  { product: mockProducts.find(p => p.id === '1')!, image: '/showroom/keyboard.png', kicker: 'PERIFÉRICOS', description: 'Switches mecânicos · Iluminação RGB' },
  { product: mockProducts.find(p => p.id === '5')!, image: '/showroom/monitor.png', kicker: 'MONITORES', description: '34″ OLED · Curvatura imersiva' },
];
const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
function stopTour() { if (timer) clearInterval(timer); timer = undefined; isPlaying.value = false; }
function setStage(index: number) { activeStage.value = index; stopTour(); }
function toggleTour() {
  if (isPlaying.value) { stopTour(); return; }
  activeStage.value = (activeStage.value + 1) % stages.length;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  isPlaying.value = true;
  timer = setInterval(() => { activeStage.value = (activeStage.value + 1) % stages.length; }, 3000);
}
async function addProduct(product: Product) {
  addingId.value = product.id;
  try { await cartStore.addToCart(product, 1); router.push('/cart'); }
  catch (error) { console.error('Não foi possível adicionar o produto', error); }
  finally { addingId.value = null; }
}
onMounted(() => { stages.forEach(stage => { const image = new Image(); image.src = stage.image; }); });
onUnmounted(stopTour);
</script>

<style scoped>
.nucleo-home{color:#171717;background:#f7f5f1;font-family:Inter,Arial,sans-serif}
.showroom{min-height:650px;position:relative;overflow:hidden;background:#e8e0d6}
.showroom-photo{position:absolute;top:0;left:20%;width:80%;height:100%;object-fit:cover;object-position:75% center;opacity:0;transition:opacity .7s ease;pointer-events:none}
.showroom-photo.showroom-base{opacity:1;transition:none}
.showroom-photo.is-active{opacity:1}
.showroom-wash{position:absolute;inset:0;background:linear-gradient(90deg,#f7f5f1 0%,#f7f5f1 33%,rgba(247,245,241,.91) 43%,rgba(247,245,241,.28) 52%,transparent 62%)}
.showroom-inner{max-width:1510px;margin:auto;min-height:650px;position:relative;display:grid;grid-template-columns:98px minmax(330px,430px) 1fr;align-items:center;padding:38px 48px;gap:38px}
.chapter-rail{align-self:center;display:grid;gap:3px}.chapter{display:flex;align-items:flex-start;text-align:left;gap:18px;min-height:86px;background:none;border:0;border-left:1px solid #bab8b4;cursor:pointer;color:#85827e;padding:0;font:inherit}.chapter:last-child{min-height:55px;border-left-color:transparent}.chapter-dot{display:block;flex:none;width:10px;height:10px;background:#898784;border-radius:50%;margin-left:-5px}.chapter.active{color:#181818;border-left-color:#0d36c6}.chapter.active .chapter-dot{background:#103ac8;width:13px;height:13px;margin-left:-7px}.chapter-copy{display:grid;gap:2px;font-size:13px;line-height:1.3}.chapter-copy strong{font-size:12px}
.showroom-copy{max-width:440px;padding:24px 0}.eyebrow{display:block;font-size:10px;font-weight:700;letter-spacing:.34em;line-height:1.4}.showroom h1{font-size:clamp(42px,4vw,70px);letter-spacing:-.067em;line-height:.99;margin:22px 0 20px;font-weight:800}.showroom-copy>p{font-size:16px;line-height:1.55;color:#686660;max-width:390px;margin:0 0 23px}.stage-caption{border-top:1px solid #cbc8c1;padding:13px 0 18px;display:grid;grid-template-columns:50px 1fr;gap:2px 8px;max-width:360px}.stage-caption span{font-size:11px;color:#143dc5;font-weight:700}.stage-caption strong{font-size:13px}.stage-caption small{grid-column:2;color:#73716d;font-size:12px}.showroom-actions{display:grid;gap:9px;width:min(100%,325px)}.primary-action,.secondary-action{min-height:49px;padding:0 19px;display:flex;align-items:center;justify-content:space-between;border-radius:4px;font-size:14px;font-weight:700;text-decoration:none;cursor:pointer}.primary-action{color:#fff;background:#0c38c5;border:1px solid #0c38c5}.primary-action:hover{background:#082a99}.secondary-action{color:#171717;border:1px solid #77736d;background:rgba(255,255,255,.35)}.secondary-action:hover{background:#fff}.showroom-index{position:absolute;right:36px;bottom:20px;font-size:10px;letter-spacing:.2em;color:#45413c;display:flex;gap:20px}
.selection{max-width:1510px;margin:auto;padding:46px 48px 60px}.selection-heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:22px}.selection h2{font-size:clamp(27px,2.3vw,36px);letter-spacing:-.05em;line-height:1.1;margin:8px 0 3px}.selection-heading p{color:#77736e;margin:0;font-size:14px}.catalog-link{color:#0b36b8;display:flex;gap:8px;align-items:center;font-size:13px;text-decoration:none;white-space:nowrap;padding-bottom:4px}.catalog-link:hover{text-decoration:underline}.editorial-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.editorial-card{min-width:0}.editorial-image-link{display:block;aspect-ratio:1.4;overflow:hidden;background:#ded8d0}.editorial-image-link img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .5s ease}.editorial-card:hover img{transform:scale(1.035)}.editorial-meta{letter-spacing:.16em;font-size:10px;color:#79756f;margin:12px 0 3px;font-weight:700}.editorial-title{display:block;color:#171717;font-size:16px;line-height:1.3;font-weight:700;text-decoration:none}.editorial-title:hover{color:#0b36b8}.editorial-description{color:#77736e;font-size:12px;margin:4px 0 12px}.editorial-purchase{display:flex;justify-content:space-between;align-items:end;gap:8px}.editorial-purchase strong{display:block;font-size:19px;letter-spacing:-.04em}.editorial-purchase small{display:block;color:#77736e;font-size:11px}.editorial-purchase button{display:flex;align-items:center;gap:7px;color:#171717;background:transparent;border:1px solid #cbc8c1;padding:9px 13px;border-radius:4px;font-size:12px;font-weight:700;cursor:pointer}.editorial-purchase button:hover{border-color:#0b36b8;color:#0b36b8}.editorial-purchase button:disabled{opacity:.5;cursor:wait}
.philosophy{background:#ece9e3;padding:80px max(48px,calc((100vw - 1414px)/2))}.philosophy h2{font-size:clamp(34px,4vw,58px);letter-spacing:-.06em;line-height:1.04;margin:18px 0}.philosophy p{max-width:500px;color:#66635e;line-height:1.6}.philosophy a{display:inline-flex;align-items:center;gap:12px;color:#0c38c5;text-decoration:none;font-weight:700;font-size:14px;margin-top:14px}
@media(max-width:1150px){.showroom,.showroom-inner{min-height:690px}.showroom-inner{grid-template-columns:1fr;padding:30px 28px;align-items:end}.chapter-rail{display:flex;gap:24px;align-self:start}.chapter,.chapter:last-child{min-height:0;border-left:0;padding:0 0 12px;border-bottom:1px solid #aaa}.chapter.active{border-left:0;border-bottom:2px solid #0d36c6}.chapter-dot{display:none}.showroom-copy{align-self:end;padding-bottom:30px}.showroom-photo{left:0;width:100%;object-position:58% center}.showroom-wash{background:linear-gradient(0deg,rgba(247,245,241,.98) 0%,rgba(247,245,241,.93) 43%,rgba(247,245,241,.08) 85%)}.selection{padding:40px 28px 55px}.philosophy{padding:70px 28px}}
@media(max-width:640px){.showroom,.showroom-inner{min-height:790px}.showroom-inner{padding:18px 22px;gap:0}.showroom-photo{height:47%;object-position:62% center}.showroom-wash{background:linear-gradient(0deg,#f7f5f1 20%,rgba(247,245,241,.9) 47%,transparent 72%)}.chapter-rail{gap:12px}.chapter{flex:1}.chapter-copy{gap:1px;font-size:11px}.showroom h1{font-size:45px;margin:12px 0}.showroom-copy>p{font-size:14px}.showroom-index{display:none}.selection{padding:38px 20px 50px}.selection-heading{align-items:start}.selection-heading p{font-size:12px}.catalog-link{display:none}.editorial-grid{grid-template-columns:1fr;gap:34px}.editorial-image-link{aspect-ratio:1.5}.philosophy{padding:65px 20px}}
@media(prefers-reduced-motion:reduce){.showroom-photo,.editorial-image-link img{transition:none}}
</style>
