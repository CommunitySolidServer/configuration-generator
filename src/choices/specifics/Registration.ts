import { BooleanOption, Choice, ENABLED_DISABLED, TRUE } from '../Choice';

/**
 * Allow registration on the server.
 */
export const REGISTRATION = {
  name: 'registration',
  title: 'Registration',
  description: `Allow users to register new accounts and pods on the server.`,
  options: ENABLED_DISABLED,
  default: TRUE,
} as const satisfies Choice<BooleanOption>;
