import { Choice } from '../choices/Choice';

export type Import = `css:config/${string}/${string}/${string}.json`;

export type Option<T> = T extends Choice<infer K> ? K : never;

export function generateImport(group: string, entry: string, choice: string): Import {
  return `css:config/${group}/${entry}/${choice}.json`;
}
