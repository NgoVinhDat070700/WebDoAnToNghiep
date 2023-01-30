import PropTypes from 'prop-types'

import React, { useCallback, useRef, useState } from 'react'
import TableBasic from '@/components/TableBasic'

import { Card } from '@mui/material'
import useTable from '@/hooks/useTable'
import useResponsive from '@/hooks/useResponsive'
import Search from '@/components/Search'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetListOrderQuery } from './orderSlice'
import { Order_Table } from '@/pages/admin/config'
import Pagination from '@/components/Pagination'
import OrderConfirmDialog from './OrderConfirmDialog'
import OrderTableCollapse from './OrderTableCollapse'
import OrderTableRows from './OrderTableRow'

OrderTable.propTypes = {
  OrderRef: PropTypes.any
}

function OrderTable({OrderRef}) {
  const confirmDialogRef = useRef()

  const [filterName, setFilterName] = useState('');
  const { page, handleChangeRowsPerPage, handleChangePage, rowsPerPage } =
    useTable()
  const isMobile = useResponsive('down','sm')
  const phone = useDebounce(filterName, 1000)
  const { data, isLoading, isFetching } = useGetListOrderQuery({
    page: page + 1,
    pageSize: rowsPerPage,
    phone
  })
  const handleFilterByName = (e) =>{
    setFilterName(e.target.value)
  }
  const { orders = [], total = 0 } = data || {}
  const columns = isMobile ? [] : Order_Table

  const handleDeleteOrder = useCallback((row)=>()=>{
    confirmDialogRef.current.handleToggleConfirmDialog(row)
  },[])

  const handleEditOrder = useCallback((row)=>()=>{
    OrderRef?.current?.handleEditOrder(row)
},[OrderRef])
  const CompTableRows = useCallback((row,index)=>
    isMobile ? (<OrderTableCollapse row={row} key={index} handleDeleteOrder={handleDeleteOrder(row)} handleEditOrder={handleEditOrder(row)} />)
    :(<OrderTableRows row={row} key={index} handleDeleteOrder={handleDeleteOrder(row)} handleEditOrder={handleEditOrder(row)}   />)
  ,[isMobile,handleDeleteOrder,handleEditOrder])
  return (
    <Card>
      <Search filterName={filterName} onFilterName={handleFilterByName} placeholder="Tìm kiếm theo số điện thoại..."/>
      <TableBasic
        columns={columns}
        rows={orders}
        rowsPerPage={rowsPerPage}
        CompTableRows={CompTableRows}
        isLoading={isLoading || isFetching}
      />
      <Pagination
        totalRecord={total}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <OrderConfirmDialog confirmDialogRef={confirmDialogRef}  />
    </Card>
  )
}

export default OrderTable
