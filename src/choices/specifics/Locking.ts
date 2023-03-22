import { Choice, FALSE } from '../Choice';

/**
 * Which locking method to use. None if undefined (indicate this is unsafe).
 */
export const LOCKING: Choice<'memory' | 'file' | 'redis' | typeof FALSE> = {
  title: 'Locking',
  description: `Which system to use to create locks.
  Locks are used to prevent simultaneous write operations on the same resource.
  Disabling this can cause data corruption.
  In-memory locking is insufficient if multiple workers threads are used.`,
  options: [
    { key: 'memory', label: 'In-memory' },
    { key: 'file', label: 'File system' },
    { key: 'redis', label: 'Redis' },
    { key: FALSE, label: 'Disabled' },
  ],
  default: 'file',
};
