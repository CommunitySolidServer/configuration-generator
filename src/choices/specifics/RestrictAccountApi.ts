import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Also apply authorization rules to IDP API (GIVES FULL ACCESS WHICH NEEDS TO BE UPDATED).
 */
export const RESTRICT_ACCOUNT_API: Choice<BooleanOption> = {
  title: 'Restrict account API',
  description: `Use the chosen authorization method for the account-related APIs such as registration.
  This will create the necessary authorization resources
  in the <code>/.well-known/</code> and <code>/idp/</code> containers providing full access to everyone,
  so make sure to update these with the correct values.`,
  options: ENABLED_DISABLED,
  default: FALSE,
}
