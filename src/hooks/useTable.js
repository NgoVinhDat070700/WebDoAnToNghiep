import {useState} from 'react'

function useTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return {
        page,
        setPage,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
    }
}

export default useTable;