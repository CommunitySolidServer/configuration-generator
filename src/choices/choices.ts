import { Choice } from './Choice';
import { AUTHORIZATION } from './specifics/Authorization';
import { BACKEND } from './specifics/Backend';
import { EMAIL } from './specifics/Email';
import { HTTPS } from './specifics/Https';
import { INDEX } from './specifics/Index';
import { INITIALIZE_ROOT } from './specifics/InitializeRoot';
import { INTERNAL } from './specifics/Internal';
import { LOCKING } from './specifics/Locking';
import { OWNERSHIP } from './specifics/Ownership';
import { REGISTRATION } from './specifics/Registration';
import { RESTRICT_ACCOUNT_API } from './specifics/RestrictAccountApi';
import { SETUP } from './specifics/Setup';
import { SUBDOMAIN } from './specifics/Subdomain';
import { WEBSOCKETS } from './specifics/WebSockets';

export const CHOICES = [
  INTERNAL,
  BACKEND,
  LOCKING,
  REGISTRATION,
  WEBSOCKETS,
  HTTPS,
  EMAIL,
  AUTHORIZATION,
  SUBDOMAIN,
  INITIALIZE_ROOT,
  SETUP,
  OWNERSHIP,
  RESTRICT_ACCOUNT_API,
  INDEX,
] as const;

// TODO: check if easier is possible
// Creates type where the keys are the possible Choice names, and the corresponding value is an option of that Choice.
type ArrayElement<TArray> = TArray extends readonly (infer TEntry)[] ? TEntry : never;
type NamedChoice<TChoices, TName> = ArrayElement<TChoices> & { name: TName };
type ChoiceMap = { [K in ArrayElement<typeof CHOICES>['name']]: NamedChoice<typeof CHOICES, K> };
type Option<T> = T extends Choice<infer K> ? K : never;
export type Choices = { [K in keyof ChoiceMap]: Option<ChoiceMap[K]> };
