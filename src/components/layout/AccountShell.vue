<template>
  <main class="account-page">
    <div class="account-inner">
      <header class="account-intro">
        <p class="eyebrow">NÚCLEO / SUA CONTA</p>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </header>
      <div class="account-layout">
        <nav class="account-nav" aria-label="Navegação da conta">
          <p class="nav-title">MINHA CONTA</p>
          <router-link to="/account/profile" class="nav-link" active-class="active"><v-icon size="19">mdi-account-outline</v-icon> Meu perfil <v-icon size="16" class="nav-arrow">mdi-arrow-up-right</v-icon></router-link>
          <router-link to="/account/orders" class="nav-link" active-class="active"><v-icon size="19">mdi-package-variant-closed</v-icon> Pedidos / simulações <v-icon size="16" class="nav-arrow">mdi-arrow-up-right</v-icon></router-link>
          <router-link to="/favorites" class="nav-link" active-class="active"><v-icon size="19">mdi-heart-outline</v-icon> Favoritos <v-icon size="16" class="nav-arrow">mdi-arrow-up-right</v-icon></router-link>
          <div class="nav-note"><span>CONSTRUÍDO PARA VOCÊ</span><p>Suas escolhas, num só lugar.</p></div>
        </nav>
        <section class="account-panel" :aria-labelledby="headingId">
          <div class="panel-top"><div><p class="eyebrow">{{ sectionLabel }}</p><h2 :id="headingId">{{ sectionTitle }}</h2></div><span class="panel-mark">N.</span></div>
          <slot />
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  sectionLabel: string;
  sectionTitle: string;
  headingId: string;
}>();
</script>

<style scoped>
.account-page{min-height:76vh;background:#f7f6f2;color:#1b1e1c;padding:70px 28px 115px}.account-inner{max-width:1240px;margin:auto}.eyebrow{font-size:11px;color:#0c38c5;font-weight:800;letter-spacing:.2em}.account-intro{margin-bottom:45px}.account-intro h1{font-size:clamp(44px,5vw,68px);line-height:1.06;letter-spacing:-.065em;font-weight:700;margin:13px 0}.account-intro>p:last-child{color:#666d67;max-width:610px;line-height:1.65}.account-layout{display:grid;grid-template-columns:260px minmax(0,1fr);gap:25px;align-items:start}.account-nav,.account-panel{background:#fff;border:1px solid #e5e6df}.account-nav{padding:25px 18px}.nav-title{font-size:10px;letter-spacing:.2em;font-weight:800;color:#7c837d;margin:4px 12px 17px}.nav-link{display:flex;align-items:center;gap:13px;color:#343a36;text-decoration:none;padding:13px 12px;border-radius:2px;font-size:13px;font-weight:600}.nav-link:hover,.nav-link.active{background:#f0f2f7;color:#0c38c5}.nav-arrow{margin-left:auto;opacity:0}.nav-link:hover .nav-arrow,.nav-link.active .nav-arrow{opacity:1}.nav-note{border-top:1px solid #e8eae4;margin:23px 12px 0;padding-top:23px}.nav-note span{font-size:9px;letter-spacing:.18em;color:#0c38c5;font-weight:800}.nav-note p{font-size:12px;color:#757c76;margin-top:6px}.account-panel{padding:43px 46px 48px;min-height:400px;min-width:0}.panel-top{display:flex;justify-content:space-between;align-items:start;border-bottom:1px solid #e8eae4;padding-bottom:22px;margin-bottom:24px}.panel-top h2{font-size:32px;letter-spacing:-.045em;font-weight:700;margin-top:7px}.panel-mark{font-size:31px;letter-spacing:-.1em;font-weight:800;color:#d3d9ec}
@media(max-width:850px){.account-page{padding:42px 20px 80px}.account-layout{grid-template-columns:1fr}.account-nav{display:flex;gap:6px;flex-wrap:wrap;padding:12px}.nav-title,.nav-note,.nav-arrow{display:none}.nav-link{font-size:12px;padding:11px}.account-panel{padding:30px}}
@media(max-width:600px){.account-page{padding:36px 16px 70px}.account-panel{padding:24px 20px}.panel-top h2{font-size:27px}}
</style>
