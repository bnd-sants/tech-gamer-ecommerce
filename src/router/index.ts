import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/components/layout/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: { title: 'Início' },
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('@/views/ProductsView.vue'),
        meta: { title: 'Produtos' },
      },
      {
        path: 'products/:id',
        name: 'product-details',
        component: () => import('@/views/ProductDetailsView.vue'),
        meta: { title: 'Detalhes do Produto' },
      },
      {
        path: 'compare',
        name: 'compare',
        component: () => import('@/views/CompareView.vue'),
        meta: { title: 'Comparar Componentes' },
      },
      {
        path: 'build',
        name: 'build',
        component: () => import('@/views/SetupBuilderView.vue'),
        meta: { title: 'Montador de Setup' },
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/CartView.vue'),
        meta: { title: 'Carrinho de Compras' },
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import('@/views/CheckoutView.vue'),
        meta: { title: 'Finalização' },
      },
      { path: 'demo-orders', name: 'demo-orders', component: () => import('@/views/DemoOrdersView.vue'), meta: { title: 'Simulações' } },
      { path: 'demo-orders/:id', name: 'demo-order', component: () => import('@/views/DemoOrdersView.vue'), meta: { title: 'Simulação concluída' } },
      {
        path: 'favorites',
        name: 'favorites',
        component: () => import('@/views/profile/FavoritesView.vue'),
        meta: { requiresAuth: true, title: 'Meus Favoritos' },
      },
      {
        path: 'account',
        redirect: '/account/profile',
        meta: { requiresAuth: true },
        children: [
          {
            path: 'profile',
            name: 'profile',
            component: () => import('@/views/profile/ProfileView.vue'),
            meta: { title: 'Meu Perfil' },
          },
          {
            path: 'orders',
            name: 'orders',
            component: () => import('@/views/profile/OrdersView.vue'),
            meta: { title: 'Meus Pedidos' },
          },
          {
            path: 'orders/:id',
            name: 'order-details',
            component: () => import('@/views/profile/OrderDetailsView.vue'),
            meta: { title: 'Detalhes do Pedido' },
          },
        ],
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
        meta: { title: 'Sobre Nós' },
      },
      {
        path: 'deals',
        name: 'deals',
        component: () => import('@/views/DealsView.vue'),
        meta: { title: 'Seleção NÚCLEO' },
      },
      ...([
        ['atendimento', 'Atendimento'],
        ['entrega', 'Entrega'],
        ['trocas', 'Trocas e devoluções'],
        ['privacidade', 'Privacidade'],
        ['termos', 'Condições da loja'],
      ] as const).map(([path, title]) => ({ path, name: path, component: () => import('@/views/StoreInformationView.vue'), meta: { title } })),
    ],
  },
  {
    path: '/auth',
    component: () => import('@/components/layout/AuthLayout.vue'),
    meta: { guestOnly: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { title: 'Entrar na Conta' },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/RegisterView.vue'),
        meta: { title: 'Criar Conta' },
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/auth/ForgotPasswordView.vue'),
        meta: { title: 'Recuperar Acesso' },
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/views/auth/ResetPasswordView.vue'),
        meta: { title: 'Redefinir Senha' },
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/components/layout/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { title: 'Painel de Controle Admin' },
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('@/views/admin/OrdersView.vue'),
        meta: { title: 'Gerenciar Pedidos' },
      },
      {
        path: 'catalog',
        name: 'admin-catalog',
        component: () => import('@/views/admin/CatalogView.vue'),
        meta: { title: 'Produtos & Estoque' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Página não encontrada' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const isAdmin = authStore.isAdmin;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'home' });
  } else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});

// Hook para atualizar dinamicamente o título da página (Task 1.5)
router.afterEach((to) => {
  const baseTitle = 'NÚCLEO';
  const pageTitle = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle;
  document.title = pageTitle;
});

export default router;
