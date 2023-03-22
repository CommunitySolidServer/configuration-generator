import { Choice } from './Choice';
export declare const CHOICES: readonly [{
    readonly name: "internal";
    readonly title: "Internal storage";
    readonly description: "How internal data should be stored, such as account data.\n  Data stored in memory will be lost on server restart.";
    readonly options: readonly [{
        readonly value: "memory";
        readonly label: "In-memory";
    }, {
        readonly value: "resource-store";
        readonly label: "Same as data storage (see below)";
    }];
    readonly default: "resource-store";
}, {
    readonly name: "backend";
    readonly title: "Data storage";
    readonly description: "How the data should be stored on the server.\n  In-memory will cause the data to be lost when the server restarts.\n  SPARQL options requires the <code>--sparqlEndpoint</code> CLI parameter to be set.";
    readonly options: readonly [{
        readonly value: "memory";
        readonly label: "In-memory";
    }, {
        readonly value: "file";
        readonly label: "File system";
    }, {
        readonly value: "sparql";
        readonly label: "SPARQL endpoint (requires in-memory internal storage)";
    }, {
        readonly value: "pod-quota-file";
        readonly label: "File system (with a pod quota)";
    }, {
        readonly value: "regex";
        readonly label: "SPARQL endpoint (using file system for internal data)";
    }];
    readonly default: "file";
}, {
    readonly name: "locking";
    readonly title: "Locking";
    readonly description: "Which system to use to create locks.\n  Locks are used to prevent simultaneous write operations on the same resource.\n  Disabling this can cause data corruption.\n  In-memory locking is insufficient if multiple workers threads are used.";
    readonly options: readonly [{
        readonly value: "memory";
        readonly label: "In-memory";
    }, {
        readonly value: "file";
        readonly label: "File system";
    }, {
        readonly value: "redis";
        readonly label: "Redis";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "file";
}, {
    readonly name: "registration";
    readonly title: "Registration";
    readonly description: "Allow users to register new accounts and pods on the server.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "true";
}, {
    readonly name: "webSockets";
    readonly title: "WebSockets";
    readonly description: "Adds support for the deprecated Solid WebSockets API 0.1.\n  This allows users to be notified when resources change, without requiring authentication.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
}, {
    readonly name: "https";
    readonly title: "HTTPS";
    readonly description: "Determines if the server should be started for HTTP or HTTPS.\n  If HTTPS is chosen, CLI parameters <code>--httpsKey</code> and <code>--httpsCert</code> need to be provided.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
}, {
    readonly name: "email";
    readonly title: "E-mail server";
    readonly description: "Configure an e-mail server to be used when users forgot their password.\n  This will add a new entry to the configuration JSON that needs to be updated with the credentials of your e-mail server.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
}, {
    readonly name: "authorization";
    readonly title: "Authorization";
    readonly description: "The authorization system to restrict who can access resources.\n  Disabling this allows everyone to access and modify all resources on the server.";
    readonly options: readonly [{
        readonly value: "wac";
        readonly label: "Web Access Control";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
}, {
    readonly name: "subdomain";
    readonly title: "Pod URLs";
    readonly description: "How URLs for new pods should be created, appending the name to the base URL as a suffix, or using it as a subdomain.";
    readonly options: readonly [{
        readonly value: "false";
        readonly label: "Suffix (<code>https://example.com/test/</code>)";
    }, {
        readonly value: "true";
        readonly label: "Subdomain (<code>https://test.example.com/</code>)";
    }];
    readonly default: "false";
}, {
    readonly name: "initializeRoot";
    readonly title: "Initialize root";
    readonly description: "Marks the root of the server as a storage and writes the necessary authorization resources so it can be accessed.\n  This allows everyone to edit the data on the server so make sure to update those to have the correct values.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
}, {
    readonly name: "setup";
    readonly title: "Setup";
    readonly description: "Requires a setup procedure to occur after starting the server. \n  This can be used to create a pod immediately on the server.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
}, {
    readonly name: "ownership";
    readonly title: "Ownership verification";
    readonly description: "Verifies that someone is the owner of an external WebID if they try to register an account with it.\n  Disabling this means this server should not be trusted for authentication.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "true";
}];
type ArrayElement<TArray> = TArray extends readonly (infer TEntry)[] ? TEntry : never;
type NamedChoice<TChoices, TName> = ArrayElement<TChoices> & {
    name: TName;
};
type ChoiceMap = {
    [K in ArrayElement<typeof CHOICES>['name']]: NamedChoice<typeof CHOICES, K>;
};
type Option<T> = T extends Choice<infer K> ? K : never;
export type Choices = {
    [K in keyof ChoiceMap]: Option<ChoiceMap[K]>;
};
export {};
