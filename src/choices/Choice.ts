// TODO: perhaps we don't need the key in this object, this can be the actual key of the larger object this is part of
export interface Choice<T extends string | number | symbol> {
  readonly title: string;
  readonly description: string;
  readonly options: readonly { key: T, label: string }[];
  readonly default: T;
}

// Using strings instead of booleans as we are getting input from HTML which is only strings
export const TRUE = 'true';
export const FALSE = 'false';
export type BooleanOption = typeof TRUE | typeof FALSE;
export const ENABLED_DISABLED = [{ key: TRUE, label: 'Enabled' }, { key: FALSE, label: 'Disabled' }] as const;
