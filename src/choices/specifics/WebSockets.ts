import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Enable (legacy) websockets.
 */
export const WEBSOCKETS: Choice<BooleanOption> = {
  title: 'WebSockets',
  description: `Adds support for the deprecated Solid WebSockets API 0.1.
  This allows users to be notified when resources change, without requiring authentication.`,
  options: ENABLED_DISABLED,
  default: FALSE,
};
