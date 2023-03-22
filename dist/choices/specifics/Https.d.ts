/**
 * Enable HTTPS (and require relevant CLI args).
 */
export declare const HTTPS: {
    readonly name: "https";
    readonly title: "HTTPS";
    readonly description: "Determines if the server should be started for HTTP or HTTPS.\n  If HTTPS is chosen, CLI parameters <code>--httpsKey</code> and <code>--httpsCert</code> need to be provided.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
};
