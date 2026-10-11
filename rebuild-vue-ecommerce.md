# Rebuild Tech Gamer E-Commerce in Vue 3 (from scratch)

This plan details the migration of the `tech-gamer-ecommerce` application from React to Vue 3 using Vuetify, Pinia, and Vite.

- **Project Type:** WEB (Vue 3 + TypeScript + Vite)
- **Primary Agent:** `frontend-specialist` (supported by `project-planner`)
- **Key Skills:** `frontend-mastery`, `clean-code`

---

## 🎯 Success Criteria
1. **Zero React Footprint:** All React files, configurations, and dependencies removed.
2. **Vue 3 + TypeScript Setup:** High-performance, type-safe Vue 3 setup running on Vite.
3. **Vuetify Custom Design:** Premium customized dark-theme gaming aesthetics (no standard Vuetify look, strict adherence to the Purple Ban 🚫).
4. **Pinia Stores:** Fully functional reactive state management for `auth` and `cart`.
5. **Feature Parity:** All pages (Home, Catalog, Details, Cart, Checkout, Profile, Orders, and Auth flows) fully functional.
6. **Zero Lint/Build Errors:** Application builds cleanly using `npm run build`.

---

## 🛠️ Tech Stack
- **Framework:** Vue 3 (Composition API with `<script setup>`)
- **Build Tool:** Vite
- **Language:** TypeScript (Strict Mode)
- **UI Library:** Vuetify 3 (with custom theme variables and SASS custom styling)
- **Icons:** Material Design Icons (`@mdi/font`)
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **HTTP Client:** Axios
- **Form Validation:** Form validation via Vuetify rules or Vee-Validate + Yup

---

## 📁 File Structure
```
tech-gamer-ecommerce/
├── public/
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/         # Shared/Reusable UI components
│   │   ├── common/         # ProductCard, ThemeToggle, LoadingOverlay
│   │   └── layout/         # Header, Footer, Sidebar
│   ├── plugins/            # Vuetify, Pinia configs
│   │   ├── vuetify.ts      # Custom theme setup
│   │   └── index.ts        # Plugin loader
│   ├── router/             # Navigation guards & routes
│   │   └── index.ts
│   ├── services/           # Axios API service (migrated from React)
│   │   └── api.ts
│   ├── stores/             # Pinia stores (auth, cart)
│   │   ├── auth.ts
│   │   └── cart.ts
│   ├── types/              # Type definitions (User, Product, Cart, Order)
│   │   └── index.ts
│   ├── views/              # View pages
│   │   ├── HomeView.vue
│   │   ├── ProductsView.vue
│   │   ├── ProductDetailsView.vue
│   │   ├── CartView.vue
│   │   ├── CheckoutView.vue
│   │   ├── auth/           # Login, Register, ForgotPassword
│   │   └── profile/        # Profile, Orders, Favorites
│   ├── App.vue             # Root layout and theme wrapper
│   └── main.ts             # Application bootstrapper
├── .env.development
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 📋 Task Breakdown

### Phase 1: Cleaning and Setup
#### Task 1.1: Reset Workspace
- **Agent:** `devops-engineer`
- **Dependencies:** None
- **INPUT:** Existing React file structure
- **OUTPUT:** Clean folder containing only `.git` and configuration templates
- **VERIFY:** Check `C:\Users\Bernardo\Desktop\Loja Ecommerce\tech-gamer-ecommerce` to confirm React directories (`src`, `.storybook`, etc.) are deleted.

#### Task 1.2: Initialize Vue 3 + TypeScript
- **Agent:** `frontend-specialist`
- **Dependencies:** Task 1.1
- **INPUT:** Clean directory
- **OUTPUT:** Standard Vite Vue 3 TS project template
- **VERIFY:** Verify the presence of `vite.config.ts`, `tsconfig.json`, and basic `src/` structure.

---

### Phase 2: Dependencies and Custom Theme
#### Task 2.1: Install Dependencies
- **Agent:** `frontend-specialist`
- **Dependencies:** Task 1.2
- **INPUT:** Barebones `package.json`
- **OUTPUT:** `package.json` updated with `vuetify`, `pinia`, `vue-router`, `axios`, `@mdi/font`, and `sass`.
- **VERIFY:** Run `npm install` and check the generated `node_modules` and `package-lock.json`.

#### Task 2.2: Configure Vuetify with Custom Gamer Theme
- **Agent:** `frontend-specialist`
- **Dependencies:** Task 2.1
- **INPUT:** Raw Vuetify setup
- **OUTPUT:** `src/plugins/vuetify.ts` configuring a premium dark gamer theme (Dark grey background, neon blue accents `#00d2ff`, warning red `#ff3e3e`, zero violet/purple hex codes to satisfy the Purple Ban).
- **VERIFY:** Run `npm run dev` to verify the theme loads and styles compile without SASS errors.

