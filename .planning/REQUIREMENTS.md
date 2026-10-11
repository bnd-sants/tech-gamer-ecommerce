# Requirements: Milestone 2

This document details the functional and non-functional requirements for **Milestone 2: Payments, Admin Dashboard, and Advanced Frontend**.

---

## 💳 1. Payment Integration (Option B)
* **Goal:** Enable checkout processing using Mercado Pago.
* **Requirements:**
  * **Credit Card Flow:** Validate card details in the frontend, generate token using Mercado Pago public key, and submit to `/orders` payload.
  * **Pix Flow:** Generate dynamic Pix payment payloads, display a scanable QR code, and add a "Copy Pix Key" button.
  * **Boleto Flow:** Generate bar codes and display link to download mock/real PDF invoices.
  * **Frictionless UI:** Loaders on confirm action, success check animations, clear payment confirmations.

---

## 🛡️ 2. Admin Dashboard (Option C)
* **Goal:** Enable inventory management and order processing for admins.
* **Requirements:**
  * **Auth Guard Role-Based:** Users with role `admin` gain access to `/admin` routes. Regular users are redirected to homepage with warning alerts.
  * **Admin Sidebar:** Dashboard drawer options (Dashboard Overview, Orders Management, Catalog/Products).
  * **Orders Management:**
    * List all orders from `/orders`.
    * Filter by status (pending, processing, delivered, cancelled).
    * Action button to update order status (e.g. mark as shipped, update tracking codes).
  * **Catalog Management:**
    * Grid or table of all catalog products.
    * Add new product form (validations on fields, name, pricing, stock quantities, image URLs).
    * Edit existing product attributes and adjust inventory levels.

---

## 🌐 3. Advanced Frontend Features (Option D)
* **Goal:** Refine usability, visuals, accessibility, and search visibility.
* **Requirements:**
  * **Multi-Language (i18n):**
    * Install and configure `vue-i18n`.
    * Localize layout shells (Navbar, Footer) and pages (Home, Products, Details, Cart) to Portuguese (`pt`) and English (`en`).
    * Navigation header language dropdown selector.
  * **Visual Animations:**
    * Add scroll-reveal entrance animations for Home catalog listings and layout transitions.
    * Implement micro-animations (scale pulse, border glow increases) on hover of HUD cards.
  * **SEO Optimizations:**
    * Dynamic page title updates (e.g., product details page displays the product title in the browser window).
    * Dynamic meta tags updates (description tags update reactively based on route).
