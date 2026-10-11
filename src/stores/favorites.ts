import { defineStore } from 'pinia';
import { ref } from 'vue';

const STORAGE_KEY = '@techgamer:favorites';

function storedIds(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === 'string'))] : [];
  } catch {
    return [];
  }
}

export const useFavoritesStore = defineStore('favorites', () => {
  const ids = ref<string[]>(storedIds());

  function has(id: string) {
    return ids.value.includes(id);
  }

  function toggle(id: string) {
    ids.value = has(id) ? ids.value.filter((savedId) => savedId !== id) : [...ids.value, id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.value));
  }

  function refresh() {
    ids.value = storedIds();
  }

  return { ids, has, toggle, refresh };
});
