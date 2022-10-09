import { rowsPerPageOptions } from "@/config";
import { TablePagination } from "@mui/material";


import PropTypes from 'prop-types'

Pagination.propTypes = {
    totalRecord:PropTypes.number,
    rowsPerPage:PropTypes.number,
    page:PropTypes.number,
    handleChangePage:PropTypes.func,
    handleChangeRowsPerPage:PropTypes.func
}
function Pagination({totalRecord = 0,rowsPerPage = rowsPerPageOptions[0]  ,page = 0,handleChangePage,handleChangeRowsPerPage}) {
    return (  
        <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={totalRecord}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    );
}

export default Pagination;