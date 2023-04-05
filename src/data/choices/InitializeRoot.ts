import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Initialize root as storage and fully accessible (GIVES FULL ACCESS WHICH NEEDS TO BE UPDATED).
 */
export const INITIALIZE_ROOT = {
  name: 'initializeRoot',
  title: 'Initialize root',
  description: `Makes the root of the server accessible for reading and writing data.
  Enabling this will create the relevant authorization resources in the root that allow this.
  <p class="text-danger"><i class="bi bi-exclamation-triangle me-1"></i>
    These authorization resources provide full access to everyone so make sure to immediately update these.
    They will also not disappear after stopping the server and need to be deleted manually afterwards if you use a file system as backend.
  </p>`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
