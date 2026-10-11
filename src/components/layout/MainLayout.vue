<template>
  <div class="site-shell">
    <header class="nucleo-header">
      <div class="header-inner">
        <button class="mobile-menu" type="button" aria-label="Abrir menu" @click="drawer = true"><v-icon>mdi-menu</v-icon></button>
        <router-link to="/" class="wordmark" aria-label="Núcleo, início">NÚCLEO</router-link>
        <nav class="desktop-nav" aria-label="Categorias">
          <router-link v-for="item in categories" :key="item.label" :to="categoryDestination(item.value)" custom v-slot="{ href, navigate }">
            <a :href="href" :class="{ 'is-current': isCurrentCategory(item.value) }" :aria-current="isCurrentCategory(item.value) ? 'page' : undefined" @click="navigate">{{ item.label }}</a>
          </router-link>
          <router-link to="/build" :class="{ 'is-current': route.name === 'build' }">Montador</router-link>
        </nav>
        <form class="header-search" role="search" @submit.prevent="triggerSearch">
          <v-icon size="20">mdi-magnify</v-icon>
          <input v-model="searchQuery" type="search" aria-label="Buscar produtos" placeholder="Buscar produtos, marcas ou categorias..." />
        </form>
        <div class="header-actions">
          <button class="mobile-search-button" type="button" aria-label="Abrir busca" @click="mobileSearch = !mobileSearch"><v-icon size="23">mdi-magnify</v-icon></button>
          <router-link :to="authStore.isAuthenticated ? '/account/profile' : '/auth/login'" aria-label="Minha conta"><v-icon size="24">mdi-account-outline</v-icon></router-link>
          <router-link to="/cart" class="header-cart" :aria-label="'Carrinho com ' + cartStore.totalItems + (cartStore.totalItems === 1 ? ' item' : ' itens')"><v-icon size="24">mdi-cart-outline</v-icon><span v-if="cartStore.totalItems">{{ cartStore.totalItems }}</span></router-link>
        </div>
      </div>
      <form v-if="mobileSearch" class="mobile-search" role="search" @submit.prevent="triggerSearch"><input v-model="searchQuery" type="search" aria-label="Buscar produtos" placeholder="Buscar produtos..." autofocus /><button type="submit" aria-label="Pesquisar"><v-icon>mdi-arrow-right</v-icon></button></form>
    </header>
    <v-navigation-drawer v-model="drawer" temporary class="nucleo-drawer">
      <div class="drawer-brand">NÚCLEO <button type="button" aria-label="Fechar menu" @click="drawer = false"><v-icon>mdi-close</v-icon></button></div>
      <nav aria-label="Menu principal">
        <router-link to="/" @click="drawer = false">Início</router-link>
        <router-link v-for="item in categories" :key="item.label" :to="categoryDestination(item.value)" custom v-slot="{ href, navigate }">
          <a :href="href" :class="{ 'is-current': isCurrentCategory(item.value) }" :aria-current="isCurrentCategory(item.value) ? 'page' : undefined" @click="navigate($event); drawer = false">{{ item.label }}</a>
        </router-link>
        <router-link to="/build" @click="drawer = false">Montador de setup</router-link>
        <router-link to="/compare" @click="drawer = false">Comparador</router-link>
        <router-link to="/about" @click="drawer = false">Sobre a loja</router-link>
        <router-link :to="authStore.isAuthenticated ? '/account/profile' : '/auth/login'" @click="drawer = false">Minha conta</router-link>
        <button v-if="authStore.isAuthenticated" type="button" @click="handleLogout">Sair</button>
      </nav>
    </v-navigation-drawer>
    <main class="site-main">
      <router-view v-slot="{ Component, route }">
        <Transition name="route-page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </router-view>
    </main>
    <footer class="nucleo-footer">
      <div class="footer-inner">
        <div><router-link to="/" class="wordmark">NÚCLEO</router-link><p>Componentes extraordinários para projetos que merecem atenção em cada detalhe.</p></div>
        <nav aria-label="Rodapé"><router-link to="/products">Catálogo</router-link><router-link to="/build">Montador</router-link><router-link to="/compare">Comparador</router-link><router-link to="/about">Sobre</router-link><router-link to="/cart">Carrinho</router-link><router-link to="/demo-orders">Simulações</router-link><router-link to="/atendimento">Atendimento</router-link><router-link to="/entrega">Entrega</router-link><router-link to="/trocas">Trocas e devoluções</router-link><router-link to="/privacidade">Privacidade</router-link><router-link to="/termos">Condições da loja</router-link></nav>
      </div>
      <div class="footer-bottom">NÚCLEO · Conceito de loja em desenvolvimento</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const cartStore = useCartStore();
