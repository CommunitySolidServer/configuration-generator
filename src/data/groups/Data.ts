import { Choice } from '../Choice';
import { AUTHORIZATION } from '../choices/Authorization';
import { BACKEND } from '../choices/Backend';
import { INTERNAL } from '../choices/Internal';
import { LDP } from '../choices/Ldp';
import { LOCKING } from '../choices/Locking';
import { Group } from '../Group';

export const DATA = {
  id: 'data',
  label: 'Data management',
  description: 'All options related to how data is stored.',
  entries: [
    BACKEND,
    AUTHORIZATION,
    LDP,
    INTERNAL,
    LOCKING,
  ],
} as const satisfies Group<Choice>;
