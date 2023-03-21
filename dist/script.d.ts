declare const CONTEXT = "https://linkedsoftwaredependencies.org/bundles/npm/@solid/community-server/^5.0.0/components/context.jsonld";
interface Choices {
    initializeRoot: boolean;
    setup: boolean;
    webSockets: boolean;
    https: boolean;
    restrictIdpApi: boolean;
    email: boolean;
    ownership: boolean;
    registration: boolean;
    authorization?: 'wac';
    backend: 'file' | 'memory' | 'sparql' | 'pod-quota-file' | 'regex';
    internal: 'memory' | 'resource-store';
    subdomain: boolean;
    index: boolean;
    locking?: 'file' | 'memory' | 'redis';
}
type Import = `css:config/${string}/${string}/${string}.json`;
interface Config {
    '@context': typeof CONTEXT;
    import: Import[];
    '@graph': unknown[];
}
interface Override {
    '@id'?: string;
    comment: string;
    '@type': 'Override';
    overrideInstance: {
        '@id': string;
    };
    overrideParameters: Record<string, unknown> & {
        '@type': string;
    };
}
declare const DEFAULT_IMPORTS: readonly Import[];
declare function generateImport(group: string, entry: string, choice: string): Import;
declare function getServerFactoryImport(webSockets: boolean, https: boolean): Import;
declare function generateImports(choices: Choices): Import[];
declare function generateOverride(instance: string, type: string, comment: string, params: Record<string, unknown>): Override;
declare function generateBody(choices: Choices): unknown[];
declare function generateConfig(choices: Choices): Config;
