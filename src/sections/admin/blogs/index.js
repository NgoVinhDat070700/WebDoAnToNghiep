import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import TableBasic from '@/components/TableBasic'

import { Card } from '@mui/material'
import useTable from '@/hooks/useTable'
import Pagination from '@/components/Pagination'
import BlogTableRows from './BlogTableRows'
import useResponsive from '@/hooks/useResponsive'
import BlogTableCollapse from './BlogTableCollapse'
import BlogConfirmDialog from './BlogConfirmDialog'
import Search from '@/components/Search'
// import { useDebounce } from '@/hooks/useDebounce'
import { useCreateBlogMutation, useGetListBlogQuery, useUpdateBlogMutation } from './blogSlice'
import { Blog_Table } from '@/pages/admin/config'
import BlogForm from './BlogForm'


function BlogTable(props, ref) {
  const confirmDialogRef = useRef()

  const [isOpen, setIsOpen] = useState(false)
  const [detailBlog, setDetailBlog] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [createBlog] = useCreateBlogMutation()
  const [updateBlog] = useUpdateBlogMutation()
  const { page, handleChangeRowsPerPage, handleChangePage, rowsPerPage } = useTable()
  const isMobile = useResponsive('down', 'sm')
//   const nameBlog = useDebounce(filterName, 1000)
  const { data, isLoading, isFetching } = useGetListBlogQuery({
    page: page + 1,
    pageSize: rowsPerPage,
    
  })
  const handleFilterByName = (e) => {
    setFilterName(e.target.value)
  }
  const { allNews = [], total = 0 } = data || {}
  const columns = isMobile ? [] : Blog_Table

  useImperativeHandle(ref, () => ({
    handleAddBlog: () => {
      setIsOpen(true)
      setIsEdit(false)
      setDetailBlog({})
    },
  }))

  const handleOpenModal = useCallback(
    (row) => () => {
      setDetailBlog(row)
      setIsEdit(true)
      setIsOpen(true)
    },
    []
  )

  const onClose = () => {
    setDetailBlog({})
    setIsOpen(false)
  }
  const handleDeleteBlog = useCallback(
    (row) => () => {
      confirmDialogRef.current.handleToggleConfirmDialog(row)
    },
    []
  )
  const CompTableRows = useCallback(
    (row, index) =>
      isMobile ? (
        <BlogTableCollapse
          handleOpenModal={handleOpenModal(row)}
          row={row}
          key={index}
          handleDeleteBlog={handleDeleteBlog(row)}
        />
      ) : (
        <BlogTableRows
          row={row}
          key={index}
          handleOpenModal={handleOpenModal(row)}
          handleDeleteBlog={handleDeleteBlog(row)}
        />
      ),
    [isMobile, handleOpenModal, handleDeleteBlog]
  )
  return (
    <Card>
      <Search filterName={filterName} onFilterName={handleFilterByName} placeholder='Tìm kiếm Blog hướng dẫn...' />
      <TableBasic
        columns={columns}
        rows={allNews}
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
      <BlogForm isOpen={isOpen} createBlog={createBlog} updateBlog={updateBlog} onClose={onClose} isEdit={isEdit} detailBlog={detailBlog}/>
      <BlogConfirmDialog confirmDialogRef={confirmDialogRef} />
    </Card>
  )
}

export default forwardRef(BlogTable)
