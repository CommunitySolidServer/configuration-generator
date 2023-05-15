import { BooleanOption, Choice, ENABLED_DISABLED, FALSE } from '../Choice';

/**
 * The folder from where the pod templates will be loaded.
 */
export const NOTIFICATION_DURATION = {
  id: 'notificationDuration',
  label: 'Maximum duration of notification subscriptions',
  description: `How long a Notification subscription is allowed to exist before it is automatically removed by the server, in minutes.
  Keeping track of all notification subscriptions forever can create an extra load on the server,
  see the usage <a href="https://communitysolidserver.github.io/CommunitySolidServer/6.x/usage/notifications/#important-note-for-server-owners">documentation</a>
  for more information.</p>
  <p>This needs to be set for every supported Notification channel type.`,
  options: ENABLED_DISABLED,
  default: FALSE,
} as const satisfies Choice<BooleanOption>;
