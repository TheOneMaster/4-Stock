export type NodeArray<T extends { nodes: unknown[] | null } | null> = Exclude<Exclude<T, null>['nodes'], null>;
export type PropertyDetails<T, K extends keyof T> = Exclude<Exclude<T, null>[K], null>;
