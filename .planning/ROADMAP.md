# ROADMAP: Milestone 2

This roadmap breaks down the milestone tasks into sequential, verifiable phases.

---

## 📅 Phase Breakdown

### Phase 1: Advanced Frontend Refinements (i18n, Transition, SEO)
* **Goal:** Set up localizations, scroll reveals, and route-based metadata.
* **Tasks:**
  * [x] **Task 1.1:** Install and configure `vue-i18n`. Add locales for English (`en`) and Portuguese (`pt`).
  * [x] **Task 1.2:** Implement Language Toggle selector in header Navbar. Translate MainLayout and Home page.
  * [x] **Task 1.3:** Translate catalog, details, cart, and checkout pages.
  * [x] **Task 1.4:** Incorporate scroll entrance animations and layout view transitions.
  * [x] **Task 1.5:** Dynamic route-based Title and meta description updating hooks.

---

### Phase 2: Payment Gateway Integration (Mercado Pago / Stripe)
* **Goal:** Configure payment APIs, secure cards tokens, and dynamic receipt overlays.
* **Tasks:**
  * [x] **Task 2.1:** Implement checkout services and integrate Mercado Pago mock/real scripts.
  * [x] **Task 2.2:** Form credit card validation and tokenization submissions.
  * [x] **Task 2.3:** Add dynamic Pix payload generator displaying QR codes and copying buffers.
  * [x] **Task 2.4:** Add mock Boleto barcode downloads.

---

### Phase 3: Admin Dashboard Screens & Inventories
* **Goal:** Create admin dashboard layout, order listings, and catalog editors.
* **Tasks:**
  * [x] **Task 3.1:** Setup route role middleware guard checks blocking non-admin profiles.
  * [x] **Task 3.2:** Build Admin layout shell and dashboard sidebar navigation.
  * [x] **Task 3.3:** Build Orders listing and order fulfillment status update controls.
  * [x] **Task 3.4:** Build Catalog management listing with adding and editing product modals.

---

### Phase 4: Final Auditing & Verification
* **Goal:** Validate builds, security scans, and accessibility tests.
* **Tasks:**
  * [ ] **Task 4.1:** Double check all typescript types compiled cleanly (`npm run build`).
  * [ ] **Task 4.2:** Double check rules (Purple Ban 🚫, Sharp edges verified).
