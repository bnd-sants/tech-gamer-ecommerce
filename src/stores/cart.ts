import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Cart, Product, CartItem } from '@/types';

const storageKey = '@techgamer:cart_items';

function emptyCart(): Cart {
  return { id: '', items: [], subtotal: 0, discount: 0, shipping: 0, total: 0, totalItems: 0, coupon: '', createdAt: '', updatedAt: '' };
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart>(emptyCart());
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalItems = computed(() => cart.value.totalItems);

  function update(items: CartItem[]) {
    const validItems = items.filter(item => item && typeof item.id === 'string' && Number.isFinite(item.price) && item.price >= 0 && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99);
    const subtotal = Math.round(validItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100) / 100;
    cart.value = { ...emptyCart(), items: validItems, subtotal, total: subtotal, totalItems: validItems.reduce((sum, item) => sum + item.quantity, 0) };
    localStorage.setItem(storageKey, JSON.stringify(validItems));
  }

  async function loadCart() {
    error.value = null;
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      update(Array.isArray(stored) ? stored : []);
    } catch {
      update([]);
      error.value = 'Não foi possível restaurar o carrinho salvo neste navegador.';
    }
  }

  async function addToCart(product: Product, quantity = 1) {
    if (!Number.isInteger(quantity) || quantity < 1 || !product.inStock) throw new Error('Produto indisponível.');
    const items = [...cart.value.items];
    const existing = items.find(item => item.id === product.id);
    const nextQuantity = (existing?.quantity || 0) + quantity;
    if (nextQuantity > 99 || (product.stockQuantity > 0 && nextQuantity > product.stockQuantity)) throw new Error('Quantidade acima do limite disponível.');
    if (existing) existing.quantity = nextQuantity;
    else items.push({ ...product, quantity });
    update(items);
  }

  async function updateItemQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) return removeFromCart(itemId);
    if (!Number.isInteger(quantity) || quantity > 99) throw new Error('Quantidade inválida.');
    const current = cart.value.items.find(item => item.id === itemId);
    if (current?.stockQuantity !== undefined && current.stockQuantity > 0 && quantity > current.stockQuantity) throw new Error('Quantidade acima do limite disponível.');
    update(cart.value.items.map(item => item.id === itemId ? { ...item, quantity } : item));
  }

  async function removeFromCart(itemId: string) { update(cart.value.items.filter(item => item.id !== itemId)); }
  async function clearCart() { update([]); }
  async function syncLocalCart() { await loadCart(); }

  return { cart, loading, error, totalItems, loadCart, addToCart, updateItemQuantity, removeFromCart, clearCart, syncLocalCart };
});
