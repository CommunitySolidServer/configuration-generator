import { Choices } from '../choices/choices';
export type Import = `css:config/${string}/${string}/${string}.json`;
/**
 * Generates an import string for the given settings.
 */
export declare function generateImport(group: string, entry: string, choice: string): Import;
/**
 * Fixed import values that never change.
 */
export declare const DEFAULT_IMPORTS: readonly Import[];
/**
 * Generate all necessary imports based on the provided choices.
 */
export declare function generateImports(choices: Choices): Import[];
