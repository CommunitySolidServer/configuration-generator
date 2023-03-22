/**
 * Which locking method to use. None if undefined (indicate this is unsafe).
 */
export declare const LOCKING: {
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
};
