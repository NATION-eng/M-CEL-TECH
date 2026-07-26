/** Plain, serializable shape passed from server components into client components. */
export type CohortSummary = {
  id: string;
  name: string;
  startTime: string | null;
  endTime: string | null;
  spotsLeft: number;
  isFull: boolean;
};
