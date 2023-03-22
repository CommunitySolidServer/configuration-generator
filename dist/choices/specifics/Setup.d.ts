/**
 * Require setup to be performed.
 */
export declare const SETUP: {
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
};
