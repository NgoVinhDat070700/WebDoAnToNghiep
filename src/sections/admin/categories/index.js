import  PropTypes from "prop-types"

import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import TableBasic from "@/components/TableBasic";
import useResponsive from "@/hooks/useResponsive";
import useTable from "@/hooks/useTable";
import { Table_Categories } from "@/pages/admin/config";

import { Card } from "@mui/material";
import { useCallback, useRef } from "react";
import CategoryConfirmDialog from "./CategoryConfirmDialog";
import { useGetListCategoryQuery } from "./CategorySlice";
import CategoryTableRows from "./CategoryTableRows";
import CategoryTableCollapse from "./CategoryTableCollapse";

CategoryTable.propTypes = {
    CategoryRef: PropTypes.any
}
function CategoryTable({CategoryRef}) {

    const confirmDialogRef = useRef()
    const {page, handleChangeRowsPerPage, handleChangePage, rowsPerPage} = useTable()
    const isMobile = useResponsive('down', 'sm')
    const { data, isLoading, isFetching } = useGetListCategoryQuery({
        page:page + 1,
        pageSize: rowsPerPage
    })
    
    const {categories = [], total = 0 } = data || {}
    const columns = isMobile ? [] : Table_Categories
    
    const handleDeleteCategory = useCallback((row)=>()=>{
        confirmDialogRef.current.handleToggleConfirmDialog(row)
    },[confirmDialogRef])
    
    const handleEditCategory = useCallback((row)=>()=>{
        CategoryRef?.current?.handleEditCategory(row)
    },[CategoryRef])
    const CompTableRows = useCallback((row,index)=> isMobile ? (<CategoryTableCollapse row={row} handleDeleteCategory={handleDeleteCategory(row)} key={index} handleEditCategory={handleEditCategory(row)} />) : (<CategoryTableRows row={row} key={index} handleDeleteCategory={handleDeleteCategory(row)} handleEditCategory={handleEditCategory(row)} />),[isMobile, handleDeleteCategory, handleEditCategory])

    return ( 
        <Card>
            <Search placeholder="Search category..."/>
            <TableBasic 
            columns={columns}
            rows={categories}
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
            <CategoryConfirmDialog confirmDialogRef={confirmDialogRef} />
        </Card>
    );
}

export default CategoryTable;