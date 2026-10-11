# Phase 1 Plan: Advanced Frontend Refinements

This plan outlines the steps to implement **i18n localization**, **scroll-reveal transitions**, and **dynamic SEO meta tags** in the Vue 3 application.

---

## 🎯 Phase Objectives
* Localize the entire application in Portuguese (`pt`) and English (`en`).
* Provide a clean header language selector dropdown.
* Implement smooth, responsive transitions between pages and entrance animation reveals.
* Automatically update tab titles and SEO metadata during route changes.

---

## 📋 Task Breakdown

### Task 1.1: Install and Configure `vue-i18n`
* **Objective:** Install localization plugin and bootstrap the plugin loader.
* **INPUT:** Raw project dependencies.
* **OUTPUT:** `vue-i18n` installed, configuration created in `src/plugins/i18n.ts`, and loaded in `src/plugins/index.ts`.
* **VERIFY:** Verify that `package.json` contains `vue-i18n` and running the build succeeds.

### Task 1.2: Base Translation Messages & Layout Selector
* **Objective:** Setup translations for headers, footers, and dashboard drawers, and add a language selection tool in the Navbar.
* **INPUT:** `src/components/layout/MainLayout.vue`.
* **OUTPUT:** Locales files (`src/locales/pt.json` and `src/locales/en.json`) and a dropdown language selector added to the MainLayout header.
* **VERIFY:** Clicking the language selector dynamically changes header words (e.g. "INÍCIO" / "HOME", "PRODUTOS" / "PRODUCTS") instantly.

### Task 1.3: Views Localization
* **Objective:** Translate all views (Home, Products catalog, Details, Cart, Checkout, Profile, Orders, and Auth flows) using the `$t()` helper.
* **INPUT:** Existing `.vue` views.
* **OUTPUT:** Complete translations in locales files and views refactored to use i18n keys.
* **VERIFY:** Swapping language toggles translates catalog page headers, buy buttons, labels, and order summaries.

### Task 1.4: Dynamic Transitions & Hover Animations
* **Objective:** Add premium animations for page routing and card elements.
* **INPUT:** `src/router/index.ts` and `src/style.css`.
* **OUTPUT:** Layout routes wrapped in `<router-view v-slot="{ Component }"> <v-fade-transition mode="out-in"> <component :is="Component" /> </v-fade-transition> </router-view>` and scroll reveals integrated into Home listings.
* **VERIFY:** Navigating between pages triggers a smooth fade transition instead of an instant load.

### Task 1.5: Router SEO Hooks
* **Objective:** Automatically update window titles and descriptions based on active views.
* **INPUT:** `src/router/index.ts`.
* **OUTPUT:** Router metadata `meta: { title: '...', description: '...' }` defined on routes and `router.afterEach` hook updating `document.title` and head meta elements.
* **VERIFY:** Navigating to the catalog updates browser tab title to "TechGamer // Catalog" or similar.
