/**
 * Enable email service for password recovery (requires template to be filled in).
 */
export declare const EMAIL: {
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
};
