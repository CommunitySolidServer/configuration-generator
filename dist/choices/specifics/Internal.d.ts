/**
 * How to store internal state data (backend breaks if SPARQL is chosen).
 */
export declare const INTERNAL: {
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
};
