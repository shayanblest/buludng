export interface DataTableResponse<TModel> {
    data: TModel[];
    totalRecords: number;
}