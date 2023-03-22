export interface Choice<T extends string | number | symbol> {
    readonly title: string;
    readonly description: string;
    readonly options: readonly {
        key: T;
        label: string;
    }[];
    readonly default: T;
}
export declare const TRUE = "true";
export declare const FALSE = "false";
export type BooleanOption = typeof TRUE | typeof FALSE;
export declare const ENABLED_DISABLED: readonly [{
    readonly key: "true";
    readonly label: "Enabled";
}, {
    readonly key: "false";
    readonly label: "Disabled";
}];