const drawer = ref(false);
const mobileSearch = ref(false);
const searchQuery = ref('');
const categories = [
  { label: 'Hardware', value: 'Hardware' },
  { label: 'Periféricos', value: 'Periféricos' },
  { label: 'Monitores', value: 'Monitores' },
  { label: 'Todos os produtos', value: '' },
];
function categoryDestination(value: string) { return value ? { name: 'products', query: { category: value } } : { name: 'products' }; }
function isCurrentCategory(value: string) { return route.name === 'products' && (route.query.category || '') === value; }
function triggerSearch() { if (searchQuery.value.trim()) { router.push({ name: 'products', query: { search: searchQuery.value.trim() } }); mobileSearch.value = false; } }
async function handleLogout() { await authStore.logout(); await cartStore.loadCart(); drawer.value = false; router.push('/'); }
</script>

<style scoped>
.site-shell{min-height:100vh;background:#f7f5f1}.nucleo-header{position:sticky;top:0;z-index:100;background:#f8f7f4;border-bottom:1px solid #dedbd5;color:#171717}.header-inner{max-width:1510px;min-height:72px;padding:0 48px;margin:auto;display:flex;align-items:center;gap:38px}.wordmark{color:#141414;text-decoration:none;font-size:23px;font-weight:800;letter-spacing:.27em;white-space:nowrap}.desktop-nav{display:flex;gap:25px;align-items:center;white-space:nowrap}.desktop-nav a{color:#222;text-decoration:none;font-size:12px;font-weight:600}.desktop-nav a:hover,.desktop-nav a.is-current{color:#0c38c5}.header-search{margin-left:auto;min-width:230px;max-width:350px;width:24vw;height:42px;border:1px solid #dcd8d0;border-radius:4px;background:#faf9f7;display:flex;gap:11px;align-items:center;padding:0 14px}.header-search input,.mobile-search input{width:100%;min-width:0;background:none;border:0;outline:0;color:#1c1c1c;font:inherit;font-size:12px}.header-search input::placeholder,.mobile-search input::placeholder{color:#8b8882}.header-actions{display:flex;align-items:center;gap:22px}.header-actions a,.header-actions button,.mobile-menu{color:#161616;text-decoration:none;background:none;border:0;cursor:pointer;display:flex;align-items:center;justify-content:center}.header-cart{position:relative}.header-cart span{position:absolute;right:-9px;top:-8px;background:#0c38c5;color:#fff;min-width:17px;height:17px;border-radius:50%;font-size:10px;display:grid;place-items:center}.mobile-menu,.mobile-search-button{display:none!important}.mobile-search{display:none}.site-main{min-height:55vh}.nucleo-footer{background:#eeece7;color:#27231f;border-top:1px solid #dedbd5}.footer-inner{max-width:1510px;padding:48px;margin:auto;display:flex;justify-content:space-between;gap:40px}.footer-inner p{max-width:330px;margin:16px 0 0;color:#68635e;font-size:13px;line-height:1.6}.footer-inner nav{display:flex;gap:35px;align-items:start}.footer-inner nav a{color:#27231f;text-decoration:none;font-size:13px}.footer-inner nav a:hover{color:#0c38c5}.footer-bottom{max-width:1414px;margin:auto;padding:16px 0;border-top:1px solid #d4d0c8;color:#77716b;font-size:11px}.nucleo-drawer{background:#f8f7f4!important;color:#171717!important}.drawer-brand{display:flex;align-items:center;justify-content:space-between;padding:22px;font-size:22px;font-weight:800;letter-spacing:.25em;border-bottom:1px solid #e1ded8}.drawer-brand button{background:none;border:0}.nucleo-drawer nav{display:grid;padding:12px}.nucleo-drawer nav a,.nucleo-drawer nav button{padding:14px 10px;color:#171717;text-align:left;text-decoration:none;background:none;border:0;font:inherit;font-size:15px;border-bottom:1px solid #e6e3de}
.nucleo-drawer nav a.is-current,.nucleo-drawer nav a.router-link-exact-active{color:#0c38c5;font-weight:700;background:#eef1f8}
.footer-inner nav{flex-wrap:wrap;column-gap:24px;row-gap:12px}
@media(max-width:1250px){.header-inner{gap:24px;padding:0 28px}.desktop-nav{gap:15px}.desktop-nav a{font-size:11px}.header-search{min-width:170px}}
@media(max-width:1050px){.desktop-nav{display:none}.header-search{width:35vw}.mobile-menu{display:flex!important}.footer-bottom{margin:0 28px}}
@media(max-width:640px){.header-inner{min-height:62px;padding:0 20px;gap:16px}.wordmark{font-size:19px;letter-spacing:.21em}.header-search{display:none}.header-actions{margin-left:auto;gap:15px}.mobile-search-button{display:flex!important}.mobile-search{display:flex;height:51px;align-items:center;padding:0 20px;border-top:1px solid #e5e2dc;gap:14px}.mobile-search button{background:none;border:0}.footer-inner{padding:42px 20px;display:block}.footer-inner nav{margin-top:30px}.footer-bottom{margin:0 20px}}
</style>
