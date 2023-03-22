/**
 * How to store the data.
 * `regex` writes internal data to the file system and data to SPARQL.
 */
export declare const BACKEND: {
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
};
