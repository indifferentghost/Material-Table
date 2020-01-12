import React, { useState } from 'react';
import { DateTime } from 'luxon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';

type ClickHander = (
  event: React.MouseEvent<HTMLButtonElement> | null,
  newPage: number,
) => void;

type CellProps = string | number | React.ReactElement;

type TableProps = {
  data?: CellProps[][];
};

export const PaginationTable: React.FC<TableProps> = ({ data = [] }) => {
  const [header, ...body] = data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, body.length - page * rowsPerPage);

  const handleChangePage: ClickHander = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {header.map((th: CellProps) => (
              <TableCell>{th}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {emptyRows ? (
            <TableRow>
              <TableCell colSpan={header.length}>
                <Typography align="center">
                  No results for your selection
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            body
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: CellProps[]) => (
                <TableRow>
                  {row.map((td: CellProps) => (
                    <TableCell>{td}</TableCell>
                  ))}
                </TableRow>
              ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={body.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

PaginationTable.defaultProps = {
  data: [
    ['id', 'created_at', 'created_by', 'purchase_order_status', 'View'], // default header
    ...Array.from({ length: 100 }).map((_, i) => [
      i,
      DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss'),
      'Ryan Morton',
      'New',
      'View',
    ]),
  ],
};
