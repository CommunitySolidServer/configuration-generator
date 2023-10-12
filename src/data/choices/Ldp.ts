import { BooleanOption, Choice, ENABLED_DISABLED, TRUE } from '../Choice';

/**
 * Enable or disable LDP.
 */
export const LDP = {
  id: 'ldp',
  label: 'Solid protocol',
  description: `Enables support for the core Solid protocol.
  This can be disabled if you want a server that only handles OIDC and accounts.`,
  options: ENABLED_DISABLED,
  default: TRUE,
} as const satisfies Choice<BooleanOption>;
