export interface ModifiedConfig {
    '@context': string | string[];
    import: string[];
    '@graph': unknown[];
}
export declare function parseConfigParameter(input?: string | null): Promise<Partial<ModifiedConfig>>;
export declare function applyExternalConfig(config: ModifiedConfig, external: Partial<ModifiedConfig>): void;
