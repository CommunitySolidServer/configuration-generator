import { Choice } from '../Choice';
import { BACKEND } from '../choices/Backend';
import { INTERNAL } from '../choices/Internal';
import { LOCKING } from '../choices/Locking';
import { Group } from '../Group';

export const DATA = {
  id: 'data',
  label: 'Data management',
  description: 'All options related to where data is stored.',
  entries: [
    INTERNAL,
    BACKEND,
    LOCKING,
  ],
} as const satisfies Group<Choice>;
