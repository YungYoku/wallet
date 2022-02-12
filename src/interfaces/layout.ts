import type { VueElement } from "vue";

export interface Layout {
  StandardLayout: VueElement;
  EmptyLayout: VueElement;

  [key: string]: VueElement;
}
