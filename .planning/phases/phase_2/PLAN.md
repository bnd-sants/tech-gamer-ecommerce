# Phase 2 Plan: Payment Gateway Integration

This plan outlines the steps to integrate payment processing (Credit Card tokenization, Pix payloads, and Boleto invoices) using Mercado Pago SDK patterns.

---

## 🎯 Phase Objectives
* Implement card fields validation and mock Mercado Pago tokenization logic.
* Setup dynamic Pix QR Code displays with copying capability.
* Create a downloadable print-ready Boleto slip overlay/mock.
* Provide robust UX loading states and transactional validations during payment.

---

## 📋 Task Breakdown

### Task 2.1: Mercado Pago SDK Script Loader
* **Objective:** Load the Mercado Pago v2 JavaScript SDK script securely in `index.html` or dynamically.
* **INPUT:** `index.html`.
* **OUTPUT:** Mercado Pago script tag added `<script src="https://sdk.mercadopago.com/js/v2"></script>`.
* **VERIFY:** Verify that `window.MercadoPago` is defined inside the console or mount hooks.

### Task 2.2: Credit Card Validation & Tokenization
* **Objective:** Validate fields, handle focus, and simulate card token generation using public keys.
* **INPUT:** `src/views/CheckoutView.vue`.
* **OUTPUT:** Form inputs validated (via rules or regex) and mock call to `mp.createCardToken()` returning a token payload.
* **VERIFY:** Submitting a card validates number/cvv, shows "Processing Transaction...", and returns a mock token ID.

### Task 2.3: Dynamic Pix QR Code & Copy Helper
* **Objective:** Enhance the Pix success flow with interactive visual overlays.
* **INPUT:** `src/views/CheckoutView.vue`.
* **OUTPUT:** Generated QR codes and clipboard copy feedback animations.
* **VERIFY:** Checking Pix method displays QR images and clicking "Copiar Código Pix" triggers a transient checkmark alert.

### Task 2.4: Boleto Slip Downloads
* **Objective:** Generate a mock printable Boleto slip with barcode lines and receipt details.
* **INPUT:** `src/views/CheckoutView.vue` and a new modal view.
* **OUTPUT:** Boleto barcode string generated, showing a modal with print layouts.
* **VERIFY:** Selecting Boleto and finalizing generates a code `34191.79001 01043.513184 91020.150008 7 90000000123456` and displays a "Print Invoice" button.
