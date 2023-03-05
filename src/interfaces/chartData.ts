export interface ChartData {
  labels: [];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string[];
      hoverOffset: number;
    }
  ];
}
