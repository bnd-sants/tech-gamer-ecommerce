import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { CartItem } from '@/types';

const storageKey = '@nucleo:demo_orders';

export interface DemoOrderItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
}

export interface DemoOrder {
  id: string;
  createdAt: string;
  status: 'demo';
  items: DemoOrderItem[];
  subtotal: number;
}

function readOrders(): DemoOrder[] {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return Array.isArray(value) ? value.filter((order): order is DemoOrder =>
      order?.status === 'demo' && typeof order.id === 'string' && typeof order.createdAt === 'string' &&
      Number.isFinite(order.subtotal) && Array.isArray(order.items) && order.items.every((item: DemoOrderItem) =>
        typeof item.productId === 'string' && typeof item.name === 'string' && Number.isInteger(item.quantity) && item.quantity > 0 && Number.isFinite(item.unitPrice)
      )
    ).slice(0, 20) : [];
  } catch { return []; }
}

export const useDemoOrdersStore = defineStore('demoOrders', () => {
  const orders = ref<DemoOrder[]>(readOrders());
  const count = computed(() => orders.value.length);

  function create(items: CartItem[]): DemoOrder {
    if (!items.length) throw new Error('Adicione produtos antes de concluir a demonstração.');
    const snapshot: DemoOrderItem[] = items.map(item => ({
      productId: item.id,
      name: item.name,
      image: item.images?.[0] || '',
      quantity: item.quantity,
      unitPrice: item.price,
    }));
    const order: DemoOrder = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'demo',
      items: snapshot,
      subtotal: Math.round(snapshot.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) * 100) / 100,
    };
    const nextOrders = [order, ...orders.value].slice(0, 20);
    localStorage.setItem(storageKey, JSON.stringify(nextOrders));
    orders.value = nextOrders;
    return order;
  }

  function find(id: string) { return orders.value.find(order => order.id === id); }
  function clear() { orders.value = []; localStorage.removeItem(storageKey); }

  return { orders, count, create, find, clear };
});
