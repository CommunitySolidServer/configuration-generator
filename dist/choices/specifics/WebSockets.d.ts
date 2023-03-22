/**
 * Enable (legacy) websockets.
 */
export declare const WEBSOCKETS: {
    readonly name: "webSockets";
    readonly title: "WebSockets";
    readonly description: "Adds support for the deprecated Solid WebSockets API 0.1.\n  This allows users to be notified when resources change, without requiring authentication.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
};
