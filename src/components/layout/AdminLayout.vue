<template>
  <div class="admin-shell">
    <aside class="admin-sidebar">
      <router-link to="/admin" class="brand" aria-label="NÚCLEO, painel administrativo"><span>NÚCLEO</span><small>PAINEL</small></router-link>
      <div class="account-label"><span class="account-avatar">N.</span><div><strong>{{ authStore.user?.name || 'Administrador' }}</strong><small>{{ isDemo ? 'Sessão de demonstração' : 'Área administrativa' }}</small></div></div>
      <nav aria-label="Navegação do painel" class="side-nav">
        <router-link to="/admin" exact-active-class="active"><v-icon size="19">mdi-view-dashboard-outline</v-icon> Visão geral <v-icon size="16" class="nav-arrow">mdi-arrow-up-right</v-icon></router-link>
        <router-link to="/admin/catalog" active-class="active"><v-icon size="19">mdi-format-list-bulleted</v-icon> Catálogo <v-icon size="16" class="nav-arrow">mdi-arrow-up-right</v-icon></router-link>
        <router-link to="/admin/orders" active-class="active"><v-icon size="19">mdi-package-variant-closed</v-icon> Pedidos <v-icon size="16" class="nav-arrow">mdi-arrow-up-right</v-icon></router-link>
      </nav>
      <div class="sidebar-bottom"><router-link to="/"><v-icon size="18">mdi-arrow-left</v-icon> Voltar à loja</router-link><button type="button" @click="handleLogout"><v-icon size="18">mdi-logout</v-icon> Sair da conta</button></div>
    </aside>
    <div class="admin-main">
      <header class="admin-topbar"><div><span class="eyebrow">NÚCLEO / OPERAÇÃO</span><strong>{{ pageTitle }}</strong></div><span class="mode-badge">{{ isDemo ? 'PRÉVIA LOCAL' : 'PAINEL ADMINISTRATIVO' }}</span></header>
      <div v-if="isDemo" class="demo-notice"><v-icon size="18">mdi-information-outline</v-icon><p>Esta sessão mostra a estrutura do painel. Produtos de demonstração não representam estoque real; pedidos e pagamentos não são operacionais.</p></div>
      <div class="admin-content"><router-view v-slot="{ Component }"><transition name="route-page" mode="out-in"><component :is="Component" /></transition></router-view></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const isDemo = computed(() => authStore.token === 'mock-admin-token-xyz');
const pageTitle = computed(() => route.name === 'admin-catalog' ? 'Catálogo' : route.name === 'admin-orders' ? 'Pedidos' : 'Visão geral');
async function handleLogout() { await authStore.logout(); router.push({ name: 'home' }); }
</script>

<style scoped>
.admin-shell{min-height:100vh;display:grid;grid-template-columns:258px minmax(0,1fr);background:#f7f6f2;color:#1b1e1c}.admin-sidebar{background:#fff;border-right:1px solid #e4e5de;display:flex;flex-direction:column;min-height:100vh}.brand{min-height:95px;display:flex;align-items:center;justify-content:space-between;padding:0 26px;color:#171a18;text-decoration:none;border-bottom:1px solid #e8e9e2}.brand span{font-size:22px;letter-spacing:.22em;font-weight:800}.brand small{font-size:10px;color:#0c38c5;font-weight:800;letter-spacing:.18em}.account-label{display:flex;align-items:center;gap:12px;padding:27px 20px;border-bottom:1px solid #e8e9e2;min-width:0}.account-avatar{width:39px;height:39px;flex:none;display:grid;place-items:center;background:#e8ecf9;color:#0c38c5;font-weight:800}.account-label div{display:grid;gap:3px;min-width:0}.account-label strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px}.account-label small{font-size:11px;color:#7b827c}.side-nav{padding:25px 13px;display:grid;gap:5px}.side-nav a{display:flex;align-items:center;gap:13px;padding:13px;color:#454d46;text-decoration:none;font-size:13px;font-weight:700}.side-nav a:hover,.side-nav a.active{background:#f0f2f7;color:#0c38c5}.nav-arrow{margin-left:auto;opacity:0}.side-nav a:hover .nav-arrow,.side-nav a.active .nav-arrow{opacity:1}.sidebar-bottom{margin-top:auto;padding:20px 17px;border-top:1px solid #e8e9e2;display:grid;gap:3px}.sidebar-bottom a,.sidebar-bottom button{display:flex;align-items:center;gap:12px;width:100%;padding:12px 9px;color:#465049;text-decoration:none;background:none;border:0;font:inherit;font-size:12px;font-weight:700;text-align:left;cursor:pointer}.sidebar-bottom a:hover,.sidebar-bottom button:hover{color:#0c38c5}.admin-main{min-width:0}.admin-topbar{min-height:95px;padding:20px clamp(24px,4vw,58px);display:flex;align-items:center;justify-content:space-between;gap:20px;background:#fff;border-bottom:1px solid #e4e5de}.admin-topbar>div{display:grid;gap:5px}.eyebrow{font-size:10px;color:#0c38c5;letter-spacing:.2em;font-weight:800}.admin-topbar strong{font-size:22px;letter-spacing:-.045em}.mode-badge{border:1px solid #d8dfef;color:#0c38c5;padding:9px 12px;font-size:10px;letter-spacing:.14em;font-weight:800;white-space:nowrap}.demo-notice{display:flex;align-items:center;gap:12px;padding:14px clamp(24px,4vw,58px);background:#e9edf7;color:#304778}.demo-notice p{font-size:12px;line-height:1.55}.admin-content{max-width:1550px;margin:auto;padding:50px clamp(24px,4vw,58px) 80px}
@media(max-width:900px){.admin-shell{grid-template-columns:1fr}.admin-sidebar{min-height:0;border-right:0;border-bottom:1px solid #e4e5de}.brand{min-height:65px}.account-label{display:none}.side-nav{display:flex;overflow:auto;padding:8px 16px}.side-nav a{white-space:nowrap;padding:10px 12px}.nav-arrow{display:none}.sidebar-bottom{display:none}.admin-topbar{min-height:74px}}
@media(max-width:560px){.admin-content{padding:32px 17px 65px}.admin-topbar{padding:16px 17px}.mode-badge{font-size:9px;padding:7px}.brand{padding:0 17px}.demo-notice{padding:12px 17px;align-items:start}}
</style>
