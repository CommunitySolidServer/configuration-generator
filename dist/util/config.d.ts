import { Import, Option } from './util';
export declare const CONTEXT = "https://linkedsoftwaredependencies.org/bundles/npm/@solid/community-server/^5.0.0/components/context.jsonld";
export declare const CHOICES: {
    readonly initializeRoot: import("../choices/Choice").Choice<import("../choices/Choice").BooleanOption>;
    readonly setup: import("../choices/Choice").Choice<import("../choices/Choice").BooleanOption>;
    readonly webSockets: import("../choices/Choice").Choice<import("../choices/Choice").BooleanOption>;
    readonly https: import("../choices/Choice").Choice<import("../choices/Choice").BooleanOption>;
    readonly restrictAccountApi: import("../choices/Choice").Choice<import("../choices/Choice").BooleanOption>;
    readonly email: import("../choices/Choice").Choice<import("../choices/Choice").BooleanOption>;
    readonly ownership: import("../choices/Choice").Choice<import("../choices/Choice").BooleanOption>;
    readonly registration: import("../choices/Choice").Choice<import("../choices/Choice").BooleanOption>;
    readonly authorization: import("../choices/Choice").Choice<"false" | "wac">;
    readonly backend: import("../choices/Choice").Choice<"memory" | "file" | "sparql" | "pod-quota-file" | "regex">;
    readonly internal: import("../choices/Choice").Choice<"memory" | "resource-store">;
    readonly subdomain: import("../choices/Choice").Choice<import("../choices/Choice").BooleanOption>;
    readonly index: import("../choices/Choice").Choice<import("../choices/Choice").BooleanOption>;
    readonly locking: import("../choices/Choice").Choice<"false" | "memory" | "file" | "redis">;
};
export type Choices = {
    [K in keyof typeof CHOICES]: Option<(typeof CHOICES)[K]>;
};
export interface Config {
    '@context': typeof CONTEXT;
    import: Import[];
    '@graph': unknown[];
}
export interface Override {
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
export declare const DEFAULT_IMPORTS: readonly Import[];
export declare function generateConfig(choices: Choices): Config;
