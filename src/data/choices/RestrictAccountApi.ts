import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Also apply authorization rules to IDP API (GIVES FULL ACCESS WHICH NEEDS TO BE UPDATED).
 */
export const RESTRICT_ACCOUNT_API = {
  id: 'restrictAccountApi',
  label: 'Restrict account API',
  description: `Use the chosen authorization method for the account-related APIs such as registration.
  This can be used to only allow authorized requests of specific WebIDs to register accounts.
  If enabled, the necessary authorization resources will be created
  in the <code>/.well-known/</code> and <code>/idp/</code> containers providing full access to everyone,
  so make sure to update these with the correct values.`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
