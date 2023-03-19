export function getRowsTable<TData, TRow>(items: TData[] | undefined, getRows: (data: TData) => TRow) {
    const hi = items || [];

    const data = hi.map((i) => {
        return getRows(i);
    });
    return data;
}
