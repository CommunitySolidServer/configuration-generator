export interface Choice<T extends string = string> {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly options: readonly { value: T, label: string }[];
  readonly default: T;
}

// Using strings instead of booleans as we are getting input from HTML which is only strings
export const TRUE = 'true';
export const FALSE = 'false';
export type BooleanOption = typeof TRUE | typeof FALSE;
export const ENABLED_DISABLED = [
  { value: TRUE, label: 'Enabled' },
  { value: FALSE, label: 'Disabled' }
] as const satisfies Choice<BooleanOption>['options'];
