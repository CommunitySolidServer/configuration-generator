import { Choice } from './Choice';
import { Group } from './Group';
import { ADVANCED } from './groups/Advanced';
import { DATA } from './groups/Data';
import { MISC } from './groups/Misc';
import { PARAMETERS } from './groups/Parameters';
import { PODS } from './groups/Pods';
import { SECURITY } from './groups/Security';

export const GROUPS = [
  DATA,
  SECURITY,
  PODS,
  MISC,
  ADVANCED,
  PARAMETERS,
] as const satisfies readonly Group<Choice>[];

// TODO: check if easier is possible
// Creates type where the keys are the possible Choice names, and the corresponding value is an option of that Choice.
type ArrayElement<TArray> = TArray extends readonly (infer TEntry)[] ? TEntry : never;
type NamedChoice<TChoice, TId> = TChoice & { id: TId };
export type ChoiceObject = ArrayElement<ArrayElement<typeof GROUPS>['entries']>;
// Not sure why this intermediate type is needed but otherwise the typings don't work out
type ChoiceMap = { [K in ChoiceObject['id']]: NamedChoice<ChoiceObject, K> };
export type Option<T> = T extends Choice<infer K> ? K : never;
export type Choices = { [K in ChoiceObject['id']]: Option<ChoiceMap[K]> };
