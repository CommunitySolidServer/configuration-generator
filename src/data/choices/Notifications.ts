import { Choice, FALSE } from '../Choice';

/**
 * Notification method(s). None if undefined.
 */
export const NOTIFICATIONS = {
  name: 'notifications',
  title: 'Notification method',
  description: `TODO`,
  options: [
    { value: 'all', label: 'WebSockets & WebHooks' },
    { value: 'websockets', label: 'WebSockets' },
    { value: 'webhooks', label: 'WebHooks' },
    { value: 'legacy-websockets', label: 'Legacy WebSockets' },
    { value: 'disabled', label: 'Disabled' }
  ],
  default: 'websockets',
} as const satisfies Choice<'all' | 'websockets' | 'webhooks' | 'legacy-websockets' | 'disabled'>;
