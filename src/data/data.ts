import { Choice } from './Choice';
import { ADVANCED } from './groups/Advanced';
import { DATA } from './groups/Data';
import { MISC } from './groups/Misc';
import { PODS } from './groups/Pods';
import { SECURITY } from './groups/Security';

export const GROUPS = [
  DATA,
  SECURITY,
  PODS,
  MISC,
  ADVANCED,
] as const;

// TODO: check if easier is possible
// Creates type where the keys are the possible Choice names, and the corresponding value is an option of that Choice.
type ArrayElement<TArray> = TArray extends readonly (infer TEntry)[] ? TEntry : never;
type NamedChoice<TChoice, TName> = TChoice & { name: TName };
type ChoiceObject = ArrayElement<ArrayElement<typeof GROUPS>['choices']>;
type ChoiceMap = { [K in ChoiceObject['name']]: NamedChoice<ChoiceObject, K> };
type Option<T> = T extends Choice<infer K> ? K : never;
export type Choices = { [K in keyof ChoiceMap]: Option<ChoiceMap[K]> };
