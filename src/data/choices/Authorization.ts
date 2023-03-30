import { Choice, FALSE } from '../Choice';

/**
 * Authorization method. None if undefined (indicate this is unsafe).
 */
export const AUTHORIZATION = {
  name: 'authorization',
  title: 'Authorization',
  description: `The authorization system to restrict who can access resources.
  Disabling this allows everyone to access and modify all resources on the server.`,
  options: [{ value: 'wac', label: 'Web Access Control' }, { value: FALSE, label: 'Disabled' }],
  default: FALSE,
} as const satisfies Choice<'wac' | typeof FALSE>;
