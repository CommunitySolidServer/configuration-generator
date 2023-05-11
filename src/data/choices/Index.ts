import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Adds constant converter to be used by GUI apps (this import should just be removed and replaced with a waterfall handler).
 */
export const INDEX = {
  id: 'index',
  label: 'UI converter',
  description: `Convert all requests to a static page in case HTML is requested.
  This is needed when you want to add a UI such as <a href="https://github.com/SolidOS/mashlib">Mashlib</a> or
  <a href="https://gitlab.com/vincenttunru/penny">Penny</a>.
  You will have to update the configuration file with the correct values.`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
