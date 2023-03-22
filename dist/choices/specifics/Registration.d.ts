/**
 * Allow registration on the server.
 */
export declare const REGISTRATION: {
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
};
