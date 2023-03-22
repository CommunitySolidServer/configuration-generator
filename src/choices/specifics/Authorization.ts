import { BooleanOption, Choice, FALSE } from '../Choice';

/**
 * Authorization method. None if undefined (indicate this is unsafe).
 */
export const AUTHORIZATION: Choice<'wac' | typeof FALSE> = {
  title: 'Authorization',
  description: `The authorization system to restrict who can access resources.
  Disabling this allows everyone to access and modify all resources on the server.`,
  options: [{ key: 'wac', label: 'Web Access Control' }, { key: FALSE, label: 'Disabled' }],
  default: FALSE,
};
