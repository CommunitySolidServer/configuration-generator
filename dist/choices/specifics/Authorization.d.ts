/**
 * Authorization method. None if undefined (indicate this is unsafe).
 */
export declare const AUTHORIZATION: {
    readonly name: "authorization";
    readonly title: "Authorization";
    readonly description: "The authorization system to restrict who can access resources.\n  Disabling this allows everyone to access and modify all resources on the server.";
    readonly options: readonly [{
        readonly value: "wac";
        readonly label: "Web Access Control";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
};
