import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Require setup to be performed.
 */
export const SETUP: Choice<BooleanOption> = {
  title: 'Setup',
  description: `Requires a setup procedure to occur after starting the server. 
  This can be used to create a pod immediately on the server.`,
  options: ENABLED_DISABLED,
  default: FALSE,
};
