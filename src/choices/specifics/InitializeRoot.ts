import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Initialize root as storage and fully accessible (GIVES FULL ACCESS WHICH NEEDS TO BE UPDATED).
 */
export const INITIALIZE_ROOT: Choice<BooleanOption> = {
  title: 'Initialize root',
  description: `Marks the root of the server as a storage and writes the necessary authorization resources so it can be accessed.
  This allows everyone to edit the data on the server so make sure to update those to have the correct values.`,
  options: ENABLED_DISABLED,
  default: FALSE,
}
