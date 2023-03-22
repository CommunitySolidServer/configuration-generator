import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Enable email service for password recovery (requires template to be filled in).
 */
export const EMAIL = {
  name: 'email',
  title: 'E-mail server',
  description: `Configure an e-mail server to be used when users forgot their password.
  This will add a new entry to the configuration JSON that needs to be updated with the credentials of your e-mail server.`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
