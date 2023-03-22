/**
 * Also apply authorization rules to IDP API (GIVES FULL ACCESS WHICH NEEDS TO BE UPDATED).
 */
export declare const RESTRICT_ACCOUNT_API: {
    readonly name: "restrictAccountApi";
    readonly title: "Restrict account API";
    readonly description: "Use the chosen authorization method for the account-related APIs such as registration.\n  This will create the necessary authorization resources\n  in the <code>/.well-known/</code> and <code>/idp/</code> containers providing full access to everyone,\n  so make sure to update these with the correct values.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
};
