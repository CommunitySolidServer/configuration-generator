import { BooleanOption, Choice, ENABLED_DISABLED, TRUE } from '../Choice';

/**
 * Enable ownership checks for WebID registration (UNSAFE IF DISABLED).
 */
export const OWNERSHIP = {
  name: 'ownership',
  title: 'Ownership verification',
  description: `Verifies that someone is the owner of an external WebID if they try to register an account with it.
  Disabling this means this server should not be trusted for authentication.`,
  options: ENABLED_DISABLED,
  default: TRUE,
} as const satisfies Choice<BooleanOption>;
