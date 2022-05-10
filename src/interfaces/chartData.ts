interface Dataset {
  data: number[];
  backgroundColor: string[];
}

export interface ChartData {
  datasets: Dataset[];
}
