export type NodeArray<T extends { nodes: unknown[] | null } | null> = Exclude<Exclude<T, null>['nodes'], null>;
export type PropertyDetails<T, K extends keyof T> = Exclude<Exclude<T, null>[K], null>;

export type NonNullProperties<T, K extends keyof T> = T & {
    [P in K]: Exclude<T[P], null>
}
