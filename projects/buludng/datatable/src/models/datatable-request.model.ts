export interface DataTableRequest {
    searchValue: string;
    page: number;
    length: number;
    sortColumn?: DataTableColumn;
}

export interface DataTableColumn {
    name: string;
    sortDir: SortDirection;
}

export type SortDirection = "asc" | "desc" | "";