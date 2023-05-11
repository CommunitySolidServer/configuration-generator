export interface Group<T> {
  id: string;
  label: string;
  description: string;
  entries: readonly T[]
}
