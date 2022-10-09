import  PropTypes from "prop-types"

import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import TableBasic from "@/components/TableBasic";
import useResponsive from "@/hooks/useResponsive";
import useTable from "@/hooks/useTable";
import { Table_Users } from "@/pages/admin/config";

import { Card } from "@mui/material";
import { forwardRef, useCallback, useRef } from "react";
import UserConfirmDialog from "./UserConfirmDialog";
import { useGetListUserQuery } from "./UserSlice";
import UserTableRows from "./UserTableRows";
import UserTableCollapse from "./UserTableCollapse";

UserTable.propTypes = {
    ref: PropTypes.any
}
function UserTable( props, ref ) {

    const confirmDialogRef = useRef()
    const {page, handleChangeRowsPerPage, handleChangePage, rowsPerPage} = useTable()
    const isMobile = useResponsive('down', 'sm')
    const { data, isLoading, isFetching } = useGetListUserQuery({
        page:page + 1,
        pageSize: rowsPerPage
    })
    
    const {users = [], total = 0 } = data || {}
    const columns = isMobile ? [] : Table_Users
    
    const handleDeleteUser = useCallback((row)=>()=>{
        confirmDialogRef.current.handleToggleConfirmDialog(row)
    },[confirmDialogRef])
    
    const handleEditUser = useCallback((row)=>()=>{
        ref?.current?.handleEditUser(row)
    },[ref])
    const CompTableRows = useCallback((row,index)=> isMobile ? (<UserTableCollapse row={row} handleDeleteUser={handleDeleteUser} handleEditUser={handleEditUser} />) : (<UserTableRows row={row} index={index} key={index} handleDeleteUser={handleDeleteUser(row)} handleEditUser={handleEditUser(row)} />),[isMobile, handleDeleteUser, handleEditUser])

    return ( 
        <Card>
            <Search placeholder="Search User..."/>
            <TableBasic 
            columns={columns}
            rows={users}
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
            <UserConfirmDialog confirmDialogRef={confirmDialogRef} />
        </Card>
    );
}

export default forwardRef(UserTable);