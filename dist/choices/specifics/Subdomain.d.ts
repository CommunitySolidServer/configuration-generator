/**
 * Use subdomain URLs when generating pods.
 */
export declare const SUBDOMAIN: {
    readonly name: "subdomain";
    readonly title: "Pod URLs";
    readonly description: "How URLs for new pods should be created, appending the name to the base URL as a suffix, or using it as a subdomain.";
    readonly options: readonly [{
        readonly value: "false";
        readonly label: "Suffix (<code>https://example.com/test/</code>)";
    }, {
        readonly value: "true";
        readonly label: "Subdomain (<code>https://test.example.com/</code>)";
    }];
    readonly default: "false";
};
