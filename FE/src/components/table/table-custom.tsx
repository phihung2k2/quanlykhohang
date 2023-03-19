import { CSS, FormElement, Input, Loading, Pagination, PaginationProps, Table, TableProps } from "@nextui-org/react";
import { TableColumnProps } from "@nextui-org/react/types/table/base/table-column";
import { debounce } from "lodash";
import React from "react";

export type ColumnTableCustomProps<TBData = any> = {
    id: string;
    label: string;
    columnProps?: TableColumnProps<any>;
    renderCell?: (values: TBData) => React.ReactNode;
    fixed?: boolean;
    renderHeader?: (lablel: string) => React.ReactNode;
};

export interface TableCustomHProps<TRowData> {
    columns: ColumnTableType<TRowData>[];
    rows: TRowData[];
    tableCSS?: CSS;
    tableProps?: TableProps;
    panigationProps?: Partial<PaginationProps>;
    isPanigation?: boolean;
    title?: React.ReactNode;
    header?: React.ReactNode;
    onSearchByName?: (e: string) => void;
    loading?: boolean;
    minWidth?: any;
}

export type ColumnTableType<DData> = {
    id: string;
    label: string;
    columnProps?: Partial<TableColumnProps<any>>;
    renderCell?: (values: DData) => React.ReactNode;
    fixed?: boolean;
    renderHeader?: (lablel: string) => React.ReactNode;
};

export const TableCustom = <RowData,>({
    columns,
    rows,
    tableCSS,
    tableProps,
    panigationProps,
    isPanigation,
    title,
    header,
    onSearchByName,
    loading,
    minWidth,
}: TableCustomHProps<RowData>) => {
    const onSearchDebounce = onSearchByName
        ? debounce((e: React.ChangeEvent<FormElement>) => {
              onSearchByName(e.target.value);
          }, 1000)
        : undefined;

    return (
        <div className=' w-full pt-5'>
            {title && (
                <div className=' py-2'>
                    <h5>{title}</h5>
                </div>
            )}
            {header}

            {onSearchDebounce && (
                <div className=' my-5'>
                    <Input
                        onChange={onSearchDebounce}
                        clearable
                        bordered
                        color='primary'
                        labelPlaceholder='Search'
                        contentRight={loading && <Loading size='xs' />}
                        fullWidth
                    />
                </div>
            )}

            <Table
                css={{
                    height: "auto",
                    minWidth: minWidth || "800px",
                    width: "100%",

                    paddingBottom: 50,
                    // minHeight: "400px",
                    ...tableCSS,
                }}
                selectionMode='none'
                {...tableProps}
            >
                <Table.Header columns={columns}>
                    {(column) => (
                        <Table.Column key={column.id} {...column.columnProps}>
                            {column.renderHeader ? column.renderHeader(column.label) : column.label}
                        </Table.Column>
                    )}
                </Table.Header>

                <Table.Body items={rows} css={{ minHeight: "500px" }}>
                    {(item) => {
                        type T = keyof typeof item;

                        return (
                            <Table.Row>
                                {(columnKey) => {
                                    const column = columns.find((c) => c.id === columnKey);

                                    const renderCell = column?.renderCell;
                                    const value = item[columnKey as T] as any;
                                    return (
                                        <Table.Cell>
                                            <div className={`w-full flex justify-${column?.columnProps?.align}`}>
                                                {renderCell ? renderCell(item) : value}
                                            </div>
                                        </Table.Cell>
                                    );
                                }}
                            </Table.Row>
                        );
                    }}
                </Table.Body>
            </Table>
            {isPanigation && (
                <div className=' flex justify-end my-5'>
                    <Pagination {...panigationProps} />
                </div>
            )}
        </div>
    );
};
