/** @format */
import React, { FunctionComponent, useMemo } from 'react';
import { useTable } from 'react-table';
import { compose } from 'ramda';
import { withDisplayName, withStyle, withLogging } from '@project/helpers';
import { styles, TableCell, TableHead, TableRow } from './styles';
export interface TableProps {
  className: string;
  columns: any[];
  data: any[];
}

const Component: FunctionComponent<TableProps> = ({
  className,
  columns,
  data
}: TableProps) => {
  const columnsMemo = useMemo(() => columns, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns: columnsMemo, data });

  return (
    <table className={className} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, j) => (
              <TableHead {...column.getHeaderProps()} key={`head-${i}-${j}`}>
                {column.render('Header')}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);

          return (
            <TableRow {...row.getRowProps()} key={i}>
              {row.cells.map((cell, j) => {
                return (
                  <TableCell
                    {...cell.getCellProps()}
                    key={`cell-${i}-${j}`}
                    data-title={cell.column.Header}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </tbody>
    </table>
  );
};

export const Table = compose(
  withStyle(styles, ['columns', 'data']),
  withLogging(false),
  withDisplayName('Table')
)(Component);
