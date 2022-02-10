import type { Category } from "@/interfaces/category";
import type { Message } from "@/interfaces/message";
import type { Purchase } from "@/interfaces/purchase";

export interface Budget {
  balance: number;
  categories: Category[];
  chat: Message[];
  name: string;
  purchases: Purchase[];
}
