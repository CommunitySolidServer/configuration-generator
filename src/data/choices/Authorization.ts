import { Choice, FALSE } from '../Choice';

/**
 * Authorization method. None if undefined (indicate this is unsafe).
 */
export const AUTHORIZATION = {
  id: 'authorization',
  label: 'Authorization',
  description: `The authorization system to restrict who can access resources.
  </p><p class="text-danger"><i class="bi bi-exclamation-triangle me-1"></i>
    Disabling this allows everyone to access and modify all resources on the server.
  </p><p class="text-danger"><i class="bi bi-exclamation-triangle me-1"></i>
    If you have a running server and want to switch between authorization systems,
    you will also have to replace the relevant authorization resources as,
    for example, ACP can not interpret WAC authorization resources.
`,
  options: [
    { value: 'wac', label: 'Web Access Control' },
    { value: 'acp', label: 'Access Control Policy' },
    { value: FALSE, label: 'Disabled' }
  ],
  default: 'wac',
} as const satisfies Choice<'wac' | 'acp' | typeof FALSE>;
