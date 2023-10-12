import { BooleanOption, Choice, ENABLED_DISABLED, TRUE } from '../Choice';

/**
 * Enable or disable OIDC.
 */
export const OIDC = {
  id: 'oidc',
  label: 'OpenID provider',
  description: `Allows the server to generate the necessary tokens and interactions for an OIDC session.
  You need this if you want to use the server to log in to Solid applications.`,
  options: ENABLED_DISABLED,
  default: TRUE,
} as const satisfies Choice<BooleanOption>;
