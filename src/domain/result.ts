export type Result<T, E extends Error> = 
    { readonly kind: "ok"; readonly value: T}
    | { readonly kind: "error"; readonly error: E };