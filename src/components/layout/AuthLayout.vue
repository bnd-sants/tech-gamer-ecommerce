<template>
  <main class="auth-shell">
    <div class="auth-scene" aria-hidden="true">
      <img src="/showroom/assembly-03.png" alt="" />
      <span>DESIGN PARA QUEM CONSTRÓI</span>
    </div>
    <div class="auth-side">
      <div class="auth-content">
        <router-link to="/" class="brand">NÚCLEO<span class="brand-dot">.</span></router-link>
        <p class="brand-caption">COMPONENTES EXTRAORDINÁRIOS</p>
        <router-view v-slot="{ Component, route }">
          <Transition name="route-page" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </router-view>
        <router-link to="/" class="home-link">← Voltar à loja</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
.auth-shell{display:grid;grid-template-columns:minmax(0,1fr) minmax(440px,45%);min-height:100vh;background:#f7f6f2;color:#1b1f1d}
.auth-scene{position:relative;overflow:hidden;background:#e9e8e3;display:flex;align-items:center;justify-content:center}.auth-scene img{width:100%;height:100%;object-fit:cover;mix-blend-mode:multiply}.auth-scene span{position:absolute;left:48px;bottom:42px;font-size:.72rem;letter-spacing:.18em;font-weight:700}
.auth-side{display:flex;align-items:center;justify-content:center;padding:58px 32px}.auth-content{width:100%;max-width:470px}.brand{display:inline-block;color:#1b1f1d;text-decoration:none;font-size:2.2rem;font-weight:800;letter-spacing:-.08em;line-height:1}.brand-dot{color:#0c38c5}.brand-caption{font-size:.61rem;font-weight:700;letter-spacing:.22em;color:#757c77;margin:8px 0 47px}.home-link{display:inline-block;margin-top:30px;color:#5a645e;text-decoration:none;font-size:.83rem}.home-link:hover{color:#0c38c5}
.auth-content :deep(.tech-card){background:#fff!important;border:1px solid #e2e4dd!important;box-shadow:none!important;transform:none!important;color:#1b1f1d!important;border-radius:4px!important}.auth-content :deep(.tech-card:hover){border-color:#d6d9d2!important;box-shadow:none!important;transform:none!important}.auth-content :deep(.text-white){color:#1b1f1d!important}.auth-content :deep(.text-grey-lighten-1){color:#6c746e!important}.auth-content :deep(.v-field){background:#fafaf8!important;color:#1b1f1d!important}.auth-content :deep(.v-field__input){color:#1b1f1d!important}.auth-content :deep(.v-label){color:#5b645d!important}.auth-content :deep(.btn-buy-primary){background:#0c38c5!important;color:white!important;box-shadow:none!important;border-radius:2px!important}.auth-content :deep(.btn-buy-primary:hover){background:#082da3!important;box-shadow:none!important}.auth-content :deep(.text-secondary){color:#0c38c5!important}
@media(max-width:850px){.auth-shell{display:block}.auth-scene{display:none}.auth-side{min-height:100vh;padding:40px 20px}.brand-caption{margin-bottom:34px}}
</style>
