import { Choice, FALSE } from '../Choice';

/**
 * Notification method(s). None if undefined.
 */
export const NOTIFICATIONS = {
  name: 'notifications',
  title: 'Notification method',
  description: `Which methods can be used to be notified of changes to resources.
  These are based on the latest Solid Notifications specification.
  "Legacy WebSockets" is an implementation of the deprecated Solid WebSockets API 0.1
  and allows users to receive notifications for resources they do not have access to.`,
  options: [
    { value: 'all', label: 'WebSockets & WebHooks' },
    { value: 'websockets', label: 'WebSockets' },
    { value: 'webhooks', label: 'WebHooks' },
    { value: 'legacy-websockets', label: 'Legacy WebSockets' },
    { value: 'disabled', label: 'Disabled' }
  ],
  default: 'websockets',
} as const satisfies Choice<'all' | 'websockets' | 'webhooks' | 'legacy-websockets' | 'disabled'>;
