export type TableDefinition<T extends Record<string, any>> = {
  headers: Record<keyof T, string>
  rows: T
}
