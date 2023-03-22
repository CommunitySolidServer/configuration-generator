/**
 * Adds constant converter to be used by GUI apps (this import should just be removed and replaced with a waterfall handler).
 */
export declare const INDEX: {
    readonly name: "index";
    readonly title: "UI converter";
    readonly description: "Convert all requests to a static page in case HTML is requested.\n  This is needed when you want to add a UI such as <a href=\"https://github.com/SolidOS/mashlib\">Mashlib</a> or\n  <a href=\"https://gitlab.com/vincenttunru/penny\">Penny</a>.\n  You will have to update the configuration file with the correct values.";
    readonly options: readonly [{
        readonly value: "true";
        readonly label: "Enabled";
    }, {
        readonly value: "false";
        readonly label: "Disabled";
    }];
    readonly default: "false";
};