---

### Phase 3: Core Infrastructure (API, Router, and Pinia Stores)
#### Task 3.1: Axios API Service & Type Mapping
- **Agent:** `backend-specialist` / `frontend-specialist`
- **Dependencies:** Task 2.1
- **INPUT:** React `api.ts` file content for reference
- **OUTPUT:** `src/services/api.ts` and `src/types/index.ts` migrated to Vue / standard Axios TS.
- **VERIFY:** Run `npx tsc --noEmit` to confirm no compilation issues with types or service imports.

#### Task 3.2: Auth Store (Pinia)
- **Agent:** `frontend-specialist`
- **Dependencies:** Task 3.1
- **INPUT:** Auth logic (Login, register, token refresh, local storage persistence)
- **OUTPUT:** `src/stores/auth.ts` Pinia store
- **VERIFY:** Store is loadable, manages JWT token, refresh token, and persists user state.

#### Task 3.3: Cart Store (Pinia)
- **Agent:** `frontend-specialist`
- **Dependencies:** Task 3.1
- **INPUT:** Cart logic (Add, update quantity, remove, apply coupon, shipping options)
- **OUTPUT:** `src/stores/cart.ts` Pinia store synchronized with API
- **VERIFY:** Store calculates subtotal, totals, and interacts with checkout.

#### Task 3.4: Router Setup and Navigation Guards
- **Agent:** `frontend-specialist`
- **Dependencies:** Tasks 3.2, 3.3
- **INPUT:** Routes configuration from React Router
- **OUTPUT:** `src/router/index.ts` implementing vue-router with Protected Route metadata for authenticated paths (checkout, profile, orders, favorites).
- **VERIFY:** Ensure navigation guards redirect unauthenticated users to `/auth/login`.

---

### Phase 4: Layouts and Views Implementation
#### Task 4.1: Shell Layouts
- **Agent:** `frontend-specialist`
- **Dependencies:** Task 3.4
- **INPUT:** Main and Auth layout requirements
- **OUTPUT:** `MainLayout.vue` and `AuthLayout.vue` using Vuetify components (`v-app-bar`, `v-navigation-drawer`, `v-footer`, `v-main`).
- **VERIFY:** Responsive menu drawer and responsive header work seamlessly on mobile and desktop viewports.

#### Task 4.2: Auth Views
- **Agent:** `frontend-specialist`
- **Dependencies:** Task 4.1
- **INPUT:** Login, Register, Forgot Password, Reset Password views
- **OUTPUT:** `.vue` components under `src/views/auth/`
- **VERIFY:** Interactive validation states work, submitting inputs calls the Auth store.

#### Task 4.3: Home & Catalog Views (Catalog, Details)
- **Agent:** `frontend-specialist`
- **Dependencies:** Task 4.1
- **INPUT:** Product Listing, filters, search, and details views
- **OUTPUT:** `HomeView.vue`, `ProductsView.vue`, `ProductDetailsView.vue` with custom Vuetify card components and loading skeletons.
- **VERIFY:** Filters (category, price range, stock) reactively update query parameters and trigger API requests.

#### Task 4.4: Transactional Views (Cart, Checkout)
- **Agent:** `frontend-specialist`
- **Dependencies:** Tasks 3.3, 4.1
- **INPUT:** Cart page, shipping calculator, checkout forms (payment options, address validation)
- **OUTPUT:** `CartView.vue` and `CheckoutView.vue`
- **VERIFY:** Order items submit successfully, coupon code discount triggers totals update, payment options validate fields.

#### Task 4.5: Profile & Order History Views
- **Agent:** `frontend-specialist`
- **Dependencies:** Tasks 3.2, 4.1
- **INPUT:** Profile editing, Order history, Order details, and Favorites pages
- **OUTPUT:** Views under `src/views/profile/`
- **VERIFY:** Lists orders and updates profile fields reactively.

---

## 🔍 Phase X: Verification Checklist
Before completing the migration, the following checks must run and pass:
- [x] **Lint & Build:** Run `npm run lint && npm run build` to guarantee zero errors or warnings.
- [x] **Type Check:** Run `npx tsc --noEmit` and check for TS issues.
- [x] **Rule Check:**
  - [x] Socratic Gate was respected.
  - [x] **Purple Ban:** Zero purple/violet hex codes in stylesheets or Vuetify themes.
  - [x] **Premium UI/UX:** High contrast gaming themes, custom rounded styles (extreme styling chosen, e.g. 2px sharp corners for gamer vibe), micro-animations for hover feedback.
- [x] **Runtime Validation:** Application boots on `npm run dev` and navigates smoothly between all pages.

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass (no unused variables, strict lint settings pass)
- Security: ✅ No critical issues (zero-vulnerability audit in npm install)
- Build: ✅ Success (production build compiled successfully in 1.21s)
- Date: 2026-06-18
