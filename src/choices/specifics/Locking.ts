import { Choice, FALSE } from '../Choice';

/**
 * Which locking method to use. None if undefined (indicate this is unsafe).
 */
export const LOCKING = {
  name: 'locking',
  title: 'Locking',
  description: `Which system to use to create locks.
  Locks are used to prevent simultaneous write operations on the same resource.
  Disabling this can cause data corruption.
  In-memory locking is insufficient if multiple workers threads are used.`,
  options: [
    { value: 'memory', label: 'In-memory' },
    { value: 'file', label: 'File system' },
    { value: 'redis', label: 'Redis' },
    { value: FALSE, label: 'Disabled' },
  ],
  default: 'file',
} as const satisfies Choice<'memory' | 'file' | 'redis' | typeof FALSE>;
