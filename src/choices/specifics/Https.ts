import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Enable HTTPS (and require relevant CLI args).
 */
export const HTTPS: Choice<BooleanOption> = {
  title: 'HTTPS',
  description: `Determines if the server should be started for HTTP or HTTPS.
  If HTTPS is chosen, CLI parameters <code>--httpsKey</code> and <code>--httpsCert</code> need to be provided.`,
  options: ENABLED_DISABLED,
  default: FALSE,
}
