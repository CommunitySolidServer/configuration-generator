import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * Enable (legacy) websockets.
 */
export const WEBSOCKETS = {
  name: 'webSockets',
  title: 'WebSockets',
  description: `Adds support for the deprecated Solid WebSockets API 0.1.
  This allows users to be notified when resources change, without requiring authentication.
  <p class="text-danger"><i class="bi bi-exclamation-triangle me-1"></i>
    Authorization is not required, meaning everyone can see when private resources are updated.
  </p>`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
