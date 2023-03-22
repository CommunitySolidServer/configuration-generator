/**
 * Enable ownership checks for WebID registration (UNSAFE IF DISABLED).
 */
export declare const OWNERSHIP: {
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
};
