import type { Component } from "vue";

export interface Layout {
  StandardLayout: Component;
  EmptyLayout: Component;

  [key: string]: Component;
}
