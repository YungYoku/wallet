import type { MessageDate } from "./messageData";

export interface Message {
  date: MessageDate;
  message: string;
  name: string;
}
