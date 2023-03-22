import { Choices } from '../choices/choices';
import { Import } from './imports';
export declare const CONTEXT = "https://linkedsoftwaredependencies.org/bundles/npm/@solid/community-server/^5.0.0/components/context.jsonld";
export interface Config {
    '@context': typeof CONTEXT;
    import: Import[];
    '@graph': unknown[];
}
/**
 * Generate a configuration based on the provided choices.
 */
export declare function generateConfig(partialChoices: Partial<Choices>): Config;
