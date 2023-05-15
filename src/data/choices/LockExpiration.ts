import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Add template to update the lock expiration.
 */
export const LOCK_EXPIRATION = {
  id: 'lockExpiration',
  label: 'Lock expiration',
  description: `The locking expiration timeout determines how long until an inactive request gets closed by the server.
  Increasing this value can be useful if people try to make large requests on unstable internet connections.`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
