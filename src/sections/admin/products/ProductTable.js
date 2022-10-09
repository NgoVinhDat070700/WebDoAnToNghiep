import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import TableBasic from '@/components/TableBasic'

import { Table_Products } from '@/pages/admin/config'
import { useCreateProductMutation, useGetListProductsQuery, useUpdateProductMutation } from '@/redux/api/apiSlice'
import { Card } from '@mui/material'
import useTable from '@/hooks/useTable'
import Pagination from '@/components/Pagination'
import ProductTableRows from './ProductTableRows'
import useResponsive from '@/hooks/useResponsive'
import ProductTableCollapse from './ProductTableCollapse'
import ProductModal from './ProductModal'
import ProductConfirmDialog from './ProductConfirmDialog'
import Search from '@/components/Search'
import { useDebounce } from '@/hooks/useDebounce'

function ProductTable(props, ref) {
  const confirmDialogRef = useRef()

  const [isOpen, setIsOpen] = useState(false)
  const [detailProduct, setDetailProduct] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [createProduct] = useCreateProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const { page, handleChangeRowsPerPage, handleChangePage, rowsPerPage } = useTable()
  const isMobile = useResponsive('down', 'sm')
  const nameproduct = useDebounce(filterName, 1000)
  const { data, isLoading, isFetching } = useGetListProductsQuery({
    page: page + 1,
    pageSize: rowsPerPage,
    nameproduct,
  })
  const handleFilterByName = (e) => {
    setFilterName(e.target.value)
  }
  const { allProduct = [], total = 0 } = data || {}
  const columns = isMobile ? [] : Table_Products

  useImperativeHandle(ref, () => ({
    handleAddProduct: () => {
      setIsOpen(true)
      setIsEdit(false)
      setDetailProduct({})
    },
  }))

  const handleOpenModal = useCallback(
    (row) => () => {
      setDetailProduct(row)
      setIsEdit(true)
      setIsOpen(true)
    },
    []
  )

  const onClose = () => {
    setDetailProduct({})
    setIsOpen(false)
  }
  const handleDeleteProduct = useCallback(
    (row) => () => {
      confirmDialogRef.current.handleToggleConfirmDialog(row)
    },
    []
  )
  const CompTableRows = useCallback(
    (row, index) =>
      isMobile ? (
        <ProductTableCollapse
          handleOpenModal={handleOpenModal(row)}
          row={row}
          key={index}
          handleDeleteProduct={handleDeleteProduct(row)}
        />
      ) : (
        <ProductTableRows
          row={row}
          key={index}
          handleOpenModal={handleOpenModal(row)}
          handleDeleteProduct={handleDeleteProduct(row)}
        />
      ),
    [isMobile, handleOpenModal, handleDeleteProduct]
  )
  return (
    <Card>
      <Search filterName={filterName} onFilterName={handleFilterByName} placeholder='Search products...' />
      <TableBasic
        columns={columns}
        rows={allProduct}
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
      <ProductModal
        isOpen={isOpen}
        onClose={onClose}
        detailProduct={detailProduct}
        isEdit={isEdit}
        createProduct={createProduct}
        updateProduct={updateProduct}
      />
      <ProductConfirmDialog confirmDialogRef={confirmDialogRef} />
    </Card>
  )
}

export default forwardRef(ProductTable)
