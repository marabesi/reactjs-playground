import {PersistentRepository} from "@/persistence/PersistentRepository";
import {Item} from "@/app/types";
import { cookies } from 'next/headers';


class InMemoryRepository implements PersistentRepository {
  private readonly COOKIE_NAME = 'items_storage';

  private async getItems(): Promise<Item[]> {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(this.COOKIE_NAME);
    if (!cookieValue) return [];
    try {
      return JSON.parse(cookieValue.value);
    } catch (error) {
      console.error('Error parsing cookie value:', cookieValue);
      console.error('Error:', error);
      return [];
    }
  }

  private async setItems(items: Item[]): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(this.COOKIE_NAME, JSON.stringify(items), {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
  }

  async createItem(item: Item): Promise<Item> {
    const items = await this.getItems();
    item.id = `${Date.now().toString()}`;
    items.push(item);
    await this.setItems(items);
    return Promise.resolve(item);
  }

  async deleteItem(id: string): Promise<void> {
    const items = await this.getItems();
    const filtered = items.filter(item => item.id !== id);
    await this.setItems(filtered);
    return Promise.resolve();
  }

  async getItemById(id: string): Promise<Item | null> {
    const items = await this.getItems();
    const item = items.find(item => item.id === id);
    return Promise.resolve(item || null);
  }

  async getTableEntries(): Promise<Item[]> {
    const items = await this.getItems();
    return Promise.resolve(items);
  }

  async updateItem(item: Item): Promise<Item> {
    const items = await this.getItems();
    const index = items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      items[index] = item;
      await this.setItems(items);
    }
    return Promise.resolve(item);
  }
}

export const inMemoryRepository = new InMemoryRepository();