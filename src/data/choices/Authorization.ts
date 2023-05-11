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
    Do not switch between WAC and ACP on an existing server
    if its data was previously was configured with the other system.
`,
  options: [
    { value: 'wac', label: 'Web Access Control' },
    { value: 'acp', label: 'Access Control Policy' },
    { value: FALSE, label: 'Disabled' }
  ],
  default: 'wac',
} as const satisfies Choice<'wac' | 'acp' | typeof FALSE>;
