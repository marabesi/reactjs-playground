import {Item} from "@/app/types";

export interface PersistentRepository {
  createItem(item: Item): Promise<Item>;
  deleteItem(id: string): Promise<void>;
  updateItem(item: Item): Promise<Item>;
  getTableEntries(): Promise<Item[]>;
  getItemById(id: string): Promise<Item | null>;
}