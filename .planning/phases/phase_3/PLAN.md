# Phase 3 Plan: Admin Dashboard Screens & Inventories

This plan outlines the steps to build the Admin area for the `tech-gamer-ecommerce` application, implementing access control, the administration shell layout, the order tracking dashboard, and the mock catalog management controls.

---

## 🎯 Phase Objectives
* Restrict access to `/admin` routes via route metadata role-guard checks.
* Implement a sidebar/drawer layout (`AdminLayout.vue`) with a technical dark/neon cyber aesthetic.
* Provide an Orders listing with status transitions (e.g., Pending -> Delivered, Cancelled) and inputting tracking codes.
* Provide a Catalog management screen with simulated modals for adding new products and altering stock levels.
* Add developer shortcuts to simulate logging in as an administrator.

---

## 📋 Task Breakdown

### Task 3.1: Route Guard Role Check
* **Objective:** Intercept routing to `/admin` sub-paths, checking if the authenticated user has `role === 'admin'`. If not, redirect them to the home page or a NotFound screen.
* **INPUT:** `src/router/index.ts`.
* **OUTPUT:** Add routes for `/admin` nested under an admin route guard check checking `authStore.isAdmin`.
* **VERIFY:** Navigating to `/admin` while logged out or logged in as a normal user redirects to home (`/`) or auth login, while logging in as admin grants access.

### Task 3.2: Admin Layout & Dashboard Navigation
* **Objective:** Design the administration layout shell (`AdminLayout.vue`) featuring sidebar navigation to Admin Dashboard, Orders, and Catalog panels.
* **INPUT:** `src/components/layout/AdminLayout.vue` (new file) or routing structure.
* **OUTPUT:** Layout component implementing a navigation drawer, custom header, and content viewport. Consistent with sharp 0px corners, dark black-grey backgrounds (`#121212`, `#1e1e1e`), and neon blue/green accents.
* **VERIFY:** Navigating between admin views renders the layout wrapper with active links highlighted in neon.

### Task 3.3: Orders Listing & Fulfillment Controls
* **Objective:** List orders in a control grid allowing admins to filter by status, transition order states, and update tracking details.
* **INPUT:** `src/views/admin/OrdersView.vue` (new file) or simulation stores.
* **OUTPUT:** Orders dashboard displaying order lists, items, totals, and actions (Mark as Delivered, Cancel, Input Tracking code).
* **VERIFY:** Clicking status change buttons fires mock service actions and updates the local item details in place.

### Task 3.4: Catalog Management & Stock Modals
* **Objective:** View existing inventory in a tabular layout, allowing stock adjustments and adding/editing items through custom dialogs.
* **INPUT:** `src/views/admin/CatalogView.vue` (new file) and the main product lists.
* **OUTPUT:** Catalog panel showing products, SKUs, and stock quantities. Dialog popup forms for product details.
* **VERIFY:** Modifying product stock or adding a new entry triggers success notifications and updates the local view as defined by Option B.
