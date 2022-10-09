import PropTypes from 'prop-types'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Scrollbar from './Scrollbar'
import { defaultPagination } from '@/config'
import { useMemo } from 'react'
import TableNoData from './TableNoData'

TableBasic.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  CompTableRows: PropTypes.func,
  isLoading: PropTypes.bool,
  rowsPerPage: PropTypes.number
}

export default function TableBasic({
  columns = [],
  rows = [],
  rowsPerPage = defaultPagination,
  CompTableRows,
  isLoading=false
}) {
  const isNotFound = !isLoading && !rows.length
  const tableData = useMemo(
    () => (isLoading ? [...Array(rowsPerPage)] : rows),
    [isLoading, rowsPerPage, rows]
  )
  return (
    <Paper>
      <Scrollbar >
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight:'bold', fontSize:16 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .map((row,index) => row && CompTableRows && CompTableRows(row,index))}
              <TableNoData isNotFound={isNotFound} />
          </TableBody>
        </Table>
      </Scrollbar>
    </Paper>
  )
}
