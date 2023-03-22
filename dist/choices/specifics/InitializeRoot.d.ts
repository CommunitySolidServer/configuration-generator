/**
 * Initialize root as storage and fully accessible (GIVES FULL ACCESS WHICH NEEDS TO BE UPDATED).
 */
export declare const INITIALIZE_ROOT: {
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
};
