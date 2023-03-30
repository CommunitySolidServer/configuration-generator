import { Choice } from './Choice';

export interface Group {
  id: string;
  name: string;
  description: string;
  choices: readonly Choice[]
}
