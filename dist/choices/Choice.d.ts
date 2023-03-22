export interface Choice<T extends string> {
    readonly name: string;
    readonly title: string;
    readonly description: string;
    readonly options: readonly {
        value: T;
        label: string;
    }[];
    readonly default: T;
}
export declare const TRUE = "true";
export declare const FALSE = "false";
export type BooleanOption = typeof TRUE | typeof FALSE;
export declare const ENABLED_DISABLED: readonly [{
    readonly value: "true";
    readonly label: "Enabled";
}, {
    readonly value: "false";
    readonly label: "Disabled";
}];
