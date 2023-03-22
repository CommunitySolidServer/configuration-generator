/**
 * How to store internal state data (backend breaks if SPARQL is chosen).
 */
export declare const INTERNAL: {
    readonly name: "internal";
    readonly title: "Internal storage";
    readonly description: "How the data should be stored on the server.\n  In-memory will cause the data to be lost when the server restarts.\n  SPARQL options requires the <code>--sparqlEndpoint</code> CLI parameter to be set.";
    readonly options: readonly [{
        readonly value: "memory";
        readonly label: "In-memory";
    }, {
        readonly value: "resource-store";
        readonly label: "Same as data storage (see below)";
    }];
    readonly default: "resource-store";
};
